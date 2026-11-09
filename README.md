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
- Chưa xác minh quy định SKKN riêng của từng địa phương: **tất cả gói dùng cùng các ô chọn gợi ý mặc định**, không phải danh mục hồ sơ bắt buộc. Đổi tỉnh đặt lại ô chọn gợi ý nhưng **không xóa biểu mẫu đã tạo**; mở lại hồ sơ giữ nguyên lựa chọn (kể cả bỏ chọn tất cả).
- Các gói **không phải bộ mẫu chính thức của tỉnh**. Tải quy định/hướng dẫn và mẫu hiện hành ở tab ① để AI ưu tiên; kiểm tra đúng địa phương, cơ quan tiếp nhận, thẩm quyền và hiệu lực sau sắp xếp. Chỗ chưa rõ hiệu lực phải ghi `[CẦN KIỂM TRA HIỆU LỰC]`. Không tự gán nơi nhận là Sở/Phòng khi chưa có căn cứ.
- Nguồn danh mục/mã 34 đơn vị: [Quyết định 19/2025/QĐ-TTg, hiệu lực 01/07/2025](https://xaydungchinhsach.chinhphu.vn/bang-danh-muc-va-ma-so-cua-34-tinh-thanh-moi-cac-don-vi-hanh-chinh-cap-xa-moi-11925070418263625.htm); căn cứ sắp xếp: [Nghị quyết 202/2025/QH15 của Quốc hội](https://chinhphu.vn/?classid=1&docid=213930&orggroupid=1&pageid=27160). Dữ liệu nằm trong `provinces.js`; `legalRefs` để trống vì chưa xác minh văn bản SKKN địa phương.

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
