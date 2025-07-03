# Phân tích cơ bản chương trình trả góp cho hệ thống thẻ tín dụng

## 1. Mục tiêu chương trình trả góp
- Hỗ trợ khách hàng thanh toán các giao dịch lớn bằng thẻ tín dụng thông qua việc chia nhỏ số tiền thành nhiều kỳ thanh toán.
- Tăng sự hài lòng và khả năng chi tiêu của khách hàng, đồng thời giúp ngân hàng kiểm soát dòng tiền và tăng doanh thu từ lãi suất.

## 2. Đối tượng áp dụng
- Chủ thẻ tín dụng cá nhân (có thể mở rộng cho doanh nghiệp).
- Áp dụng cho các giao dịch đủ điều kiện (theo giá trị tối thiểu, loại hình giao dịch, đối tác liên kết...).

## 3. Quy trình nghiệp vụ tổng quát

### 3.1. Đăng ký trả góp
1. **Khách hàng** thực hiện giao dịch đủ điều kiện trả góp (mua hàng, thanh toán dịch vụ...).
2. **Khách hàng** đăng ký chuyển đổi giao dịch sang trả góp qua kênh (Internet Banking, Mobile App, Call Center, tại quầy...).
3. **Hệ thống** kiểm tra điều kiện giao dịch, hạn mức thẻ, trạng thái thẻ.
4. **Hệ thống** hiển thị các lựa chọn kỳ hạn trả góp (3, 6, 9, 12 tháng...), lãi suất, phí chuyển đổi (nếu có).
5. **Khách hàng** xác nhận đăng ký trả góp.

### 3.2. Xử lý trả góp
1. **Hệ thống** tạo lịch trả góp cho giao dịch: chia nhỏ số tiền gốc thành các kỳ, tính lãi suất và/hoặc phí.
2. **Hệ thống** cập nhật dư nợ trả góp vào tài khoản thẻ, đồng thời giảm hạn mức khả dụng tương ứng.
3. **Hệ thống** sinh các khoản phải trả định kỳ vào sao kê hàng tháng.

### 3.3. Thanh toán trả góp
1. **Khách hàng** thanh toán số tiền trả góp hàng tháng theo sao kê.
2. **Hệ thống** ghi nhận thanh toán, giảm dư nợ trả góp, cập nhật trạng thái hợp đồng trả góp.
3. **Trường hợp tất toán trước hạn**: Hệ thống tính toán phí phạt (nếu có), cập nhật dư nợ còn lại.

## 4. Logic chương trình (Chi tiết dành cho Developer)

### 4.1. Điều kiện trả góp

- **Kiểm tra loại giao dịch**:  
  - Chỉ cho phép các giao dịch thuộc danh mục được cấu hình (ví dụ: mua hàng, thanh toán dịch vụ, không áp dụng cho rút tiền mặt, phí, lãi).
  - Có thể cấu hình whitelist/blacklist loại giao dịch.

- **Kiểm tra số tiền tối thiểu**:  
  - Giao dịch phải lớn hơn hoặc bằng số tiền tối thiểu trả góp (ví dụ: 3.000.000 VNĐ).
  - Tham số này nên cấu hình động theo từng chương trình.

- **Kiểm tra trạng thái thẻ**:  
  - Thẻ phải ở trạng thái hoạt động (Active), không bị khóa, không quá hạn, không bị chặn giao dịch.

- **Kiểm tra hạn mức khả dụng**:  
  - Hạn mức khả dụng sau khi chuyển đổi trả góp phải đủ để ghi nhận dư nợ trả góp.
  - Nếu không đủ, từ chối đăng ký.

- **Kiểm tra các điều kiện khác (nếu có)**:  
  - Số lượng hợp đồng trả góp tối đa trên 1 thẻ.
  - Không có nợ quá hạn tại thời điểm đăng ký.

### 4.2. Tính toán lịch trả góp

- **Input**:  
  - Số tiền gốc (principalAmount)
  - Số kỳ trả góp (installmentTerm, ví dụ: 3, 6, 9, 12)
  - Lãi suất (%/năm hoặc %/kỳ, có thể là 0% cho chương trình KM)
  - Phí chuyển đổi (nếu có, có thể là số tiền hoặc % trên số tiền gốc)
  - Ngày giao dịch (transactionDate)
  - Ngày sao kê (statementDate) và ngày đến hạn thanh toán (dueDate)

- **Xử lý**:
  1. **Tính số tiền gốc mỗi kỳ**:  
     - Nếu chia đều: principalPerTerm = principalAmount / installmentTerm
     - Làm tròn số tiền mỗi kỳ, kỳ cuối nhận phần dư.
  2. **Tính lãi suất mỗi kỳ**:  
     - Nếu lãi suất trên dư nợ ban đầu: interestPerTerm = principalAmount * ratePerTerm
     - Nếu lãi suất trên dư nợ giảm dần:  
       - Dùng công thức tính lãi từng kỳ: interest = remainingPrincipal * ratePerTerm
       - Cập nhật remainingPrincipal sau mỗi kỳ.
  3. **Tính phí chuyển đổi**:  
     - Nếu thu 1 lần: cộng vào kỳ đầu tiên.
     - Nếu chia đều: feePerTerm = totalFee / installmentTerm
  4. **Tạo lịch trả góp**:  
     - Mỗi kỳ gồm: số tiền gốc, số tiền lãi, phí (nếu có), ngày đến hạn, trạng thái (chưa thanh toán/đã thanh toán/quá hạn).
     - Ngày đến hạn = ngày đến hạn thanh toán của từng kỳ (thường là ngày đến hạn của sao kê tiếp theo).

- **Output**:  
  - Danh sách các kỳ trả góp (array of objects), mỗi object gồm:
    ```json
    {
      "term": 1,
      "dueDate": "2024-08-10",
      "principal": 1000000,
      "interest": 50000,
      "fee": 0,
      "status": "UNPAID"
    }
    ```

### 4.3. Sinh sao kê

- Định kỳ (theo chu kỳ sao kê thẻ), hệ thống sẽ:
  - Quét các hợp đồng trả góp còn hiệu lực.
  - Lấy các kỳ đến hạn trong kỳ sao kê, cộng số tiền phải trả (gốc + lãi + phí) vào sao kê tháng.
  - Đánh dấu các kỳ đã ghi nhận vào sao kê.

### 4.4. Quản lý trạng thái hợp đồng trả góp

- **Trạng thái hợp đồng**:
  - Đang trả góp (ACTIVE)
  - Đã tất toán (CLOSED)
  - Quá hạn (OVERDUE)
  - Đã hủy (CANCELLED)

- **Trạng thái từng kỳ**:
  - Chưa thanh toán (UNPAID)
  - Đã thanh toán (PAID)
  - Quá hạn (OVERDUE)

- **Xử lý thanh toán**:
  - Khi khách hàng thanh toán sao kê, hệ thống tự động ghi nhận thanh toán cho các kỳ trả góp đến hạn.
  - Nếu khách hàng tất toán trước hạn, tính phí phạt (nếu có), cập nhật trạng thái các kỳ còn lại thành PAID, hợp đồng thành CLOSED.

### 4.5. Xử lý các trường hợp đặc biệt

- **Tất toán trước hạn**:
  - Cho phép khách hàng tất toán toàn bộ dư nợ trả góp trước hạn.
  - Tính phí phạt tất toán trước hạn (nếu có).
  - Cập nhật trạng thái hợp đồng và các kỳ còn lại.

- **Không thanh toán đúng hạn**:
  - Đánh dấu kỳ trả góp quá hạn.
  - Tính lãi/phí phạt trả chậm theo chính sách.
  - Có thể chuyển toàn bộ dư nợ trả góp sang nợ quá hạn của thẻ.

### 4.6. Cấu trúc dữ liệu gợi ý

```json
// Bảng giao dịch trả góp
{
  "installmentId": "string",
  "cardNumber": "string",
  "transactionId": "string",
  "principalAmount": 12000000,
  "installmentTerm": 12,
  "interestRate": 0.18,
  "fee": 200000,
  "registerDate": "2024-07-01",
  "status": "ACTIVE"
}

// Bảng lịch trả góp
{
  "installmentId": "string",
  "term": 1,
  "dueDate": "2024-08-10",
  "principal": 1000000,
  "interest": 50000,
  "fee": 0,
  "status": "UNPAID"
}
```