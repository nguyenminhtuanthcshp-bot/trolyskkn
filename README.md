# TROLYSKKN · AI SKKN PRO – Trợ lý sáng kiến kinh nghiệm

Trang web miễn phí, chạy hoàn toàn trên trình duyệt (không máy chủ), hỗ trợ giáo viên và cán bộ quản lý viết **bản thảo** sáng kiến kinh nghiệm và bộ hồ sơ.

## Dùng lần đầu
1. Mở trang → tab **🔑 Khóa AI** → dán khóa Gemini miễn phí (tạo tại https://aistudio.google.com/apikey) → **Lưu khóa**. Khóa chỉ lưu trên trình duyệt (tên `gemini_key`, dùng chung với Bút Ký AI — đã lưu bên Bút Ký AI thì không cần dán lại).
2. Không có khóa nào trong mã nguồn.

## Quy trình
1. **① Nhập liệu**: tên đề tài, tác giả, đơn vị, cấp học, lĩnh vực, năm học, cấp đề nghị, thực trạng, giải pháp, số liệu thật. Tải tư liệu (.docx, .pdf có chữ, .txt): quy định/công văn địa phương, phiếu chấm, mẫu đơn, SKKN cũ, tài liệu chuyên môn.
2. **② Phân tích & đề cương** → sửa trực tiếp.
3. **③ Viết báo cáo** (3 lượt: Phần I–II, III, IV–VII) → xem trước, sửa.
4. **④ Biểu mẫu**: tích chọn đơn đăng ký, đơn yêu cầu công nhận, báo cáo tóm tắt, bản mô tả, thuyết minh, phiếu tự đánh giá, danh mục minh chứng…
5. **⑤ Chấm điểm tham khảo** (theo phiếu chấm tải lên, nếu không có thì bộ tiêu chí tham khảo).
6. **⑥ Kiểm tra**: 12 tiêu chí chất lượng, trung thực + danh sách [CẦN BỔ SUNG].
7. **⑦ Xuất**: Word (A4, Times New Roman, lề trái 3 cm, số trang, mục lục tự động), ZIP toàn bộ hồ sơ, In/Lưu PDF.

Hồ sơ tự lưu trên máy; tab 🔑 có lưu nhiều hồ sơ, lọc, sao lưu/phục hồi .json.

## Gói khung tham khảo theo tỉnh/thành
- Tab **① Nhập liệu** có bộ chọn 34 tỉnh/thành sau sắp xếp; tab **④ Biểu mẫu** hiển thị gói đang dùng. Gói cung cấp tên địa phương, Sở GDĐT và chỉ dẫn thể thức/nơi nhận cho AI viết biểu mẫu, báo cáo, chấm và kiểm tra.
- Chọn **Khác / chưa chọn** để nhập tên tự do và dùng khung quốc gia. Hồ sơ cũ vẫn giữ `f.province` dạng chuỗi, kể cả tên địa phương trước sắp xếp; không tự chuyển tên tỉnh cũ sang tỉnh mới.
- Ngoài Vĩnh Long, chưa xác minh quy định SKKN riêng: **33 gói còn lại dùng cùng các ô chọn gợi ý mặc định**, không phải danh mục hồ sơ bắt buộc. Đổi tỉnh đặt lại ô chọn gợi ý nhưng **không xóa biểu mẫu đã tạo**; mở lại hồ sơ giữ nguyên lựa chọn (kể cả bỏ chọn tất cả).
- Các gói thông thường **không phải bộ mẫu chính thức của tỉnh**; gói Vĩnh Long có cấu trúc mẫu đã đối chiếu như dưới đây. Tải quy định/hướng dẫn và mẫu hiện hành ở tab ① để AI ưu tiên; kiểm tra đúng địa phương, cơ quan tiếp nhận, thẩm quyền và hiệu lực sau sắp xếp. Chỗ chưa rõ hiệu lực phải ghi `[CẦN KIỂM TRA HIỆU LỰC]`. Không tự gán nơi nhận là Sở/Phòng khi chưa có căn cứ.
- Nguồn danh mục/mã 34 đơn vị: [Quyết định 19/2025/QĐ-TTg, hiệu lực 01/07/2025](https://xaydungchinhsach.chinhphu.vn/bang-danh-muc-va-ma-so-cua-34-tinh-thanh-moi-cac-don-vi-hanh-chinh-cap-xa-moi-11925070418263625.htm); căn cứ sắp xếp: [Nghị quyết 202/2025/QH15 của Quốc hội](https://chinhphu.vn/?classid=1&docid=213930&orggroupid=1&pageid=27160). Dữ liệu nằm trong `provinces.js`; `legalRefs` để trống ở 33 gói chưa có văn bản SKKN địa phương được xác minh.

### Vĩnh Long — theo nguồn do người dùng cung cấp
Đã đối chiếu bản scan **Công báo Vĩnh Long số 51 ngày 06/07/2026, trang 14–36**, Quyết định **62/2026/QĐ-UBND ngày 02/07/2026** của **UBND tỉnh Vĩnh Long**, ban hành Quy định chi tiết và hướng dẫn thi hành Điều lệ Sáng kiến trên địa bàn tỉnh; hiệu lực **15/07/2026**, bãi bỏ QĐ 08/2025/QĐ-UBND ngày 20/01/2025. Không đưa tệp PDF người dùng lên kho mã, không tự tạo đường dẫn nguồn. Căn cứ khác trong gói: NQ 43/2025/NQ-HĐND của HĐND tỉnh (22/12/2025), NĐ 13/2012/NĐ-CP, TT 18/2013/TT-BKHCN.
- Đầu mối cấp tỉnh là **Sở Khoa học và Công nghệ tỉnh Vĩnh Long**, không mặc định gửi Sở GDĐT; cơ sở/Hội đồng công nhận phải theo đúng thẩm quyền.
- Gợi ý **Phiếu đánh giá Mẫu 01** (2 tiêu chí: tính mới; đã áp dụng/áp dụng thử và có khả năng mang lợi ích thiết thực; **Đạt/Không đạt**, không đặt thang điểm). Phiếu Hội đồng để trống; bản tự đánh giá phải ghi rõ tham khảo. Tab ⑤ mặc định đánh giá hai tiêu chí, có trạng thái “Chưa đủ căn cứ”; phiếu chấm tải lên vẫn được ưu tiên.
- Gợi ý **Biên bản kiểm phiếu Mẫu 02**: Đạt khi có ít nhất **2/3 số phiếu Đạt trên tổng thành viên Hội đồng có mặt**, không đổi mẫu số thành số phiếu hợp lệ; số liệu họp, kết luận và chữ ký để trống.
- **Mẫu 03** là báo cáo định kỳ của đơn vị, tùy chọn, không phải thành phần bắt buộc hồ sơ cá nhân. Bản thảo có cấu trúc mục/phụ lục; cần đối chiếu đủ cột bảng với bản gốc.
- Điều 9: mỗi đơn chỉ một giải pháp; tác giả và đồng tác giả cùng ký; kèm tài liệu chứng minh áp dụng/lợi ích, báo cáo hiệu quả, văn bản phối hợp, ảnh/sản phẩm/mô hình giảng dạy theo thực tế. Thời hiệu 01 năm từ áp dụng lần đầu (áp dụng thử lần đầu nếu có), cần ngày thật để kiểm tra. **Đơn vị sự nghiệp công lập giáo dục không bắt buộc đăng ký ngay đầu năm học** (Điều 9.1.a), nên không tích sẵn đơn đăng ký.
- Đây vẫn là **bản thảo AI theo cấu trúc đã đối chiếu**, không bảo đảm sao chép nguyên trạng mẫu/cột bảng hoặc đã rà mọi thay đổi pháp luật sau khi ban hành. Kiểm tra bản gốc, hiệu lực và tư liệu hiện hành trước khi nộp.

## Giới hạn trung thực
- AI chỉ hỗ trợ bản thảo; Hội đồng có thẩm quyền quyết định. Điểm AI chỉ tham khảo.
- Không bịa số liệu, tên người, kết quả: chỗ thiếu ghi `[CẦN BỔ SUNG]`.
- Không đưa dữ liệu cá nhân học sinh lên AI.
- Biểu mẫu mặc định là khung tham khảo theo NĐ 13/2012/NĐ-CP, TT 18/2013/TT-BKHCN; không phải mẫu chính thức của tỉnh nào trừ khi tải quy định địa phương lên. Luôn kiểm tra hiệu lực văn bản.

## Chưa có (dự kiến)
Tài khoản/phân quyền, CSDL máy chủ, tự tra cứu văn bản pháp luật trực tuyến, xuất .xlsx/PDF trực tiếp.

## Kiểm thử gói tỉnh/thành
Không cần khóa AI; các lời gọi Gemini được giả lập trong kiểm thử DOM:
```sh
npm install --prefix /tmp/trolyskkn-tests --no-package-lock jsdom
NODE_PATH=/tmp/trolyskkn-tests/node_modules node tests/provinces.cjs
node --check app.js && node --check provinces.js
```
Kiểm tra 34 lựa chọn, gói mặc định, hồ sơ cũ/tên tự do, giữ ô chọn tùy chỉnh (kể cả rỗng), không xóa nội dung đã tạo và ngữ cảnh trong lời nhắc tạo mẫu/chấm/kiểm tra. Cần Node.js hỗ trợ phiên bản jsdom được cài.

## Triển khai
GitHub Pages (nhánh `main`, thư mục gốc). Thư mục `private/` bị bỏ qua.
