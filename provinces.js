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
