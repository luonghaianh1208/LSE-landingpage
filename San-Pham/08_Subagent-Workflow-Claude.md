# ⚡ SUBAGENT WORKFLOW — Hệ Thống 11 AI Agent Tự Động Hóa Toàn Bộ Quy Trình Phát Triển Phần Mềm

**Sản phẩm của Lam Sơn Edutech (LSE)**
**Phân khúc:** Lập trình viên, Team Leader, CTO/CTO Office, Doanh nghiệp phần mềm
**Nền tảng:** Claude Code v2.1+ | Tương thích: Windows, macOS, Linux

---

## 1. Giới thiệu sản phẩm

**Subagent Workflow** là hệ thống tự động hóa phát triển phần mềm đầy đủ, bao gồm 1 file điều phối trung tâm và 11 AI Agent chuyên biệt — mỗi agent chỉ làm đúng 1 việc, phối hợp theo 5 phase từ thiết kế đến commit code.

Thay vì lập trình viên phải chuyển qua lại giữa nhiều công cụ và nhớ tất cả best practices, Subagent Workflow để Claude Code tự điều phối đúng agent phù hợp, đúng thời điểm — giống như có một đội senior developer làm việc song song với bạn.

---

## 2. Đối tượng phục vụ

| Đối tượng | Lợi ích cụ thể |
|---|---|
| **Lập trình viên solo** | Có đội "agent ảo" hỗ trợ toàn bộ — từ thiết kế đến commit |
| **Team Leader** | Chuẩn hóa quy trình phát triển của cả team, giảm review thủ công |
| **Startup công nghệ** | Rút ngắn thời gian MVP, đảm bảo chất lượng ngay từ đầu |
| **Doanh nghiệp phần mềm** | Nâng cao năng suất đội phát triển, giảm bug xuất hiện ở production |

---

## 3. Kiến Trúc Hệ Thống

```
CLAUDE.md (Bộ Não Điều Phối)
│  Phân tích ý định → Chọn workflow → Phân công agent
│
├── Phase 1: 🎨 design-finder
│           Tìm kiếm và đề xuất thiết kế UI phù hợp
│
├── Phase 2: Review Agents (Chỉ đọc, không sửa code)
│   ├── 🔍 ux-reviewer        — Đánh giá trải nghiệm người dùng
│   ├── ⚙️  code-reviewer      — Review chất lượng code
│   ├── 🛡️  security-auditor   — Kiểm tra bảo mật
│   └── ⚡ perf-analyzer      — Phân tích hiệu năng
│
├── Phase 3: 🚀 master-executor
│           Agent duy nhất được phép sửa source code hàng loạt
│
├── Phase 4: Finalization Agents
│   ├── 🧪 test-writer        — Viết unit test tự động
│   ├── 📝 doc-writer         — Tạo documentation
│   ├── 🌐 i18n-checker       — Kiểm tra đa ngôn ngữ (khi cần)
│   └── 📋 tech-debt-tracker  — Ghi nhận technical debt
│
└── Phase 5: 💾 git-commit
            Commit code chuẩn format, message rõ ràng
```

---

## 4. Cách Hoạt Động

1. **Lập trình viên nêu yêu cầu** (bằng tiếng Việt hoặc Anh) với Claude Code
2. **CLAUDE.md phân tích ý định** → xác định workflow phù hợp (tạo mới, sửa lỗi, refactor...)
3. **Các agent tự động kích hoạt** theo thứ tự đúng phase
4. **Review agents kiểm tra độc lập** trước khi code được viết vào file thật
5. **master-executor thực thi** thay đổi sau khi đã được duyệt
6. **test-writer + doc-writer** bổ sung test và tài liệu tự động
7. **git-commit** đóng gói commit chuẩn để push

---

## 5. Tính Năng Nổi Bật

### 🔒 An Toàn & Kiểm Soát
- Review agents (Phase 2) chỉ đọc code — không sửa trực tiếp
- Chỉ 1 agent duy nhất được phép sửa code (master-executor)
- Không có tình trạng nhiều agent cùng sửa một file gây conflict

### 🧪 Tự Động Hóa Kiểm Tra Chất Lượng
- Security audit được thực hiện mặc định trước mỗi thay đổi lớn
- Performance analysis phát hiện bottleneck sớm
- Test được viết tự động, không cần nhắc

### 📝 Documentation Tự Động
- doc-writer tạo tài liệu kỹ thuật đồng bộ với code
- Không còn tình trạng "code mới nhưng doc cũ"

### 🌐 Hỗ Trợ Đa Ngôn Ngữ
- i18n-checker tự động kiểm tra khi app hỗ trợ nhiều ngôn ngữ

---

## 6. Điểm Khác Biệt & Lợi Thế

| Tiêu chí | Subagent Workflow |
|---|---|
| **Phân tách trách nhiệm rõ ràng** | Mỗi agent 1 việc — không lẫn lộn, không conflict |
| **Security mặc định** | Kiểm tra bảo mật là bắt buộc, không phải tùy chọn |
| **Toàn bộ vòng đời** | Từ thiết kế đến commit — không bỏ sót bước nào |
| **Cài đặt đơn giản** | Copy 11 file agent vào thư mục `.claude/agents/` là xong |
| **Tiếng Việt đầy đủ** | Giao tiếp với agent bằng tiếng Việt thoải mái |

---

## 7. Yêu Cầu Cài Đặt

- Claude Code v2.1 trở lên
- Tài khoản Claude Pro hoặc API Key
- Copy 11 file agent vào `~/.claude/agents/` (macOS/Linux) hoặc `C:\Users\[tên]\\.claude\agents\` (Windows)

---

## 8. Thông tin liên hệ & Hỗ Trợ

- **Website**: [https://lamsonedutech.vn/](https://lamsonedutech.vn/)
- **Hotline**: 0936.171.111
- **Email**: edutech.lamson@gmail.com
- **Địa chỉ**:
  - CS1: 870 - 872 Lê Thanh Nghị, Tân Hưng, TP Hải Phòng
  - CS2: Ô số 15 - Đ13, Khu đô thị mới Geleximco, đường Lê Trọng Tấn, quận Hoài Đức, Hà Nội

---

> *LSE cung cấp dịch vụ tư vấn tích hợp Subagent Workflow vào quy trình phát triển của doanh nghiệp, bao gồm đào tạo và hỗ trợ onboarding.*
>
> *Cập nhật: Tháng 5/2026*
