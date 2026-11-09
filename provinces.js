/* Khung tham khảo, không phải bộ mẫu chính thức địa phương.
 * Danh mục/mã: Quyết định 19/2025/QĐ-TTg (hiệu lực 01/07/2025).
 * https://xaydungchinhsach.chinhphu.vn/bang-danh-muc-va-ma-so-cua-34-tinh-thanh-moi-cac-don-vi-hanh-chinh-cap-xa-moi-11925070418263625.htm
 * Sắp xếp: Nghị quyết 202/2025/QH15 của Quốc hội.
 * Chưa xác minh quy định SKKN địa phương: không suy diễn danh sách hồ sơ bắt buộc.
 */
const PROVINCE_FORMS=['dondk','donyc','bia','tomtat','mota','tudanhgia','minhchung'];
const PROVINCES=[
 ['01','Thành phố Hà Nội'],['04','Tỉnh Cao Bằng'],['08','Tỉnh Tuyên Quang'],
 ['11','Tỉnh Điện Biên'],['12','Tỉnh Lai Châu'],['14','Tỉnh Sơn La'],
 ['15','Tỉnh Lào Cai'],['19','Tỉnh Thái Nguyên'],['20','Tỉnh Lạng Sơn'],
 ['22','Tỉnh Quảng Ninh'],['24','Tỉnh Bắc Ninh'],['25','Tỉnh Phú Thọ'],
 ['31','Thành phố Hải Phòng'],['33','Tỉnh Hưng Yên'],['37','Tỉnh Ninh Bình'],
 ['38','Tỉnh Thanh Hóa'],['40','Tỉnh Nghệ An'],['42','Tỉnh Hà Tĩnh'],
 ['44','Tỉnh Quảng Trị'],['46','Thành phố Huế'],['48','Thành phố Đà Nẵng'],
 ['51','Tỉnh Quảng Ngãi'],['52','Tỉnh Gia Lai'],['56','Tỉnh Khánh Hòa'],
 ['66','Tỉnh Đắk Lắk'],['68','Tỉnh Lâm Đồng'],['75','Tỉnh Đồng Nai'],
 ['79','Thành phố Hồ Chí Minh'],['80','Tỉnh Tây Ninh'],['82','Tỉnh Đồng Tháp'],
 ['86','Tỉnh Vĩnh Long'],['91','Tỉnh An Giang'],['92','Thành phố Cần Thơ'],['96','Tỉnh Cà Mau']
].map(([id,name])=>({id,name,department:'Sở Giáo dục và Đào tạo '+name.replace(/^(Tỉnh|Thành phố) /,''),
 suggestedForms:[...PROVINCE_FORMS],legalRefs:[],
 promptNotes:'Quốc hiệu: CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM / Độc lập – Tự do – Hạnh phúc (khi là đơn/văn bản). Kính gửi Hội đồng sáng kiến cấp phù hợp với cấp đề nghị công nhận; chỉ ghi Sở GDĐT hoặc cơ quan tiếp nhận khi tư liệu xác nhận thẩm quyền. Chưa rõ thì ghi [CẦN BỔ SUNG: cơ quan tiếp nhận/Hội đồng có thẩm quyền]. Không tự suy ra Phòng GDĐT cấp huyện hoặc tên Hội đồng sau sắp xếp.'}));
const OTHER_PROVINCE={id:'',name:'Khác / chưa chọn',department:'',suggestedForms:[...PROVINCE_FORMS],legalRefs:[],promptNotes:''};
function findProvince(name){const norm=s=>String(s||'').trim().normalize('NFC').toLocaleLowerCase('vi').replace(/^(tỉnh|thành phố|tp\.?)\s+/,'');return PROVINCES.find(p=>norm(p.name)===norm(name));}

/* Đối chiếu bản scan do người dùng cung cấp: Công báo Vĩnh Long số 51,
 * ngày 06/07/2026, trang 14–36; không đưa tệp người dùng lên kho mã.
 * Mẫu 01: trang 30–32; Mẫu 02: trang 32–33; Mẫu 03: trang 33–36.
 */
const VINHLONG_MAU01=`Mẫu 01 — PHIẾU ĐÁNH GIÁ (QĐ 62/2026/QĐ-UBND).
Quốc hiệu/tiêu ngữ; (1) Tên cơ sở công nhận sáng kiến.
1. Tên sáng kiến; 2. Tác giả sáng kiến; 3. Họ và tên thành viên Hội đồng;
4. Đánh giá của thành viên Hội đồng: bảng | TT | Tên chỉ tiêu đánh giá | Đạt | Không đạt |.
Chỉ tiêu 1: Tính mới — đạt khi đủ: không trùng nội dung sáng kiến trong yêu cầu công nhận nộp trước; chưa bị bộc lộ công khai trong phạm vi cơ sở bằng mọi hình thức trong văn bản, sách báo, tài liệu kỹ thuật đến mức có thể thực hiện ngay; không trùng sáng kiến người khác đã áp dụng/áp dụng thử hoặc đưa vào kế hoạch áp dụng, phổ biến hoặc chuẩn bị điều kiện áp dụng, phổ biến; chưa được quy định thành tiêu chuẩn, quy trình, quy phạm bắt buộc.
Ghi chú: xét tính mới trong phạm vi cơ sở trước ngày nộp đơn hoặc ngày bắt đầu áp dụng thử/áp dụng lần đầu (ngày nào sớm hơn).
Chỉ tiêu 2: Đã được áp dụng hoặc áp dụng thử và có khả năng mang lại lợi ích thiết thực. Giải thích: hiệu quả kinh tế (năng suất lao động, giảm chi phí quản lý, chất lượng công việc/dịch vụ, hiệu quả kỹ thuật...) hoặc lợi ích xã hội (an toàn lao động, điều kiện sống/làm việc, môi trường, sức khỏe...).
Hàng Kết quả. Hai tiêu chí đều đạt → Đạt; một hoặc hai tiêu chí không đạt → Không đạt. Không dùng thang điểm.
5. Nhận xét: Tính mới; Hiệu quả kinh tế; Hiệu quả về lợi ích xã hội; Các ý kiến khác.
Địa danh, ngày tháng năm; Thành viên Hội đồng ký. Ô Đạt/Không đạt, kết quả, nhận xét và chữ ký của Hội đồng để trống, không tự điền người hay kết quả. Nếu là phiếu tự đánh giá thì ghi rõ bản tự đánh giá tham khảo, KHÔNG phải phiếu Hội đồng.`;
const VINHLONG_MAU02=`Mẫu 02 — BIÊN BẢN KIỂM PHIẾU (QĐ 62/2026/QĐ-UBND).
Quốc hiệu/tiêu ngữ; (1) Tên cơ sở công nhận sáng kiến.
1. Tên sáng kiến; 2. Tên tác giả; 3. Quyết định thành lập Hội đồng xét sáng kiến;
4. Kết quả bỏ phiếu đánh giá: Số phiếu phát ra; Số phiếu thu về; Số phiếu hợp lệ; Số phiếu đánh giá ở mức đạt, không đạt/tổng số phiếu hợp lệ; Đạt …/…; Không đạt …/….
5. Kết luận: Đạt khi có ít nhất 2/3 số phiếu đánh giá Đạt trên tổng số thành viên Hội đồng CÓ MẶT (không đổi mẫu số thành số phiếu hợp lệ). Ô Đạt / Không đạt để trống.
Địa danh, ngày tháng năm; chữ ký Thư ký — Chủ tịch hội đồng. Để trống số phiếu, kết luận, số quyết định, thành viên và chữ ký khi chưa có dữ liệu; không giả lập kết quả họp.`;
const VINHLONG_MAU03=`Mẫu 03 — MẪU BÁO CÁO KẾT QUẢ HOẠT ĐỘNG SÁNG KIẾN CỦA ĐƠN VỊ (QĐ 62/2026/QĐ-UBND), tùy chọn, KHÔNG phải hồ sơ cá nhân giáo viên.
Tên đơn vị báo cáo; quốc hiệu/tiêu ngữ. Kính gửi: Sở Khoa học và Công nghệ tỉnh Vĩnh Long.
BÁO CÁO KẾT QUẢ TRIỂN KHAI CÁC BIỆN PHÁP THÚC ĐẨY HOẠT ĐỘNG SÁNG KIẾN GIAI ĐOẠN TỪ … ĐẾN …
I. Khuyến khích phong trào thi đua lao động sáng tạo: 1. Kết quả hoạt động; 2. Nhận xét.
II. Phổ biến sáng kiến: 1. Kết quả hoạt động; 2. Nhận xét.
Phụ lục số liệu tổng hợp, lập bảng riêng: 1. Sáng kiến của cơ quan, tổ chức, doanh nghiệp Nhà nước; 2. Sáng kiến của doanh nghiệp ngoài Nhà nước; 3. Sáng kiến của đối tượng khác (nông dân, học sinh, sinh viên, người lao động tự do...); 4. Hoạt động chuyển giao sáng kiến; 5. Cấp kinh phí nghiên cứu phát triển và hoàn thiện, áp dụng sáng kiến; 6. Hủy bỏ việc công nhận sáng kiến.
Thiếu dữ liệu đơn vị thì để [CẦN BỔ SUNG], không lấy dữ liệu cá nhân suy ra toàn đơn vị. Đây là bản thảo theo cấu trúc, cần đối chiếu đủ cột phụ lục với bản gốc trước khi nộp.`;
Object.assign(PROVINCES.find(p=>p.id==='86'),{
 leadAgency:'Sở Khoa học và Công nghệ tỉnh Vĩnh Long',
 source:'Công báo Vĩnh Long số 51, ngày 06/07/2026, trang 14–36; bản scan do người dùng cung cấp, đã đối chiếu.',
 legalRefs:[
  {number:'62/2026/QĐ-UBND',issuer:'UBND tỉnh Vĩnh Long',date:'02/07/2026',effective:'15/07/2026',title:'Ban hành Quy định chi tiết và hướng dẫn thi hành Điều lệ Sáng kiến trên địa bàn tỉnh Vĩnh Long',repeals:'08/2025/QĐ-UBND ngày 20/01/2025'},
  {number:'43/2025/NQ-HĐND',issuer:'HĐND tỉnh Vĩnh Long',date:'22/12/2025',title:'Nội dung và mức chi ngân sách nhà nước cho hoạt động sáng kiến (được dẫn trong QĐ 62/2026)'},
  {number:'13/2012/NĐ-CP',issuer:'Chính phủ',date:'02/03/2012'},
  {number:'18/2013/TT-BKHCN',issuer:'Bộ Khoa học và Công nghệ',date:'01/08/2013'}
 ],
 suggestedForms:['donyc','bia','tomtat','mota','hieuqua','tudanhgia','phieucham','tonghop','minhchung'],
 formLabels:{phieucham:'Phiếu đánh giá — Mẫu 01 (Vĩnh Long, để trống cho Hội đồng)',phieunx:'Phiếu đánh giá, nhận xét — Mẫu 01 (Vĩnh Long, để trống)',tonghop:'Biên bản kiểm phiếu — Mẫu 02 (Vĩnh Long, để trống)',baocaodonvi:'Báo cáo hoạt động sáng kiến của đơn vị — Mẫu 03 (Vĩnh Long, tùy chọn)'},
 formPrompts:{phieucham:VINHLONG_MAU01,phieunx:VINHLONG_MAU01,tudanhgia:VINHLONG_MAU01,tonghop:VINHLONG_MAU02,baocaodonvi:VINHLONG_MAU03},
 promptNotes:`Quốc hiệu CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM / Độc lập – Tự do – Hạnh phúc khi là đơn/văn bản. Cơ quan đầu mối cấp tỉnh: Sở Khoa học và Công nghệ tỉnh Vĩnh Long, KHÔNG mặc định gửi Sở GDĐT. Kính gửi cơ sở/Hội đồng có thẩm quyền công nhận theo cấp đề nghị và tư liệu; thiếu tên cơ sở thì [CẦN BỔ SUNG].
QĐ 62/2026/QĐ-UBND có hiệu lực 15/07/2026, bãi bỏ QĐ 08/2025/QĐ-UBND; không dùng quyết định đã bãi bỏ làm căn cứ hiện hành. Chỉ trích các căn cứ trong legalRefs hoặc văn bản người dùng tải lên, không tự thêm số hiệu.
Điều 9.1.a: đơn vị sự nghiệp công lập giáo dục và đào tạo KHÔNG bắt buộc đăng ký ngay đầu năm học; tác giả chủ động chọn thời điểm đề nghị phù hợp.
Điều 9: mỗi đơn chỉ một giải pháp; tác giả ký, ghi rõ họ tên; có đồng tác giả thì người nộp thuộc nhóm và tất cả đồng tác giả đồng ý, cùng ký. Kèm tài liệu chứng minh áp dụng hoặc khả năng mang lợi ích thiết thực: văn bản triển khai, báo cáo hiệu quả, văn bản phối hợp, hình ảnh, sản phẩm/mô hình giảng dạy; chỉ liệt kê đã có, thiếu thì [CẦN BỔ SUNG]. Đơn theo khoản 3 Điều 5 NĐ 13/2012 và khoản 1 Điều 5 TT 18/2013, không bịa mẫu đơn mới. Thời hiệu 01 năm từ áp dụng lần đầu (tính từ áp dụng thử lần đầu nếu có), Điều 9.2.d; cần ngày thật để kiểm tra.
Điều 10: họp khi có ít nhất 2/3 thành viên, có Chủ tịch hoặc Phó Chủ tịch được ủy quyền; thành viên vắng gửi phiếu trước họp. Mẫu 01: đúng hai tiêu chí Tính mới và Đã áp dụng/áp dụng thử, có khả năng mang lợi ích thiết thực; Đạt/Không đạt, không đặt điểm số. Mẫu 02: ít nhất 2/3 phiếu Đạt trên tổng thành viên CÓ MẶT; không lấy số phiếu hợp lệ làm mẫu số. Để trống dữ liệu họp/Hội đồng chưa có.
Mẫu 03 là báo cáo định kỳ đơn vị, tùy chọn, không bắt buộc cho hồ sơ cá nhân. Bản thảo phải đối chiếu bản gốc; không khẳng định đã rà soát mọi sửa đổi sau ngày ban hành.`,
 scorePrompt:'Dùng hai tiêu chí Mẫu 01 theo QĐ 62/2026/QĐ-UBND: Tính mới trong phạm vi cơ sở; Đã áp dụng/áp dụng thử và có khả năng mang lại lợi ích thiết thực. Chỉ đánh giá tham khảo Đạt / Không đạt / Chưa đủ căn cứ, KHÔNG cho điểm số, điểm tối đa, trọng số hay tổng điểm. Hai tiêu chí đạt thì kết luận dự kiến Đạt; một tiêu chí không đạt thì Không đạt; thiếu căn cứ phải ghi Chưa đủ căn cứ, không tự suy ra phiếu Hội đồng.'
});
