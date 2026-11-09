// Install jsdom outside the app, then NODE_PATH=/path/to/node_modules node tests/provinces.cjs
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {JSDOM}=require('jsdom');
const root=path.join(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
function boot(saved){
 const dom=new JSDOM(read('index.html'),{url:'https://example.test/',runScripts:'outside-only'});
 const w=dom.window;
 w.testEval=code=>vm.runInContext(code,dom.getInternalVMContext());
 if(saved)w.localStorage.setItem('skkn_current',JSON.stringify(saved));
 w.testEval(read('provinces.js'));
 w.testEval(read('app.js'));
 const style=w.document.createElement('style');style.textContent=read('style.css');w.document.head.appendChild(style);
 return w;
}
const get=(w,id)=>w.document.getElementById(id);
const change=(w,id,value)=>{const el=get(w,id);el.value=value;el.dispatchEvent(new w.Event('change',{bubbles:true}));};
const state=w=>JSON.parse(w.testEval('JSON.stringify(doc)'));
const fixture=(province,formSel=['khaosat'])=>({id:'legacy',f:{province,topic:'Đề tài'},files:[],analysis:'',report:'Báo cáo',forms:{bia:'Nội dung đã sửa'},formSel,score:'',check:''});
(async()=>{
 assert(read('index.html').indexOf('src="provinces.js"')<read('index.html').indexOf('src="app.js"'));
 let w=boot();
 assert.equal(get(w,'provinceSelect').options.length,35);
 assert.equal(w.testEval('new Set(PROVINCES.map(p=>p.id)).size'),34);
 assert.equal(w.testEval('PROVINCES.filter(p=>p.name.startsWith("Thành phố")).length'),6);
 assert(w.testEval('PROVINCES.filter(p=>p.id!=="86").every(p=>!p.legalRefs.length && JSON.stringify(p.suggestedForms)===JSON.stringify(FORMS.filter(f=>f[2]).map(f=>f[0])))'));
 assert.equal(get(w,'provinceSelect').value,'');
 assert(!get(w,'provinceOtherLabel').hidden);
 assert.equal(state(w).formSel.length,7);
 change(w,'provinceSelect','01');
 assert.equal(state(w).f.province,'Thành phố Hà Nội');
 assert(get(w,'provinceOtherLabel').hidden);
 assert.equal(w.getComputedStyle(get(w,'provinceOtherLabel')).display,'none');
 assert(get(w,'provinceNote').textContent.includes('Thành phố Hà Nội'));
 assert(w.provincePrompt().includes('Sở Giáo dục và Đào tạo Hà Nội'));
 for(const option of [...get(w,'provinceSelect').options].slice(1)){change(w,'provinceSelect',option.value);assert.equal(state(w).f.province,option.textContent);assert(w.provincePrompt().includes(option.textContent));}
 // User changes survive rerenders, including an intentionally empty selection.
 get(w,'formChecks').querySelectorAll('input').forEach(c=>{c.checked=false;c.dispatchEvent(new w.Event('change'));});
 w.renderFormChecks();assert.deepEqual(state(w).formSel,[]);
 w.close();
 w=boot(fixture('Hà Nội',[]));
 assert.equal(get(w,'provinceSelect').value,'01');
 assert.equal(state(w).f.province,'Hà Nội'); // No storage migration on load.
 assert.deepEqual(state(w).formSel,[]);
 change(w,'provinceSelect','48');
 assert.equal(state(w).f.province,'Thành phố Đà Nẵng');
 assert.deepEqual(state(w).forms,{bia:'Nội dung đã sửa'});
 assert.equal(get(w,'formsOut').querySelector('textarea').value,'Nội dung đã sửa');
 assert.equal(state(w).formSel.length,7);
 // Capture actual button prompts without a real API key or network call.
 const prompts=[];
 w.callGemini=async prompt=>{prompts.push(prompt);return 'Bản thảo kiểm thử';};
 w.testEval("doc.files=[{name:'huongdan.txt',type:'huongdan',text:'Hướng dẫn địa phương thử nghiệm'}];doc.formSel=['bia'];");
 await get(w,'runForms').onclick({target:get(w,'runForms')});
 await get(w,'runScore').onclick({target:get(w,'runScore')});
 await get(w,'runCheck').onclick({target:get(w,'runCheck')});
 assert.equal(prompts.length,3);
 for(const prompt of prompts){
  assert(prompt.includes('Sở Giáo dục và Đào tạo Đà Nẵng'));
  assert(prompt.includes('Hướng dẫn địa phương thử nghiệm'));
  assert(prompt.includes('Không dùng biểu mẫu tỉnh khác'));
  assert(prompt.includes('[CẦN KIỂM TRA HIỆU LỰC]'));
 }
 // Verified Vĩnh Long pack: no invented point scale or mandatory school-year registration.
 change(w,'provinceSelect','86');
 assert.equal(get(w,'runScore').textContent,'Đánh giá tham khảo');
 assert(get(w,'rubricNote').textContent.includes('hai tiêu chí'));
 assert(state(w).formSel.includes('phieucham'));
 assert(state(w).formSel.includes('tonghop'));
 assert(!state(w).formSel.includes('dondk'));
 assert(!state(w).formSel.includes('baocaodonvi'));
 assert(get(w,'formChecks').textContent.includes('Mẫu 03'));
 assert(get(w,'formChecks').textContent.includes('Mẫu 01'));
 w.testEval("doc.files=[];doc.formSel=['phieucham','tonghop','baocaodonvi'];");
 prompts.length=0;
 await get(w,'runForms').onclick({target:get(w,'runForms')});
 await get(w,'runScore').onclick({target:get(w,'runScore')});
 await get(w,'runCheck').onclick({target:get(w,'runCheck')});
 assert.equal(prompts.length,5);
 assert(prompts[0].includes('Chỉ tiêu 1: Tính mới'));
 assert(prompts[0].includes('Chỉ tiêu 2: Đã được áp dụng'));
 assert(prompts[1].includes('tổng số thành viên Hội đồng CÓ MẶT'));
 assert(prompts[2].includes('KHÔNG phải hồ sơ cá nhân'));
 assert(prompts[3].includes('Chưa đủ căn cứ'));
 assert(!prompts[3].includes('kèm điểm gợi ý thang 10'));
 assert(!prompts[3].includes('| Điểm tối đa |'));
 for(const prompt of prompts){assert(prompt.includes('62/2026/QĐ-UBND'));assert(prompt.includes('Sở Khoa học và Công nghệ tỉnh Vĩnh Long'));assert(prompt.includes('mỗi đơn chỉ một giải pháp'));}
 // Uploaded scoring sheet retains priority.
 w.testEval("doc.files=[{type:'phieucham',name:'sheet.txt',text:'Tiêu chí do người dùng tải'}];");
 await get(w,'runScore').onclick({target:get(w,'runScore')});
 assert(prompts.at(-1).includes('Dùng ĐÚNG phiếu chấm người dùng cung cấp'));
 assert(prompts.at(-1).includes('Tiêu chí do người dùng tải'));
 change(w,'provinceSelect','');
 assert.equal(state(w).f.province,'');
 assert(w.provincePrompt().includes('khung tham khảo chung'));
 w.close();
 const unknown='Hà Tây <tên cũ>';
 w=boot(fixture(unknown));
 assert.equal(get(w,'provinceSelect').value,'');
 assert.equal(get(w,'provinceOther').value,unknown);
 assert.deepEqual(state(w).formSel,['khaosat']);
 assert.equal(state(w).f.province,unknown);
 get(w,'provinceOther').value='Địa phương khác';
 get(w,'provinceOther').dispatchEvent(new w.Event('input'));
 assert.equal(state(w).f.province,'Địa phương khác');
 assert(w.provincePrompt().includes('khung tham khảo chung'));
 // Opening a different dossier and a new dossier refreshes the picker.
 w.testEval("doc=blank();loadDocToUI();");
 assert.equal(get(w,'provinceOther').value,'');
 assert.equal(get(w,'provinceSelect').value,'');
 assert.equal(state(w).formSel.length,7);
 w.close();
 console.log('PASS: 34 provinces; default/custom/empty checklists; legacy/free-text/new dossiers; preserved generated text; form/score/check prompts; verified Vĩnh Long Mẫu 01–03 and nonnumeric assessment; uploaded scoring priority; no live Gemini calls.');
})().catch(e=>{console.error(e);process.exitCode=1;});
