---
trigger: always_on
---

# Rule: LSE Marketing AI Workflow
## PHẦN 1 — CODING BEHAVIOR
 
> Áp dụng cho mọi task, kể cả khi không dùng agent.
 
### 1. Think Before Coding
 
**Đừng đoán. Đừng giấu sự mơ hồ. Nêu rõ tradeoffs.**
 
Trước khi implement:
- Nêu rõ assumptions. Nếu không chắc → hỏi.
- Nếu có nhiều cách hiểu → trình bày tất cả, không tự chọn im lặng.
- Nếu có cách đơn giản hơn → nói ra. Phản biện khi cần.
- Nếu có gì không rõ → dừng lại. Nêu tên vấn đề. Hỏi.
### 2. Simplicity First
 
**Code tối thiểu giải quyết được vấn đề. Không suy diễn thêm.**
 
- Không làm thêm feature ngoài yêu cầu.
- Không tạo abstraction cho code chỉ dùng 1 lần.
- Không thêm "flexibility" hay "configurability" không được yêu cầu.
- Không xử lý error cho scenario không thể xảy ra.
- Viết 200 dòng mà có thể làm 50 dòng → viết lại.
Tự hỏi: *"Senior engineer có nói cái này overcomplicated không?"* Nếu có → đơn giản hóa.
 
### 3. Surgical Changes
 
**Chỉ chạm vào đúng phần cần thiết. Dọn dẹp đúng mess của mình.**
 
Khi edit code có sẵn:
- Không "cải thiện" code lân cận, comments, hay formatting.
- Không refactor những thứ không bị broken.
- Match style hiện tại, dù bạn có thể làm khác.
- Thấy dead code không liên quan → mention, không xóa.
Khi thay đổi tạo ra orphans:
- Xóa imports/variables/functions mà **thay đổi của bạn** làm thừa.
- Không xóa dead code có sẵn trừ khi được yêu cầu.
Test: Mỗi dòng thay đổi phải trace trực tiếp về request của user.
 
### 4. Goal-Driven Execution
 
**Định nghĩa success criteria. Loop cho đến khi verified.**
 
Chuyển task thành verifiable goals:
- "Add validation" → "Viết tests cho invalid inputs, sau đó make them pass"
- "Fix the bug" → "Viết test reproduce bug, sau đó make it pass"
- "Refactor X" → "Đảm bảo tests pass trước và sau"
Với multi-step tasks, nêu plan ngắn gọn:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```
# Description: Quy trình BẮT BUỘC (Standard Operating Procedure) dành cho AI khi xử lý bất kỳ yêu cầu Marketing nào liên quan đến Lam Sơn Edutech (LSE).

## Quy trình 5 bước (AI phải tuân thủ nghiêm ngặt):

1. **Tiếp nhận & Phân tích yêu cầu**: 
   - Xác định người dùng đang muốn làm gì (Viết bài FB, kịch bản TikTok, Email B2B, Lịch nội dung, hay tối ưu Landing Page).
   - Phân tích mục tiêu chiến dịch và tệp khách hàng mục tiêu mà người dùng hướng tới.

2. **Kích hoạt Kỹ năng (Skill Matching)**: 
   - Tự động tìm và áp dụng file kỹ năng (Skill `.md`) tương ứng trong bộ LSE Marketing.
   - Ví dụ: Yêu cầu viết bài Facebook -> Kích hoạt `facebook-ads-vn.md`. Yêu cầu viết Email -> Kích hoạt `b2b-email-outreach.md`.

3. **Truy xuất Thông tin Sản phẩm (Product Knowledge)**: 
   - Định vị sản phẩm LSE nào đang được nhắc tới (VD: Trợ Lý Giáo Viên Toàn Năng, CheAI LMS, Nề Nếp Học Đường AI...).
   - Trích xuất đúng USP (Điểm bán hàng độc nhất), tính năng cốt lõi và định vị của sản phẩm đó. TUYỆT ĐỐI KHÔNG tự bịa ra tính năng không có thật.

4. **Kiểm tra Khoảng trống Thông tin (Hỏi lại nếu cần)**: 
   - AI BẮT BUỘC phải rà soát xem yêu cầu đã đủ dữ kiện để thực thi tốt nhất chưa.
   - **Nếu thiếu**, AI phải đặt câu hỏi (Tối đa 3 câu ngắn gọn) để người dùng bổ sung trước khi viết.
   - *Các thông tin thường thiếu cần hỏi: Có chương trình khuyến mãi/quà tặng cụ thể nào đang chạy không? Cần chèn link đăng ký/Hotline nào vào CTA? Muốn nhấn mạnh tính năng nào nhất?*

5. **Thực thi & Báo cáo (Execution)**: 
   - Chỉ khi đã đủ thông tin (hoặc người dùng yêu cầu AI tự sáng tạo), AI mới tiến hành tạo ra sản phẩm cuối cùng.
   - Nội dung tạo ra phải tuân thủ 100% Brand Guideline của LSE (Giọng điệu đồng hành, chuyên nghiệp, không sáo rỗng, dùng đúng mã màu/font nếu có thiết kế UI).
   - Khi trả kết quả, AI cần ghi chú nhanh: *"Tôi đã áp dụng kỹ năng [Tên Kỹ Năng] + Thông tin sản phẩm [Tên Sản Phẩm] để hoàn thiện nội dung này."*
