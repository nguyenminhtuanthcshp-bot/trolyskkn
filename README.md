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

## Giới hạn trung thực
- AI chỉ hỗ trợ bản thảo; Hội đồng có thẩm quyền quyết định. Điểm AI chỉ tham khảo.
- Không bịa số liệu, tên người, kết quả: chỗ thiếu ghi `[CẦN BỔ SUNG]`.
- Không đưa dữ liệu cá nhân học sinh lên AI.
- Biểu mẫu mặc định là khung tham khảo theo NĐ 13/2012/NĐ-CP, TT 18/2013/TT-BKHCN; không phải mẫu chính thức của tỉnh nào trừ khi tải quy định địa phương lên. Luôn kiểm tra hiệu lực văn bản.

## Chưa có (dự kiến)
Tài khoản/phân quyền, CSDL máy chủ, tự tra cứu văn bản pháp luật trực tuyến, bộ mẫu chuẩn từng tỉnh, xuất .xlsx/PDF trực tiếp.

## Triển khai
GitHub Pages (nhánh `main`, thư mục gốc). Thư mục `private/` bị bỏ qua.
