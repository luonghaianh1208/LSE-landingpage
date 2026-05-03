# 🤖 Robot Học Tập AI — Sản phẩm của Lam Sơn Edutech

> *Học bằng cách dạy lại — nơi công nghệ trở thành người bạn học thực sự*

---

## Tổng quan sản phẩm

**Robot Học Tập AI** là sản phẩm phần cứng giáo dục do Lam Sơn Edutech phát triển, kết hợp trí tuệ nhân tạo và thiết kế vật lý thân thiện nhằm tạo ra một phương thức học tập hoàn toàn mới: **tương tác tự nhiên, chủ động và cá nhân hóa**. Thay vì học thụ động qua sách vở hay màn hình, học sinh có thể trò chuyện trực tiếp với robot — đặt câu hỏi, trả lời, giải thích lại kiến thức và nhận phản hồi tức thì qua giọng nói, biểu cảm và cử chỉ sinh động.

---

## Thiết kế ngoại hình

Robot được chế tạo hoàn toàn bằng công nghệ in 3D với thiết kế đặc trưng, ngộ nghĩnh và gần gũi với trẻ em:

- **Thân hình**: Khối chữ nhật nhỏ gọn, màu xanh olive (army green), bề mặt nhám tự nhiên từ sợi nhựa in 3D
- **Tai thỏ**: Hai tai vểnh màu trắng gắn trên đỉnh đầu — tạo hình tượng dễ thương, thân thiện với học sinh tiểu học và trung học
- **Mắt / Cảm biến**: Lỗ tròn phía trên màn hình, dùng cho microphone hoặc cảm biến
- **Màn hình LCD**: Nằm ở trung tâm mặt trước, hiển thị biểu cảm động (vui, suy nghĩ, nghe, nói...) bằng đôi mắt và nụ cười phát sáng màu xanh cyan
- **Loa**: Lưới lỗ hình thoi bên dưới màn hình, phát âm thanh rõ ràng
- **Tay (servo)**: Hai cánh tay trắng hai bên có thể cử động nhờ động cơ servo — tạo cảm giác sống động khi tương tác
- **Chân**: Hai khối chân trắng tròn đầu, giúp robot đứng vững trên bàn

---

## Điểm đặc biệt — Cơ chế "Learning-by-Teaching"

Robot không đơn thuần là thiết bị giảng bài. Điểm khác biệt cốt lõi nằm ở cơ chế **học bằng cách dạy lại**:

- Robot đóng vai một **"người bạn học"** cần được giải thích, không chỉ là người thầy truyền thụ kiến thức
- Khi học sinh cố gắng **dạy lại cho robot hiểu**, quá trình tư duy, ghi nhớ và diễn đạt được kích hoạt mạnh mẽ hơn
- Nghiên cứu giáo dục chứng minh: người học nhớ lâu hơn và hiểu sâu hơn khi buộc phải trình bày lại kiến thức
- Kết quả: việc học trở nên **tự nhiên, hứng thú và hiệu quả hơn**

---

## Kiến trúc công nghệ

### Local-first AI
Hệ thống được xây dựng theo kiến trúc **Local-first AI** — ưu tiên xử lý trực tiếp trên thiết bị biên:

- **Nền tảng phần cứng**: NVIDIA Jetson Nano
- **Ưu điểm**: Phản hồi nhanh hơn, giảm phụ thuộc vào Internet, bảo vệ dữ liệu học sinh
- **Bảo mật**: Không gửi âm thanh hoặc thông tin học tập của trẻ lên máy chủ bên ngoài

### Các thành phần AI cốt lõi

| Thành phần | Chức năng |
|---|---|
| **Speech Recognition** | Nhận dạng giọng nói tiếng Việt theo thời gian thực |
| **Text-to-Speech** | Tổng hợp giọng nói tự nhiên, thân thiện |
| **Dialogue Manager** | Bộ não hội thoại — quản lý luồng tương tác |
| **Knowledge Base** | Cơ sở tri thức học tập theo chủ đề |
| **Question Bank** | Ngân hàng câu hỏi theo cấp độ |
| **Bayesian Knowledge Tracing** | Theo dõi và đánh giá tiến trình học tập theo từng học sinh |

### Tương tác vật lý
- **Màn hình LCD**: Hiển thị các biểu cảm (vui vẻ 😊, suy nghĩ 🤔, đang nghe, đang nói...)
- **Động cơ servo**: Điều khiển cử chỉ tay, tạo cảm giác robot "đang sống"
- **Loa tích hợp**: Phát âm thanh phản hồi rõ ràng

---

## Tính năng thông minh

**Cá nhân hóa học tập:**
Robot ghi nhận mức độ hiểu bài của từng học sinh thông qua Bayesian Knowledge Tracing, từ đó tự động điều chỉnh độ khó câu hỏi, tốc độ học và nội dung gợi ý phù hợp với từng người.

**Phản hồi tức thì:**
Mọi câu trả lời của học sinh đều được robot phân tích và phản hồi ngay lập tức — khen ngợi khi đúng, gợi ý khi sai, không phán xét.

**Biểu cảm sinh động:**
Robot thể hiện cảm xúc qua màn hình và cử chỉ — tạo cảm giác học cùng một người bạn thực sự thay vì sử dụng thiết bị công nghệ khô cứng.

---

## Nội dung học tập (giai đoạn thử nghiệm)

Trong giai đoạn thử nghiệm, robot tập trung vào hai chủ đề giàu tính khám phá:

- 🌌 **Khoa học vũ trụ** — Hệ mặt trời, các hành tinh, hiện tượng thiên văn
- 🦁 **Thế giới động vật** — Đặc điểm, tập tính, sinh thái của các loài

Đây là những lĩnh vực dễ khơi gợi trí tò mò, phù hợp với học sinh tiểu học và trung học cơ sở, đồng thời cho phép xây dựng kịch bản tương tác phong phú và đa dạng.

---

## Đối tượng sử dụng

| Đối tượng | Ứng dụng |
|---|---|
| **Học sinh tiểu học & THCS** | Học tập chủ động, khám phá kiến thức qua hỏi - đáp |
| **Giáo viên** | Công cụ hỗ trợ dạy học, tạo hoạt động tương tác trong lớp |
| **Nhà trường** | Tích hợp vào góc học tập, thư viện, phòng STEM |
| **Trung tâm giáo dục** | Điểm nhấn trải nghiệm, thu hút học sinh đăng ký |

---

## Định vị sản phẩm

> **Robot Học Tập AI không thay thế giáo viên — mà hỗ trợ giáo viên tạo ra những trải nghiệm học tập sinh động, cá nhân hóa và truyền cảm hứng hơn cho học sinh.**

Robot hướng tới trở thành một **trợ lý giáo dục thông minh, an toàn và gần gũi** — nơi công nghệ phục vụ con người, không phải thay thế con người.

---

## Thông tin liên hệ

**Lam Sơn Edutech (LSE)**
🌐 Website: https://lamsonedutech.vn/
📞 Hotline: 0936.171.111
📧 Email: edutech.lamson@gmail.com
📍 CS1: 870 – 872 Lê Thanh Nghị, Tân Hưng, TP Hải Phòng
📍 CS2: Ô số 15 – Đ13, Khu đô thị mới Geleximco, đường Lê Trọng Tấn, quận Hoài Đức, Hà Nội

---

*Tài liệu nội bộ — Cập nhật: Tháng 5/2026*
