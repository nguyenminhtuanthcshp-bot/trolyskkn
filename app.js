const $=id=>document.getElementById(id);
const MODELS=['gemini-flash-lite-latest','gemini-2.5-flash-lite','gemini-3.5-flash-lite','gemini-3.1-flash-lite','gemini-flash-latest','gemini-2.5-flash','gemini-3.8-flash','gemini-3.5-flash','gemini-2.5-pro'];
const esc=s=>String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const setStatus=t=>$('status').textContent=t||'';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

/* ---------- Form definition ---------- */
const FIELDS=[
 ['topic','Tên đề tài sáng kiến','text','wide'],['author','Họ và tên tác giả (đồng tác giả, nếu có)'],['dob','Ngày tháng năm sinh'],
 ['position','Chức vụ'],['title','Chức danh nghề nghiệp'],['degree','Trình độ chuyên môn'],['unit','Đơn vị công tác'],['province','Tỉnh/thành phố'],
 ['level','Cấp học','select',['Mầm non','Tiểu học','THCS','THPT','Giáo dục thường xuyên','Quản lý giáo dục']],
 ['field','Lĩnh vực sáng kiến','select',['Quản lý giáo dục','Phương pháp dạy học','Kiểm tra đánh giá','Công nghệ thông tin','Chuyển đổi số','Ứng dụng trí tuệ nhân tạo','Công tác chủ nhiệm','Công tác tư vấn học đường','Giáo dục đạo đức, kỹ năng sống','Lĩnh vực khác']],
 ['year','Năm học thực hiện (VD: 2025–2026)'],['grade','Cấp đề nghị công nhận','select',['Cấp cơ sở','Cấp ngành (Sở/Phòng GD&ĐT)','Cấp tỉnh/thành phố','Cấp có thẩm quyền khác']],
 ['period','Thời gian áp dụng'],['target','Đối tượng áp dụng'],['sample','Số lượng học sinh/giáo viên/đối tượng khảo sát'],
 ['before','Thực trạng trước khi áp dụng (số liệu thật nếu có)','area'],['difficult','Khó khăn, hạn chế cần khắc phục','area'],
 ['solutions','Giải pháp dự kiến/đã thực hiện (mỗi dòng một giải pháp)','area'],['results','Kết quả thực tế trước và sau khi áp dụng (số liệu thật)','area'],
 ['evidence','Minh chứng đang có (ảnh, sản phẩm, kế hoạch, phiếu khảo sát…)','area'],['notes','Ghi chú / văn bản dán thêm','area']];
let doc=null;
function blank(){return{id:Date.now().toString(36),f:{},files:[],analysis:'',report:'',forms:{},formSel:[],score:'',check:'',updated:''}}
function renderForm(){
 $('form').innerHTML=FIELDS.map(([k,l,t,o])=>{
  const cls=(t==='area'||o==='wide')?'wide':'';
  if(t==='select')return `<label>${l}<select data-k="${k}">${o.map(x=>`<option>${x}</option>`).join('')}</select></label>`;
  if(t==='area')return `<label class="${cls}">${l}<textarea data-k="${k}" rows="3"></textarea></label>`;
  return `<label class="${cls}">${l}<input data-k="${k}"></label>`;}).join('');
 $('form').querySelectorAll('[data-k]').forEach(el=>el.oninput=el.onchange=()=>{doc.f[el.dataset.k]=el.value;autosave();});
}
function loadDocToUI(){
 $('form').querySelectorAll('[data-k]').forEach(el=>{const v=doc.f[el.dataset.k];if(v!==undefined)el.value=v;else if(el.tagName!=='SELECT')el.value='';else doc.f[el.dataset.k]=el.value;});
 ['analysis','report','score','check'].forEach(k=>$(k).value=doc[k]||'');
 renderFiles();renderFormChecks();renderFormsOut();rubricNote();progress();refreshMissing();
}
let saveT;function autosave(){clearTimeout(saveT);saveT=setTimeout(()=>{localStorage.setItem('skkn_current',JSON.stringify(doc));progress();refreshMissing();},400);}
['analysis','report','score','check'].forEach(k=>$(k).oninput=()=>{doc[k]=$(k).value;autosave();});

/* ---------- Library ---------- */
const lib=()=>JSON.parse(localStorage.getItem('skkn_lib')||'{}');
function saveToLib(){doc.updated=new Date().toLocaleString('vi-VN');const L=lib();L[doc.id]=doc;try{localStorage.setItem('skkn_lib',JSON.stringify(L));setStatus('✓ Đã lưu hồ sơ.');}catch(e){setStatus('Bộ nhớ trình duyệt đầy — hãy Sao lưu (.json) rồi xóa bớt hồ sơ cũ.');}renderLib();}
function renderLib(){const q=($('filter').value||'').toLowerCase();const L=Object.values(lib()).sort((a,b)=>b.id.localeCompare(a.id));
 $('docList').innerHTML=L.filter(d=>JSON.stringify(d.f).toLowerCase().includes(q)).map(d=>`<div class="doc"><div><b>${esc(d.f.topic||'(chưa đặt tên)')}</b><br><span class="muted">${esc([d.f.year,d.f.author,d.f.unit,d.f.field,d.f.grade].filter(Boolean).join(' · '))} — lưu ${esc(d.updated)}</span></div><div><button data-o="${d.id}">Mở</button> <button class="ghost" data-x="${d.id}">Xóa</button></div></div>`).join('')||'<p class="muted">Chưa có hồ sơ đã lưu.</p>';
 $('docList').querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{doc=lib()[b.dataset.o];loadDocToUI();autosave();setStatus('Đã mở hồ sơ.');});
 $('docList').querySelectorAll('[data-x]').forEach(b=>b.onclick=()=>{if(!confirm('Xóa hồ sơ này khỏi máy?'))return;const L=lib();delete L[b.dataset.x];localStorage.setItem('skkn_lib',JSON.stringify(L));renderLib();});}
$('filter').oninput=renderLib;$('saveDoc').onclick=saveToLib;
$('newDoc').onclick=()=>{if(!confirm('Tạo hồ sơ mới? (Hồ sơ hiện tại nên được Lưu trước)'))return;doc=blank();loadDocToUI();autosave();};
$('backup').onclick=()=>{const L=lib();L[doc.id]=doc;saveAs(new Blob([JSON.stringify(L,null,1)],{type:'application/json'}),'trolyskkn-saoluu-'+new Date().toISOString().slice(0,10)+'.json');};
$('restore').onchange=async e=>{try{const d=JSON.parse(await e.target.files[0].text());localStorage.setItem('skkn_lib',JSON.stringify({...lib(),...d}));renderLib();setStatus('✓ Đã phục hồi '+Object.keys(d).length+' hồ sơ.');}catch(x){setStatus('Tệp sao lưu không hợp lệ.');}};

/* ---------- Key ---------- */
$('apiKey').value=localStorage.getItem('gemini_key')||'';
const keyMsg=()=>$('keyStatus').textContent=localStorage.getItem('gemini_key')?'✓ Đã lưu khóa trên máy này.':'Chưa có khóa — các nút AI sẽ chưa chạy.';
keyMsg();$('saveKey').onclick=()=>{localStorage.setItem('gemini_key',$('apiKey').value.trim());keyMsg();};
$('clearKey').onclick=()=>{localStorage.removeItem('gemini_key');$('apiKey').value='';keyMsg();};

/* ---------- Tabs ---------- */
document.querySelectorAll('#tabs button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#tabs button,.tab').forEach(x=>x.classList.remove('on'));b.classList.add('on');$(b.dataset.t).classList.add('on');});

/* ---------- Files ---------- */
const TYPES={huongdan:'Quy định/hướng dẫn địa phương',phieucham:'Phiếu chấm',mau:'Mẫu biểu',skkncu:'SKKN cũ',chuyenmon:'Tài liệu chuyên môn/số liệu'};
async function pdfText(buf){if(!window.pdfjsLib)throw 0;pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
 const p=await pdfjsLib.getDocument({data:buf}).promise;let t='';for(let i=1;i<=p.numPages;i++){const c=await (await p.getPage(i)).getTextContent();t+=c.items.map(x=>x.str).join(' ')+'\n';}return t;}
$('files').onchange=async e=>{for(const f of e.target.files){let text='';setStatus('Đang đọc '+f.name+'…');
 try{if(/\.docx$/i.test(f.name))text=(await mammoth.extractRawText({arrayBuffer:await f.arrayBuffer()})).value;else if(/\.pdf$/i.test(f.name))text=await pdfText(await f.arrayBuffer());else text=await f.text();}catch(x){text='';}
 if(!text.trim())setStatus('Không đọc được chữ trong '+f.name+' (có thể là bản scan) — hãy dán nội dung vào ô Ghi chú.');else setStatus('');
 doc.files.push({name:f.name,type:$('docType').value,text:text.slice(0,60000)});}
 e.target.value='';renderFiles();renderFormChecks();rubricNote();autosave();};
function renderFiles(){$('fileList').innerHTML=doc.files.map((f,i)=>`<div class="fitem"><span>📎 <b>${esc(TYPES[f.type])}</b>: ${esc(f.name)} (${f.text.split(/\s+/).length} từ)</span><button class="ghost" data-d="${i}">✕</button></div>`).join('');
 $('fileList').querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{doc.files.splice(b.dataset.d,1);renderFiles();rubricNote();autosave();});}
const filesOf=(...t)=>doc.files.filter(f=>t.includes(f.type));
const filesText=(t,lim=20000)=>filesOf(...t).map(f=>`--- ${TYPES[f.type]}: ${f.name} ---\n${f.text.slice(0,lim)}`).join('\n\n');

/* ---------- Gemini ---------- */
const isBusy=(s,m)=>s===429||s===503||/high demand|overloaded|try again later|resource.?exhausted|quota|rate.?limit/i.test(m||'');
async function callGemini(prompt,temp=0.4){
 const key=localStorage.getItem('gemini_key')||$('apiKey').value.trim();
 if(!key)throw new Error('Chưa có khóa Gemini — vào tab 🔑 Khóa AI để dán và lưu khóa.');
 let last='';
 for(const m of MODELS){for(let a=1;a<=3;a++){
  setStatus(a===1?`⏳ AI đang viết (${m})…`:`${m} đang đông — thử lại ${a}/3…`);
  let r,j;try{r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${encodeURIComponent(key)}`,{method:'POST',headers:{'Content-Type':'application/json'},
   body:JSON.stringify({contents:[{role:'user',parts:[{text:prompt}]}],generationConfig:{temperature:temp,maxOutputTokens:32768}})});j=await r.json().catch(()=>({}));}
  catch(n){last='Mạng lỗi: '+(n.message||n);await sleep(1500*a);continue;}
  if(r.ok){const t=j.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('');if(t)return t.replace(/^```\w*\n?|```$/g,'').trim();last='Mô hình không trả nội dung.';break;}
  last=j.error?.message||('HTTP '+r.status);
  if(r.status===400&&/API key|API_KEY|invalid/i.test(last))throw new Error('Khóa Gemini không hợp lệ — tạo lại tại aistudio.google.com/apikey.');
  if(isBusy(r.status,last)){await sleep(2000*a);continue;}break;}}
 throw new Error('Tất cả mô hình đều lỗi: '+last);}
async function run(btn,fn){const b=btn;document.querySelectorAll('button').forEach(x=>x.disabled=true);try{await fn();setStatus('✓ Xong. Thầy cô đọc lại và chỉnh sửa trước khi dùng.');}catch(e){setStatus('❌ '+e.message);}finally{document.querySelectorAll('button').forEach(x=>x.disabled=false);autosave();}}

const RULES=`NGUYÊN TẮC BẮT BUỘC (vi phạm là sai):
- Tuyệt đối KHÔNG bịa số liệu khảo sát, tỉ lệ %, điểm số, kết quả thực nghiệm. Chỉ dùng số liệu có trong THÔNG TIN/TƯ LIỆU.
- KHÔNG tự tạo tên học sinh, giáo viên, đơn vị, trường làm minh chứng. Không khẳng định đã áp dụng thành công nếu chưa có dữ liệu.
- Thông tin chưa được cung cấp → ghi đúng dạng [CẦN BỔ SUNG: mô tả cụ thể cần gì].
- Ví dụ minh họa do AI đề xuất phải ghi rõ "(Ví dụ minh họa – AI đề xuất)". Phân biệt dữ liệu thật / minh họa / đề xuất.
- Chỉ dẫn văn bản pháp luật có thật, nổi tiếng, có số hiệu (VD: Nghị định 13/2012/NĐ-CP Điều lệ Sáng kiến; Thông tư 18/2013/TT-BKHCN; Chương trình GDPT 2018 – Thông tư 32/2018/TT-BGDĐT; Luật Giáo dục 2019) hoặc có trong tư liệu. Không chắc hiệu lực → thêm [CẦN KIỂM TRA HIỆU LỰC]. Không bịa sách, tác giả, đường link.
- Không coi biểu mẫu của tỉnh khác là mẫu của địa phương người dùng.
- Không đưa thông tin cá nhân học sinh. Văn phong khoa học, hành chính chuẩn tiếng Việt, không emoji.
- Định dạng: "# " cho PHẦN, "## " cho mục, "### " cho tiểu mục; bảng viết dạng Markdown | cột | cột |; không dùng ** đậm.`;
function info(){const f=doc.f;return FIELDS.map(([k,l])=>`${l}: ${(f[k]||'').trim()||'[CHƯA CUNG CẤP]'}`).join('\n');}
const ctx=()=>`===== THÔNG TIN NGƯỜI DÙNG CUNG CẤP =====\n${info()}\n\n===== TƯ LIỆU TẢI LÊN =====\n${filesText(['huongdan','mau','chuyenmon','skkncu'],15000)||'(không có)'}`;

/* ---------- Module 1 ---------- */
$('runAnalyze').onclick=e=>run(e.target,async()=>{if(!doc.f.topic)throw new Error('Nhập tên đề tài ở tab ① trước.');
 doc.analysis=await callGemini(`Bạn là nhóm chuyên gia giáo dục Việt Nam (GDPT 2018, nghiên cứu khoa học giáo dục, xét công nhận sáng kiến).
Phân tích đề tài sáng kiến sau, trình bày theo các mục:
## 1. Ý nghĩa và phạm vi đề tài
## 2. Tính cần thiết
## 3. Vấn đề thực tiễn cần giải quyết
## 4. Đối tượng và phạm vi áp dụng
## 5. Điểm mới, tính sáng tạo (chỉ nêu "điểm mới dự kiến" và căn cứ; KHÔNG khẳng định chưa ai làm; thiếu căn cứ → [CẦN BỔ SUNG])
## 6. Khả năng triển khai thực tế
## 7. Nhận xét tên đề tài và 2–3 phương án tên khoa học, ngắn gọn (nếu cần)
## 8. Các giải pháp chính đề xuất (3–5 giải pháp)
## 9. Đề cương chi tiết theo cấu trúc Phần I–VII
## 10. Thông tin thầy cô cần cung cấp thêm
${RULES}\n\n${ctx()}`);$('analysis').value=doc.analysis;});

/* ---------- Module 2 ---------- */
const PARTS=[
`# PHẦN I. THÔNG TIN CHUNG (tên sáng kiến, lĩnh vực áp dụng, tác giả/đồng tác giả, đơn vị, thời gian thực hiện, đối tượng và phạm vi áp dụng)
# PHẦN II. ĐẶT VẤN ĐỀ
## 1. Lý do chọn đề tài ## 2. Tính cấp thiết ## 3. Mục tiêu nghiên cứu ## 4. Đối tượng nghiên cứu ## 5. Phạm vi nghiên cứu ## 6. Phương pháp nghiên cứu`,
`# PHẦN III. NỘI DUNG SÁNG KIẾN
## 1. Cơ sở lý luận ## 2. Cơ sở pháp lý ## 3. Cơ sở thực tiễn ## 4. Thực trạng trước khi áp dụng ## 5. Thuận lợi và khó khăn ## 6. Nguyên nhân của những hạn chế
## 7. Các giải pháp thực hiện (liệt kê)
## 8. Phân tích chi tiết từng giải pháp — MỖI giải pháp là một mục "### Giải pháp n: ..." gồm đủ: a) Mục tiêu; b) Nội dung; c) Cách thức thực hiện (các bước cụ thể); d) Ví dụ minh họa; e) Kết quả đạt được (chỉ từ dữ liệu thật, thiếu → [CẦN BỔ SUNG]); g) Minh chứng thực tế (chỉ liệt kê minh chứng người dùng có, còn lại [CẦN BỔ SUNG])
## 9. Quy trình tổ chức thực hiện ## 10. Điều kiện thực hiện ## 11. Điểm mới và tính sáng tạo của sáng kiến`,
`# PHẦN IV. HIỆU QUẢ CỦA SÁNG KIẾN
## 1. Hiệu quả về giáo dục ## 2. Hiệu quả về chuyên môn ## 3. Hiệu quả về kinh tế (nếu có) ## 4. Hiệu quả về xã hội ## 5. Khả năng nhân rộng ## 6. Khả năng áp dụng tại đơn vị khác
Bắt buộc có BẢNG SO SÁNH TRƯỚC VÀ SAU (| Tiêu chí | Trước khi áp dụng | Sau khi áp dụng | Ghi chú |) chỉ dùng số thật; ô thiếu ghi [CẦN BỔ SUNG].
# PHẦN V. KẾT LUẬN VÀ KIẾN NGHỊ (kết luận; bài học kinh nghiệm; khả năng áp dụng, nhân rộng; kiến nghị với nhà trường, cơ quan quản lý, đơn vị liên quan)
# PHẦN VI. TÀI LIỆU THAM KHẢO (đánh số; chỉ nguồn có thật, kiểm tra được)
# PHẦN VII. PHỤ LỤC MINH CHỨNG (danh mục phụ lục dạng bảng | STT | Tên phụ lục | Nội dung | Tình trạng (Đã có/[CẦN BỔ SUNG]) |)`];
async function writePart(i){const prev=i?`\n\n===== PHẦN ĐÃ VIẾT TRƯỚC (để nhất quán, KHÔNG viết lại) =====\n${(doc.parts?.slice(0,i).join('\n\n')||'').slice(-12000)}`:'';
 return callGemini(`Bạn là chuyên gia viết sáng kiến kinh nghiệm ngành giáo dục Việt Nam. Viết ĐẦY ĐỦ, chi tiết, văn phong khoa học (đoạn văn hoàn chỉnh, không chỉ gạch đầu dòng) các phần sau của báo cáo sáng kiến:
${PARTS[i]}
Chỉ viết đúng các phần được yêu cầu, bắt đầu ngay bằng tiêu đề "# PHẦN ...".
Đề cương/phân tích đã thống nhất (nếu có):\n${(doc.analysis||'(chưa có)').slice(0,8000)}
${RULES}\n\n${ctx()}${prev}`,0.5);}
function assemble(){doc.report=doc.parts.filter(Boolean).join('\n\n');$('report').value=doc.report;}
$('runReport').onclick=e=>run(e.target,async()=>{if(!doc.f.topic)throw new Error('Nhập tên đề tài trước.');doc.parts=['','',''];
 for(let i=0;i<3;i++){setStatus(`Đang viết lượt ${i+1}/3…`);doc.parts[i]=await writePart(i);assemble();autosave();}});
document.querySelectorAll('.rp').forEach(b=>b.onclick=()=>run(b,async()=>{const i=+b.dataset.part;
 if(!doc.parts||doc.parts.length<3){doc.parts=splitParts(doc.report);} doc.parts[i]=await writePart(i);assemble();}));
function splitParts(t){const p=['','',''];let cur=0;(t||'').split('\n').forEach(l=>{if(/^# PHẦN III/.test(l))cur=1;else if(/^# PHẦN IV/.test(l))cur=2;p[cur]+=l+'\n';});return p;}
$('report').addEventListener('input',()=>{doc.parts=splitParts($('report').value);});
$('togglePrev').onclick=()=>{const p=$('reportPrev');p.hidden=!p.hidden;$('report').hidden=!p.hidden;if(!p.hidden)p.innerHTML=mdHTML($('report').value);};
function mdHTML(t){const L=t.split('\n');let h='',tbl=[];const flush=()=>{if(tbl.length){h+='<table>'+tbl.map(r=>'<tr>'+r.map(c=>`<td>${c}</td>`).join('')+'</tr>').join('')+'</table>';tbl=[];}};
 for(const l of L){const mk=s=>esc(s).replace(/\[CẦN[^\]]*\]/g,m=>`<mark>${m}</mark>`);
  if(/^\s*\|/.test(l)){if(/^\s*\|[\s:\-|]+\|\s*$/.test(l))continue;tbl.push(l.trim().replace(/^\||\|$/g,'').split('|').map(c=>mk(c.trim())));continue;}flush();
  const m=l.match(/^(#{1,3})\s+(.*)/);if(m)h+=`<h${m[1].length+1}>${mk(m[2])}</h${m[1].length+1}>`;else if(l.trim())h+=`<p>${mk(l)}</p>`;}flush();return h;}

/* ---------- Module 3 forms ---------- */
const FORMS=[['dondk','Đơn đăng ký sáng kiến / phiếu đăng ký tên đề tài',1],['donyc','Đơn yêu cầu công nhận sáng kiến (theo khung NĐ 13/2012 & TT 18/2013)',1],
 ['tacgia','Danh sách tác giả, đồng tác giả và tỷ lệ đóng góp',0],['bia','Bìa và trang phụ bìa sáng kiến',1],['tomtat','Báo cáo tóm tắt sáng kiến',1],
 ['mota','Bản mô tả giải pháp',1],['tinhmoi','Bản thuyết minh tính mới',0],['hieuqua','Bản thuyết minh hiệu quả áp dụng / bảng giải trình hiệu quả',0],
 ['denghi','Bản đề nghị công nhận sáng kiến (gửi Hội đồng)',0],['tudanhgia','Phiếu tự đánh giá tham khảo (KHÔNG phải phiếu của Hội đồng)',1],
 ['phieunx','Khung phiếu nhận xét, đánh giá sáng kiến (để trống cho Hội đồng)',0],['phieucham','Khung phiếu chấm điểm thành viên Hội đồng (để trống)',0],
 ['tonghop','Khung phiếu tổng hợp điểm & biên bản họp Hội đồng (để trống)',0],['khaosat','Mẫu phiếu khảo sát trước/sau (câu hỏi, để trống kết quả)',0],
 ['solieu','Phụ lục số liệu khảo sát trước – sau và bảng so sánh (từ dữ liệu thật)',0],['minhchung','Danh mục minh chứng',1]];
function renderFormChecks(){if(!doc.formSel?.length)doc.formSel=FORMS.filter(x=>x[2]).map(x=>x[0]);
 $('formChecks').innerHTML=FORMS.map(([k,n])=>`<label><input type="checkbox" value="${k}" ${doc.formSel.includes(k)?'checked':''}> ${n}</label>`).join('')+(filesOf('huongdan','mau').length?'<p class="muted"><b>✓ Có quy định/mẫu địa phương</b> — AI sẽ bám theo.</p>':'<p class="muted">Chưa tải quy định/mẫu địa phương → dùng khung tham khảo.</p>');
 $('formChecks').querySelectorAll('input').forEach(c=>c.onchange=()=>{doc.formSel=[...$('formChecks').querySelectorAll('input:checked')].map(x=>x.value);autosave();});}
function renderFormsOut(){$('formsOut').innerHTML=FORMS.filter(([k])=>doc.forms[k]).map(([k,n])=>`<h3>${n}</h3><textarea data-f="${k}" rows="16">${esc(doc.forms[k])}</textarea>`).join('');
 $('formsOut').querySelectorAll('[data-f]').forEach(t=>t.oninput=()=>{doc.forms[t.dataset.f]=t.value;autosave();});}
$('runForms').onclick=e=>run(e.target,async()=>{const sel=FORMS.filter(([k])=>doc.formSel.includes(k));if(!sel.length)throw new Error('Chọn ít nhất một biểu mẫu.');
 const local=filesText(['huongdan','mau'],20000);const sum=(doc.report||doc.analysis||'').slice(0,14000);
 for(const [k,n] of sel){setStatus('Đang tạo: '+n+'…');
  doc.forms[k]=await callGemini(`Soạn biểu mẫu hồ sơ sáng kiến: "${n}" bằng tiếng Việt, sẵn sàng đưa vào Word.
${local?`Có QUY ĐỊNH/MẪU CỦA ĐỊA PHƯƠNG do người dùng tải lên bên dưới — BÁM ĐÚNG tên gọi, bố cục, trường thông tin, thang điểm trong đó; ghi rõ căn cứ văn bản đó.`:`Chưa có mẫu địa phương: dùng khung THAM KHẢO theo Nghị định 13/2012/NĐ-CP và Thông tư 18/2013/TT-BKHCN, thực tiễn ngành giáo dục. Ghi ở đầu: "(Khung tham khảo – thầy cô đối chiếu mẫu chính thức của đơn vị xét duyệt)". Không tự đặt thang điểm và gọi là quy định.`}
Thể thức: có Quốc hiệu "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM" / "Độc lập – Tự do – Hạnh phúc" khi là đơn/văn bản; tên mẫu viết hoa ("# "); phần nơi nhận, địa danh ngày tháng, chữ ký. Trường thiếu → [CẦN BỔ SUNG]. Bảng dùng Markdown.
Phiếu dành cho Hội đồng: để trống ô điểm/nhận xét. Phiếu tự đánh giá: ghi rõ "PHIẾU TỰ ĐÁNH GIÁ THAM KHẢO – không phải phiếu của Hội đồng".
${RULES}\n\n===== THÔNG TIN =====\n${info()}\n\n===== NỘI DUNG SÁNG KIẾN (tóm) =====\n${sum}\n\n===== QUY ĐỊNH/MẪU ĐỊA PHƯƠNG =====\n${local||'(không có)'}`,0.3);
  renderFormsOut();autosave();}});

/* ---------- Module 5 score ---------- */
function rubricNote(){$('rubricNote').innerHTML=filesOf('phieucham').length?'<b>✓ Đã có phiếu chấm tải lên</b> — AI sẽ đọc tiêu chí, điểm tối đa và chấm theo đó.':'Chưa tải phiếu chấm → dùng <b>bộ tiêu chí THAM KHẢO</b> (tính mới, tính sáng tạo, khả năng áp dụng, hiệu quả, phạm vi ảnh hưởng, hình thức trình bày) — <b>không phải quy định địa phương</b>. Tải phiếu chấm thật ở tab ① (loại “Phiếu chấm”).';}
$('runScore').onclick=e=>run(e.target,async()=>{if(!doc.report)throw new Error('Cần có báo cáo ở tab ③ trước.');const pc=filesText(['phieucham'],20000);
 doc.score=await callGemini(`Bạn là chuyên gia thẩm định sáng kiến ngành giáo dục. Chấm điểm DỰ KIẾN, THAM KHẢO cho báo cáo sáng kiến dưới đây.
${pc?'Dùng ĐÚNG phiếu chấm người dùng cung cấp: liệt kê từng tiêu chí, điểm tối đa, trọng số đúng như phiếu.':'Chưa có phiếu chấm chính thức: dùng bộ tiêu chí tham khảo (Tính mới; Tính sáng tạo; Khả năng áp dụng; Hiệu quả thực tế; Phạm vi ảnh hưởng; Hình thức trình bày). Mở đầu bằng dòng: "BỘ TIÊU CHÍ THAM KHẢO – KHÔNG PHẢI THANG ĐIỂM CHÍNH THỨC CỦA ĐỊA PHƯƠNG". Chấm theo mức (Tốt/Khá/Đạt/Chưa đạt) kèm điểm gợi ý thang 10 cho mỗi tiêu chí.'}
Kết quả gồm: 1) Bảng | Tiêu chí | Điểm tối đa | Điểm dự kiến | Căn cứ |; 2) Tổng điểm dự kiến; 3) Ưu điểm; 4) Hạn chế; 5) Nội dung cần bổ sung, cách cải thiện cụ thể; 6) Khả năng đáp ứng điều kiện công nhận (thận trọng). Phần có [CẦN BỔ SUNG] thì không được cho điểm như đã có dữ liệu.
Kết thúc bằng: "Điểm AI chỉ mang tính tham khảo, không thay thế kết quả của Hội đồng có thẩm quyền."
${RULES}\n\n===== PHIẾU CHẤM =====\n${pc||'(không có)'}\n\n===== BÁO CÁO =====\n${doc.report.slice(0,60000)}`,0.2);$('score').value=doc.score;});

/* ---------- Module 6 check ---------- */
function refreshMissing(){const all=[doc.report,...Object.values(doc.forms||{})].join('\n');const m=[...new Set(all.match(/\[CẦN[^\]]*\]/g)||[])];
 $('missing').innerHTML=m.length?m.map(x=>`<li>${esc(x)}</li>`).join(''):'<li class="muted">Không còn mục [CẦN BỔ SUNG] (hoặc chưa có báo cáo).</li>';}
$('runCheck').onclick=e=>run(e.target,async()=>{if(!doc.report)throw new Error('Cần có báo cáo ở tab ③ trước.');
 doc.check=await callGemini(`Kiểm tra chất lượng và tính trung thực của báo cáo sáng kiến. Trả lời từng mục với kết luận (Đạt / Cần sửa / Không rõ), dẫn chứng câu cụ thể và đề xuất sửa:
1. Nội dung phù hợp tên đề tài? 2. Giải quyết đúng vấn đề thực tế? 3. Giải pháp cụ thể, đủ mục tiêu/nội dung/cách làm/ví dụ/kết quả/minh chứng? 4. Điểm mới có căn cứ? 5. Có số liệu trước và sau? 6. Số liệu nhất quán (cộng tổng, tỉ lệ, sĩ số khớp nhau)? 7. Minh chứng cho từng giải pháp? 8. Trùng lặp nội dung? 9. Trích dẫn nguồn? 10. Văn bản có thể hết hiệu lực/bị thay thế (liệt kê, khuyên kiểm tra trên vbpl.vn / thuvienphapluat)? 11. Nội dung thiếu căn cứ, có dấu hiệu bịa (số liệu, tên người, kết quả không có trong thông tin người dùng cung cấp)? 12. Dấu hiệu sao chép (văn mẫu sáo rỗng, đoạn giống SKKN cũ tải lên)?
Cuối cùng: danh sách việc cần làm ưu tiên trước khi nộp. Không khẳng định chắc chắn về hiệu lực văn bản nếu không có căn cứ.
===== THÔNG TIN THẬT NGƯỜI DÙNG CUNG CẤP =====\n${info()}\n${filesText(['chuyenmon'],8000)}\n===== SKKN CŨ (so sao chép) =====\n${filesText(['skkncu'],10000)||'(không có)'}\n===== BÁO CÁO =====\n${doc.report.slice(0,60000)}`,0.2);$('check').value=doc.check;});

/* ---------- Progress ---------- */
function progress(){const req=['topic','author','unit','year','before','solutions','results'];let p=req.filter(k=>(doc.f[k]||'').trim()).length/req.length*30;
 if(doc.analysis)p+=10;if(doc.report)p+=30;if(Object.keys(doc.forms||{}).length)p+=10;if(doc.score)p+=10;if(doc.check)p+=10;
 const miss=(doc.report.match(/\[CẦN[^\]]*\]/g)||[]).length;if(doc.report&&miss)p-=Math.min(10,miss);p=Math.max(0,Math.round(p));
 $('progBar').style.width=p+'%';$('progTxt').textContent=`Hồ sơ hoàn thành ${p}%`+(miss?` · còn ${miss} chỗ [CẦN BỔ SUNG]`:'');}

/* ---------- Export ---------- */
const slug=s=>(s||'sang-kien').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').replace(/[^\w]+/g,'-').replace(/^-|-$/g,'').slice(0,60).toLowerCase();
function runs(t,o={}){const D=docx;return t.split(/(\[CẦN[^\]]*\])/).filter(Boolean).map(s=>new D.TextRun({text:s.replace(/\*\*/g,''),...o,...(/^\[CẦN/.test(s)?{highlight:'yellow'}:{})}));}
function bodyOf(text){const D=docx;const out=[];let tbl=[];
 const flush=()=>{if(!tbl.length)return;const n=Math.max(...tbl.map(r=>r.length));
  out.push(new D.Table({width:{size:100,type:D.WidthType.PERCENTAGE},rows:tbl.map((r,ri)=>new D.TableRow({cantSplit:true,tableHeader:ri===0,children:Array.from({length:n},(_,i)=>new D.TableCell({children:[new D.Paragraph({children:runs(r[i]||'',ri===0?{bold:true}:{})})]}))}))}));out.push(new D.Paragraph(''));tbl=[];};
 for(const l of text.split('\n')){
  if(/^\s*\|/.test(l)){if(!/^\s*\|[\s:\-|]+\|\s*$/.test(l))tbl.push(l.trim().replace(/^\||\|$/g,'').split('|').map(c=>c.trim()));continue;}flush();
  const m=l.match(/^(#{1,3})\s+(.*)/);
  if(m){const lv=m[1].length;out.push(new D.Paragraph({heading:[D.HeadingLevel.HEADING_1,D.HeadingLevel.HEADING_2,D.HeadingLevel.HEADING_3][lv-1],alignment:lv===1?D.AlignmentType.CENTER:D.AlignmentType.LEFT,children:runs(m[2])}));}
  else if(l.trim())out.push(new D.Paragraph({alignment:D.AlignmentType.JUSTIFIED,indent:{firstLine:567},children:runs(l.replace(/^[-*]\s+/,'- '))}));}
 flush();return out;}
function makeDocx(sections,toc){const D=docx;const sz=+$('fontSize').value;
 const props={page:{size:{width:11906,height:16838},margin:{top:1134,bottom:1134,left:1701,right:1134}}};
 const footers={default:new D.Footer({children:[new D.Paragraph({alignment:D.AlignmentType.CENTER,children:[new D.TextRun({children:[D.PageNumber.CURRENT]})]})]})};
 return new D.Document({features:{updateFields:!!toc},styles:{default:{document:{run:{font:'Times New Roman',size:sz},paragraph:{spacing:{line:312,after:80}}}},
  paragraphStyles:[1,2,3].map(i=>({id:'Heading'+i,name:'Heading '+i,basedOn:'Normal',next:'Normal',quickFormat:true,run:{font:'Times New Roman',bold:true,size:sz+(i===1?2:0),color:'000000',italics:i===3},paragraph:{spacing:{before:200,after:100}}}))},
  sections:sections.map(s=>({properties:props,footers,children:s}))});}
function coverChildren(){const D=docx,f=doc.f,c=(t,o={})=>new D.Paragraph({alignment:D.AlignmentType.CENTER,spacing:{after:120},children:[new D.TextRun({text:t,...o})]});
 return [c((f.unit?'':'')+'[CƠ QUAN CHỦ QUẢN]'.replace('[CƠ QUAN CHỦ QUẢN]',f.province?('UBND / SỞ GD&ĐT '+f.province.toUpperCase()):'[CẦN BỔ SUNG: cơ quan chủ quản]')),c((f.unit||'[CẦN BỔ SUNG: đơn vị]').toUpperCase(),{bold:true}),
  ...Array(6).fill(0).map(()=>new D.Paragraph('')),c('SÁNG KIẾN KINH NGHIỆM',{bold:true,size:36}),new D.Paragraph(''),c((f.topic||'').toUpperCase(),{bold:true,size:32}),...Array(4).fill(0).map(()=>new D.Paragraph('')),
  c('Tác giả: '+(f.author||'[CẦN BỔ SUNG]')),c('Chức vụ: '+(f.position||'')+(f.title?' – '+f.title:'')),c('Lĩnh vực: '+(f.field||'')+' – Cấp học: '+(f.level||'')),...Array(6).fill(0).map(()=>new D.Paragraph('')),c((f.province||'')+', năm học '+(f.year||''),{italics:true})];}
async function reportBlob(){if(!doc.report)throw new Error('Chưa có báo cáo.');const D=docx;
 const toc=[new D.Paragraph({alignment:D.AlignmentType.CENTER,children:[new D.TextRun({text:'MỤC LỤC',bold:true})]}),new D.TableOfContents('Mục lục',{hyperlink:true,headingStyleRange:'1-3'})];
 return D.Packer.toBlob(makeDocx([coverChildren(),toc,bodyOf(doc.report)],true));}
async function formsBlob(keys){const D=docx;const secs=keys.filter(k=>doc.forms[k]).map(k=>bodyOf(doc.forms[k]));if(!secs.length)throw new Error('Chưa tạo biểu mẫu nào (tab ④).');return D.Packer.toBlob(makeDocx(secs));}
const nm=()=>slug(doc.f.topic);
$('expReport').onclick=()=>run(null,async()=>saveAs(await reportBlob(),`bao-cao-skkn-${nm()}.docx`));
$('expForms').onclick=()=>run(null,async()=>saveAs(await formsBlob(Object.keys(doc.forms)),`bieu-mau-skkn-${nm()}.docx`));
$('expZip').onclick=()=>run(null,async()=>{const z=new JSZip();if(doc.report)z.file(`01-bao-cao-skkn-${nm()}.docx`,await reportBlob());
 let i=2;for(const [k] of FORMS)if(doc.forms[k])z.file(`${String(i++).padStart(2,'0')}-${k}.docx`,await formsBlob([k]));
 const rows=[['Mục','Nội dung'],...FIELDS.map(([k,l])=>[l,doc.f[k]||''])];z.file('thong-tin-ho-so.csv','\ufeff'+rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n'));
 if(doc.score)z.file('cham-diem-tham-khao.txt',doc.score);if(doc.check)z.file('ket-qua-kiem-tra.txt',doc.check);z.file('ho-so.json',JSON.stringify(doc,null,1));
 saveAs(await z.generateAsync({type:'blob'}),`ho-so-skkn-${nm()}.zip`);});
$('expPrint').onclick=()=>{$('reportPrev').innerHTML=mdHTML(doc.report||'');document.querySelector('[data-t="t3"]').click();$('reportPrev').hidden=false;$('report').hidden=true;setTimeout(()=>window.print(),300);};

/* ---------- Init ---------- */
renderForm();doc=JSON.parse(localStorage.getItem('skkn_current')||'null')||blank();doc.forms=doc.forms||{};doc.files=doc.files||[];loadDocToUI();renderLib();
