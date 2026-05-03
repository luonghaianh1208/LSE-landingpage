# 📋 QUẢN LÝ CÔNG VIỆC NỘI BỘ — Ứng Dụng Theo Dõi Nhiệm Vụ Thời Gian Thực cho Tổ Chức & Đơn Vị

**Sản phẩm của Lam Sơn Edutech (LSE)**
**Nền tảng:** Web App | Công nghệ: React + Vite + Firebase Realtime + TailwindCSS
**Phù hợp:** Nhóm 5–30 người | Tổ chức, Đoàn thể, Ban/Nhóm nội bộ, Phòng ban

---

## 1. Giới thiệu sản phẩm

**Quản Lý Công Việc Nội Bộ** là ứng dụng web quản lý nhiệm vụ (task management) được thiết kế đặc biệt cho các tổ chức, đoàn thể và ban/nhóm nội bộ hoạt động theo mô hình tập thể. Với khả năng theo dõi công việc thời gian thực, phân quyền 3 cấp và tự động nhắc nhở deadline qua email, ứng dụng giúp các tổ chức vận hành chuyên nghiệp hơn mà không cần đầu tư phần mềm đắt tiền.

Đã được triển khai thực tế và sử dụng thành công bởi các tổ chức có quy mô tương đương.

---

## 2. Đối tượng phục vụ

| Đối tượng | Ứng dụng thực tế |
|---|---|
| **Đoàn thể, Hội nhóm trong trường học** | Quản lý nhiệm vụ phong trào, sự kiện, hoạt động tập thể |
| **Ban/Phòng ban trong tổ chức** | Theo dõi tiến độ công việc nội bộ, phân công nhiệm vụ rõ ràng |
| **Nhóm dự án nhỏ** | Quản lý sprint, deadline, nhiệm vụ theo giai đoạn |
| **Tổ chức phi lợi nhuận** | Điều phối tình nguyện viên, theo dõi các hoạt động cộng đồng |

---

## 3. Tính năng chính

### ✅ Quản Lý Nhiệm Vụ (Task Management)
- Tạo, phân công và theo dõi nhiệm vụ cho từng thành viên
- Gắn tag, mức độ ưu tiên và deadline cho từng task
- Cập nhật trạng thái: Mới → Đang làm → Hoàn thành → Đã duyệt
- Bình luận, trao đổi ngay trong từng task

### 🔴 Theo Dõi Thời Gian Thực (Realtime)
- Mọi thay đổi cập nhật tức thì trên màn hình tất cả thành viên (Firebase Realtime)
- Không cần F5, không cần đồng bộ thủ công
- Phù hợp làm việc đồng thời trong cuộc họp, sự kiện

### 🔐 Phân Quyền 3 Cấp
- **Admin**: Toàn quyền quản lý thành viên, nhiệm vụ, cài đặt hệ thống
- **Manager**: Tạo nhiệm vụ, phân công, theo dõi tiến độ nhóm
- **Member**: Nhận nhiệm vụ, cập nhật tiến độ, báo cáo công việc của bản thân

### 📧 Nhắc Nhở Deadline Tự Động qua Email
- Hệ thống tự động gửi email nhắc nhở khi deadline đến gần
- Thông báo khi task bị trễ, khi có comment mới, khi được phân công
- Sử dụng Firebase Cloud Functions + Nodemailer (miễn phí trong hạn mức)

### 📊 Báo Cáo Công Việc & Xuất File
- Tổng hợp báo cáo theo tuần, tháng, theo từng thành viên
- Thống kê tỷ lệ hoàn thành, số task đúng hạn / trễ hạn
- **Xuất Excel (.xlsx)** và **PDF** để báo cáo cấp trên, lưu hồ sơ
- Biểu đồ trực quan (Recharts) hiển thị hiệu suất làm việc nhóm

### 🖼️ Lưu Trữ File & Tài Liệu
- Đính kèm file, ảnh, tài liệu vào từng task
- Lưu trữ trên Firebase Storage — an toàn, truy cập mọi lúc

---

## 4. Điểm khác biệt & Lợi thế

| Tiêu chí | Quản Lý Công Việc Nội Bộ |
|---|---|
| **Realtime hoàn toàn** | Không cần refresh — nhìn màn hình là biết ngay ai đang làm gì |
| **Email tự động** | Không ai quên deadline vì có hệ thống nhắc tự động |
| **Xuất báo cáo đầy đủ** | Excel + PDF chuẩn, không cần làm thủ công |
| **Phân quyền chặt chẽ** | 3 cấp quyền phù hợp cơ cấu tổ chức thực tế |
| **Chi phí thấp** | Nhóm 5–7 người vẫn trong hạn mức miễn phí của Firebase |
| **Triển khai nhanh** | Setup trong vài giờ, không cần đội IT |

---

## 5. Mô hình triển khai

- **Cài đặt nhanh**: Cấu hình Firebase, deploy lên Netlify — có hướng dẫn chi tiết
- **Hỗ trợ nhiều đơn vị**: Mỗi đơn vị/tổ chức có hệ thống riêng, dữ liệu độc lập
- **Tùy chỉnh**: Logo, tên tổ chức, màu sắc theo yêu cầu
- **Scale-up**: Dễ dàng mở rộng khi tổ chức phát triển

---

## 6. Thông tin liên hệ & Demo

- **Website**: [https://lamsonedutech.vn/](https://lamsonedutech.vn/)
- **Hotline**: 0936.171.111
- **Email**: edutech.lamson@gmail.com
- **Địa chỉ**:
  - CS1: 870 - 872 Lê Thanh Nghị, Tân Hưng, TP Hải Phòng
  - CS2: Ô số 15 - Đ13, Khu đô thị mới Geleximco, đường Lê Trọng Tấn, quận Hoài Đức, Hà Nội

---

> *Giải pháp phù hợp cho tổ chức, đoàn thể muốn vận hành chuyên nghiệp ngay cả với ngân sách eo hẹp. Liên hệ để được tư vấn và triển khai.*
>
> *Cập nhật: Tháng 5/2026*
