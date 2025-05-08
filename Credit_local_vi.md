# Xây dựng Hệ thống Phát hành và Vận hành Thẻ Tín dụng

Tài liệu này trình bày các bước và thành phần cần thiết để xây dựng một hệ thống phát hành và vận hành thẻ tín dụng từ đầu.

---

## 1. Tổng quan Hệ thống

Hệ thống thẻ tín dụng sẽ bao gồm các thành phần chính sau:
- **Mô-đun Phát hành Thẻ**: Xử lý việc tạo và kích hoạt thẻ tín dụng.
- **Mô-đun Xử lý Giao dịch**: Quản lý các giao dịch mua sắm, thanh toán và hoàn tiền.
- **Mô-đun Phát hiện Gian lận**: Giám sát và phát hiện các hoạt động đáng ngờ.
- **Mô-đun Quản lý Khách hàng**: Lưu trữ và quản lý dữ liệu khách hàng.
- **Mô-đun Thanh toán và Sao kê**: Tạo sao kê hàng tháng và tính lãi suất.
- **Tích hợp với Mạng Thanh toán**: Kết nối với Visa, MasterCard, v.v. để xử lý giao dịch.

---

## 2. Tính năng Chính

### 1. Phát hành Thẻ

#### Tổng quan Quy trình
- Khách hàng đăng ký mở thẻ tín dụng bằng cách gửi đơn đăng ký.
- Nhân viên ngân hàng xem xét các đơn theo từng lô.
- Nhân viên quyết định phê duyệt hoặc từ chối toàn bộ lô.
- Các đơn được phê duyệt dẫn đến việc phát hành thẻ với các đặc điểm như hoàn tiền, tích điểm...

#### Thiết kế Cơ sở Dữ liệu

- Bảng: `Customers`
```sql
CREATE TABLE Customers (
    customer_id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    credit_score INT NOT NULL,
    monthly_income DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

- Bảng: `Card_Applications`
```sql
CREATE TABLE Card_Applications (
    application_id UUID PRIMARY KEY,
    customer_id UUID REFERENCES Customers(customer_id),
    application_status VARCHAR(10) CHECK (application_status IN ('Pending', 'Approved', 'Rejected')),
    requested_credit_limit DECIMAL(10, 2) NOT NULL,
    reviewed_by UUID REFERENCES Employees(employee_id),
    batch_id UUID REFERENCES Approval_Batches(batch_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

- Bảng: `Approval_Batches`
```sql
CREATE TABLE Approval_Batches (
    batch_id UUID PRIMARY KEY,
    batch_status VARCHAR(10) CHECK (batch_status IN ('Pending', 'Approved', 'Rejected')),
    created_by UUID REFERENCES Employees(employee_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

- Bảng: `Employees`
```sql
CREATE TABLE Employees (
    employee_id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(10) CHECK (role IN ('Reviewer', 'Manager')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

- Bảng: `Cards`
```sql
CREATE TABLE Cards (
    card_id UUID PRIMARY KEY,
    card_number VARCHAR(16) UNIQUE NOT NULL,
    customer_id UUID REFERENCES Customers(customer_id),
    expiry_date DATE NOT NULL,
    cvv VARCHAR(3) NOT NULL,
    status VARCHAR(10) CHECK (status IN ('Active', 'Inactive', 'Blocked')),
    credit_limit DECIMAL(10, 2) NOT NULL,
    card_type VARCHAR(20) CHECK (card_type IN ('Cashback', 'Rewards', 'Platinum', 'Gold', 'Basic')),
    cashback_rate DECIMAL(5, 2),
    reward_points_rate DECIMAL(5, 2),
    annual_fee DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

- Bảng: `Card_Tiers`
```sql
CREATE TABLE Card_Tiers (
    tier_id UUID PRIMARY KEY,
    tier_name VARCHAR(50) NOT NULL,
    minimum_credit_score INT NOT NULL,
    minimum_income DECIMAL(10, 2) NOT NULL,
    cashback_rate DECIMAL(5, 2),
    reward_points_rate DECIMAL(5, 2),
    annual_fee DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
# Xây dựng Hệ thống Phát hành và Vận hành Thẻ Tín dụng

#### Logic Hoạt Động
- **Đăng ký Khách hàng**:
  1. Khách hàng gửi đơn với thông tin cá nhân và hạn mức tín dụng mong muốn.
  2. Đơn được lưu vào bảng `Card_Applications` với trạng thái `Pending` (Đang chờ).

- **Tạo Lô Xét Duyệt**:
  1. Nhân viên nhóm nhiều đơn đăng ký vào một lô.
  2. Tạo bản ghi mới trong `Approval_Batches` với trạng thái `Pending`.

- **Xét Duyệt Lô**:
  1. Nhân viên xem xét toàn bộ đơn trong lô.
  2. Quyết định thủ công việc phê duyệt hay từ chối.

- **Phê Duyệt Lô**:
  - Nếu được phê duyệt:
    - Cập nhật `application_status` thành `Approved`.
    - Gán hạng thẻ theo điểm tín dụng và thu nhập.
    - Tạo số thẻ bằng thuật toán Luhn.
    - Tạo bản ghi trong `Cards` với thông tin như hoàn tiền, điểm thưởng, phí thường niên.
  - Nếu bị từ chối:
    - Cập nhật trạng thái các đơn thành `Rejected`.

#### Quy tắc Hoạt Động
- Đơn chỉ được xử lý theo lô, không xử lý riêng lẻ.
- Một lô chỉ có thể được phê duyệt hoặc từ chối toàn bộ.
- Đơn bị từ chối không thể xét lại – khách hàng cần nộp đơn mới.
- Thẻ phát hành sẽ có:
  - Số thẻ duy nhất (thuật toán Luhn)
  - CVV mã hóa an toàn
  - Hạn sử dụng 3 năm kể từ ngày phát hành
  - Hạn mức tín dụng theo hồ sơ khách hàng
  - Loại thẻ tương ứng với điều kiện khách hàng
  - Tỷ lệ hoàn tiền, điểm thưởng và phí thường niên

#### Ví dụ Quy trình
1. **Đăng ký**:
   - Khách hàng A yêu cầu hạn mức $5,000
   - Trạng thái đơn: `Pending`

2. **Tạo Lô**:
   - Gộp đơn vào Lô #123
   - Tạo bản ghi `Approval_Batches` trạng thái `Pending`

3. **Xét Duyệt**:
   - Nhân viên đánh giá toàn bộ Lô #123
   - Quyết định phê duyệt

4. **Phát hành Thẻ**:
   - Cập nhật trạng thái đơn thành `Approved`
   - Phát hành thẻ và lưu vào bảng `Cards`

#### Quan hệ Cơ sở Dữ liệu
- `Customers` → `Card_Applications`: Một-nhiều
- `Approval_Batches` → `Card_Applications`: Một-nhiều
- `Employees` → `Approval_Batches`: Một-nhiều
- `Customers` → `Cards`: Một-nhiều
- `Card_Tiers` → `Cards`: Một-nhiều


2. **Xử lý giao dịch**:
   - **Phê duyệt giao dịch theo thời gian thực**:
     - Hệ thống sẽ kiểm tra các giao dịch ngay lập tức khi chúng được thực hiện.
     - Xác minh thông tin thẻ (số thẻ, CVV, ngày hết hạn) và trạng thái thẻ (hoạt động, bị khóa).
     - Kiểm tra hạn mức tín dụng còn lại để đảm bảo giao dịch không vượt quá giới hạn.

   - **Hỗ trợ thanh toán trực tuyến và ngoại tuyến**:
     - **Thanh toán trực tuyến**:
       - Hỗ trợ các giao dịch qua cổng thanh toán (ví dụ: mua sắm trực tuyến, thanh toán hóa đơn).
       - Sử dụng mã OTP (One-Time Password) hoặc xác thực hai yếu tố (2FA) để tăng cường bảo mật.
     - **Thanh toán ngoại tuyến**:
       - Hỗ trợ giao dịch tại điểm bán hàng (POS) thông qua thẻ vật lý.
       - Xử lý giao dịch ngoại tuyến khi không có kết nối mạng, sau đó đồng bộ hóa khi có mạng.

   - **Xử lý hoàn tiền và bồi hoàn**:
     - **Hoàn tiền**:
       - Hỗ trợ hoàn tiền toàn bộ cho các giao dịch không thành công hoặc bị hủy.
       - Ghi nhận giao dịch hoàn tiền vào bảng `Transactions` với loại giao dịch là `Refund`.
     - **Bồi hoàn**:
       - Xử lý các yêu cầu bồi hoàn từ khách hàng khi có tranh chấp giao dịch.
       - Liên hệ với mạng thanh toán để xác minh và giải quyết tranh chấp.
       - Cập nhật trạng thái giao dịch trong cơ sở dữ liệu (ví dụ: `Disputed`, `Reversed`).

   - **Thiết kế cơ sở dữ liệu**:
     - Bảng: `Transactions`
       ```sql
       CREATE TABLE Transactions (
           transaction_id UUID PRIMARY KEY,
           card_id UUID REFERENCES Cards(card_id),
           transaction_date TIMESTAMP NOT NULL,
           description TEXT NOT NULL,
           amount DECIMAL(10, 2) NOT NULL,
           transaction_type VARCHAR(10) CHECK (transaction_type IN ('Purchase', 'Payment', 'Refund', 'Chargeback')),
           status VARCHAR(10) CHECK (status IN ('Pending', 'Approved', 'Rejected', 'Disputed', 'Reversed')),
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       );
       ```

   - **Quy trình xử lý giao dịch**:
     1. **Giao dịch mua sắm**:
        - Khách hàng thực hiện giao dịch tại cửa hàng hoặc trực tuyến.
        - Hệ thống kiểm tra thông tin thẻ và hạn mức tín dụng.
        - Nếu giao dịch hợp lệ, trạng thái được cập nhật thành `Approved` và số dư tín dụng được trừ.
        - Nếu giao dịch bị từ chối, trạng thái được cập nhật thành `Rejected`.

     2. **Hoàn tiền**:
        - Khách hàng yêu cầu hoàn tiền cho một giao dịch.
        - Hệ thống tạo một giao dịch mới với loại `Refund` và cập nhật số dư tín dụng.

     3. **Bồi hoàn**:
        - Khách hàng khiếu nại về một giao dịch (ví dụ: giao dịch gian lận).
        - Hệ thống cập nhật trạng thái giao dịch thành `Disputed` và liên hệ với mạng thanh toán.
        - Nếu bồi hoàn được chấp nhận, trạng thái giao dịch được cập nhật thành `Reversed`.

   - **Ví dụ quy trình**:
     1. **Giao dịch mua sắm**:
        - Khách hàng A mua sắm $100 tại cửa hàng vào ngày 1/5.
        - Hệ thống kiểm tra hạn mức tín dụng còn lại ($500) và phê duyệt giao dịch.
        - Giao dịch được ghi nhận vào bảng `Transactions`:
          ```sql
          INSERT INTO Transactions (
              transaction_id, card_id, transaction_date, description, amount, transaction_type, status, created_at
          ) VALUES (
              'txn-001', 'card-12345', '2025-05-01 10:00:00', 'Purchase at Store', 100.00, 'Purchase', 'Approved', CURRENT_TIMESTAMP
          );
          ```

     2. **Hoàn tiền**:
        - Khách hàng A yêu cầu hoàn tiền $50 cho giao dịch trên.
        - Hệ thống tạo một giao dịch mới với loại `Refund`:
          ```sql
          INSERT INTO Transactions (
              transaction_id, card_id, transaction_date, description, amount, transaction_type, status, created_at
          ) VALUES (
              'txn-002', 'card-12345', '2025-05-02 15:00:00', 'Refund for Purchase', 50.00, 'Refund', 'Approved', CURRENT_TIMESTAMP
          );
          ```

     3. **Bồi hoàn**:
        - Khách hàng A khiếu nại về giao dịch $100 vì nghi ngờ gian lận.
        - Hệ thống cập nhật trạng thái giao dịch thành `Disputed`:
          ```sql
          UPDATE Transactions
          SET status = 'Disputed'
          WHERE transaction_id = 'txn-001';
          ```
        - Sau khi xác minh, giao dịch được bồi hoàn và trạng thái cập nhật thành `Reversed`:
          ```sql
          UPDATE Transactions
          SET status = 'Reversed'
          WHERE transaction_id = 'txn-001';
          ```

3. **Phát hiện gian lận**:
   - **Triển khai các mô hình học máy để phát hiện các bất thường**:
     - Sử dụng các thuật toán học máy (machine learning) như Random Forest, Gradient Boosting, hoặc Neural Networks để phân tích dữ liệu giao dịch.
     - Xây dựng mô hình dựa trên các đặc điểm giao dịch như:
       - Số tiền giao dịch.
       - Địa điểm giao dịch.
       - Tần suất giao dịch.
       - Lịch sử giao dịch của khách hàng.
     - Phát hiện các mẫu bất thường (ví dụ: giao dịch lớn bất thường, giao dịch từ các địa điểm không quen thuộc).

   - **Tự động chặn các giao dịch đáng ngờ**:
     - Khi hệ thống phát hiện giao dịch có nguy cơ gian lận, giao dịch sẽ bị tạm dừng.
     - Gửi thông báo đến khách hàng qua email hoặc SMS để xác minh giao dịch.
     - Nếu khách hàng xác nhận giao dịch là hợp lệ, giao dịch sẽ được tiếp tục xử lý.
     - Nếu khách hàng không xác nhận hoặc không phản hồi, giao dịch sẽ bị từ chối.

   - **Thiết kế cơ sở dữ liệu**:
     - Bảng: `Fraud_Alerts`
       ```sql
       CREATE TABLE Fraud_Alerts (
           alert_id UUID PRIMARY KEY,
           transaction_id UUID REFERENCES Transactions(transaction_id),
           customer_id UUID REFERENCES Customers(customer_id),
           alert_type VARCHAR(50) NOT NULL,
           alert_status VARCHAR(20) CHECK (alert_status IN ('Pending', 'Resolved', 'Dismissed')),
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       );
       ```

   - **Quy trình phát hiện gian lận**:
     1. **Phân tích giao dịch**:
        - Hệ thống phân tích giao dịch theo thời gian thực dựa trên mô hình học máy.
        - Nếu giao dịch có điểm số rủi ro cao (ví dụ: trên 80%), hệ thống sẽ tạo cảnh báo gian lận.

     2. **Tạo cảnh báo**:
        - Ghi nhận cảnh báo vào bảng `Fraud_Alerts` với trạng thái `Pending`.
        - Gửi thông báo đến khách hàng để xác minh giao dịch.

     3. **Xử lý cảnh báo**:
        - Nếu khách hàng xác nhận giao dịch là hợp lệ, cập nhật trạng thái cảnh báo thành `Resolved`.
        - Nếu khách hàng không xác nhận hoặc giao dịch bị xác định là gian lận, cập nhật trạng thái thành `Dismissed` và từ chối giao dịch.

   - **Ví dụ quy trình**:
     1. **Phát hiện giao dịch đáng ngờ**:
        - Giao dịch $5,000 được thực hiện từ một địa điểm không quen thuộc.
        - Hệ thống gán điểm rủi ro 85% và tạo cảnh báo:
          ```sql
          INSERT INTO Fraud_Alerts (
              alert_id, transaction_id, customer_id, alert_type, alert_status, created_at
          ) VALUES (
              'alert-001', 'txn-12345', 'cust-67890', 'Unusual Location', 'Pending', CURRENT_TIMESTAMP
          );
          ```

     2. **Gửi thông báo đến khách hàng**:
        - Gửi email hoặc SMS đến khách hàng với nội dung:
          "Chúng tôi phát hiện giao dịch bất thường trên thẻ của bạn. Vui lòng xác nhận giao dịch $5,000 tại [địa điểm] vào ngày [ngày]."

     3. **Xử lý phản hồi của khách hàng**:
        - Nếu khách hàng xác nhận giao dịch là hợp lệ:
          ```sql
          UPDATE Fraud_Alerts
          SET alert_status = 'Resolved', updated_at = CURRENT_TIMESTAMP
          WHERE alert_id = 'alert-001';
          ```
        - Nếu khách hàng không xác nhận hoặc không phản hồi:
          ```sql
          UPDATE Fraud_Alerts
          SET alert_status = 'Dismissed', updated_at = CURRENT_TIMESTAMP
          WHERE alert_id = 'alert-001';
          ```
        - Từ chối giao dịch trong trường hợp gian lận:
          ```sql
          UPDATE Transactions
          SET status = 'Rejected'
          WHERE transaction_id = 'txn-12345';
          ```

   - **Tích hợp với hệ thống khác**:
     - Kết nối với các dịch vụ bên thứ ba để kiểm tra danh sách đen (blacklist) hoặc cơ sở dữ liệu gian lận toàn cầu.
     - Sử dụng API để cập nhật mô hình học máy với dữ liệu mới nhất.

   - **Báo cáo và phân tích**:
     - Tạo báo cáo hàng tháng về các giao dịch bị nghi ngờ gian lận.
     - Phân tích xu hướng gian lận để cải thiện mô hình phát hiện.

#### 4. **Quản lý khách hàng**
- **Lưu trữ thông tin khách hàng một cách an toàn**:
  - Dữ liệu khách hàng được lưu trữ trong cơ sở dữ liệu với các biện pháp bảo mật như mã hóa AES-256.
  - Mật khẩu được băm bằng thuật toán bcrypt trước khi lưu trữ.
  - Truyền dữ liệu qua HTTPS để đảm bảo an toàn.

- **Cung cấp cổng tự phục vụ để khách hàng quản lý tài khoản của họ**:
  - **Tính năng chính**:
    1. Đăng nhập và xác thực hai yếu tố (2FA).
    2. Cập nhật thông tin cá nhân (địa chỉ, email, số điện thoại).
    3. Xem thông tin tài khoản, bao gồm hạn mức tín dụng, số dư hiện tại, và lịch sử giao dịch.
    4. Thanh toán hóa đơn trực tuyến với nhiều phương thức thanh toán.
    5. Khóa/mở khóa thẻ trong trường hợp mất thẻ hoặc nghi ngờ gian lận.
    6. Gửi yêu cầu hỗ trợ hoặc khiếu nại trực tiếp từ giao diện.
    7. Nhận thông báo về giao dịch, hóa đơn, hoặc cảnh báo bảo mật.

  - **Thiết kế cơ sở dữ liệu**:
    - Bảng `Customers` lưu trữ thông tin khách hàng.
    - Bảng `Customer_Notifications` lưu trữ thông báo gửi đến khách hàng.
    - Bảng `Payments` ghi nhận các khoản thanh toán từ khách hàng.

  - **Ví dụ quy trình**:
    1. **Khách hàng cập nhật thông tin cá nhân**:
       - Đăng nhập vào cổng tự phục vụ.
       - Cập nhật địa chỉ mới và xác minh qua OTP.
       - Thông tin được cập nhật trong cơ sở dữ liệu.
    2. **Khách hàng khóa thẻ**:
       - Đăng nhập và chọn "Khóa thẻ".
       - Hệ thống cập nhật trạng thái thẻ thành `Blocked` trong bảng `Cards`.

5. **Hóa đơn và Bảng sao kê**:
   - **Tính năng**:
     - Tính lãi suất và phí trễ hạn cho số dư chưa thanh toán.
     - Tạo và gửi email bảng sao kê hàng tháng cho khách hàng.
     - Cung cấp chi tiết các giao dịch, thanh toán và phí trong bảng sao kê.
     - Hỗ trợ nhiều phương thức thanh toán hóa đơn (ví dụ: chuyển khoản ngân hàng, thẻ tín dụng, cổng thanh toán trực tuyến).

   - **Thiết kế cơ sở dữ liệu**:
     - Bảng: `Statements`
       ```sql
       CREATE TABLE Statements (
           statement_id UUID PRIMARY KEY,
           customer_id UUID REFERENCES Customers(customer_id),
           billing_period_start DATE NOT NULL,
           billing_period_end DATE NOT NULL,
           total_due DECIMAL(10, 2) NOT NULL,
           minimum_due DECIMAL(10, 2) NOT NULL,
           due_date DATE NOT NULL,
           interest_charged DECIMAL(10, 2) DEFAULT 0.00,
           late_fee DECIMAL(10, 2) DEFAULT 0.00,
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       );
       ```

     - Bảng: `Transactions`
       ```sql
       CREATE TABLE Transactions (
           transaction_id UUID PRIMARY KEY,
           card_id UUID REFERENCES Cards(card_id),
           transaction_date TIMESTAMP NOT NULL,
           description TEXT NOT NULL,
           amount DECIMAL(10, 2) NOT NULL,
           transaction_type VARCHAR(10) CHECK (transaction_type IN ('Purchase', 'Payment', 'Refund')),
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       );
       ```

     - Bảng: `Payments`
       ```sql
       CREATE TABLE Payments (
           payment_id UUID PRIMARY KEY,
           customer_id UUID REFERENCES Customers(customer_id),
           payment_date TIMESTAMP NOT NULL,
           amount DECIMAL(10, 2) NOT NULL,
           payment_method VARCHAR(20) CHECK (payment_method IN ('Bank Transfer', 'Credit Card', 'Online Gateway')),
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       );
       ```

   - **Logic**:
     - **Tính lãi suất**:
       1. Xác định số dư chưa thanh toán vào cuối kỳ thanh toán.
       2. Áp dụng lãi suất (ví dụ: 1.5% hàng tháng) vào số dư chưa thanh toán.
       3. Thêm lãi suất đã tính vào tổng số tiền phải trả cho chu kỳ thanh toán tiếp theo.

     - **Tính phí trễ hạn**:
       1. Kiểm tra nếu thanh toán được thực hiện sau ngày đến hạn.
       2. Áp dụng phí trễ hạn cố định (ví dụ: $25) hoặc phần trăm của số dư chưa thanh toán (ví dụ: 5%).

     - **Tạo bảng sao kê**:
       1. Thu thập tất cả các giao dịch trong kỳ thanh toán (ví dụ: mua sắm, thanh toán, hoàn tiền).
       2. Tính tổng số tiền phải trả, số tiền tối thiểu, lãi suất và phí trễ hạn.
       3. Tạo bảng sao kê dưới dạng PDF hoặc HTML với chi tiết giao dịch và thông tin thanh toán.
       4. Gửi email bảng sao kê cho khách hàng.

     - **Xử lý thanh toán**:
       1. Ghi nhận thanh toán vào bảng `Payments`.
       2. Trừ số tiền thanh toán từ số dư chưa thanh toán.
       3. Cập nhật bảng `Statements` để phản ánh số dư mới.

   - **Quy tắc**:
     - Bảng sao kê phải được tạo vào cùng một ngày mỗi tháng (ví dụ: ngày 1 hàng tháng).
     - Thanh toán phải được áp dụng cho số dư chưa thanh toán cũ nhất trước.
     - Không tính lãi nếu tổng số tiền phải trả được thanh toán đầy đủ trước ngày đến hạn.
     - Phí trễ hạn chỉ được áp dụng nếu số tiền tối thiểu không được thanh toán trước ngày đến hạn.

   - **Ví dụ quy trình**:
     1. **Tạo bảng sao kê**:
        - Khách hàng A có các giao dịch sau trong kỳ thanh toán (1/4 - 30/4):
          - Mua sắm: $500 vào ngày 5/4
          - Mua sắm: $200 vào ngày 15/4
          - Thanh toán: $300 vào ngày 20/4
        - Số dư chưa thanh toán: $400
        - Lãi suất (1.5%): $6
        - Tổng số tiền phải trả: $406
        - Số tiền tối thiểu: $40 (10% của tổng số tiền phải trả)
        - Ngày đến hạn: 15/5
        - Một bảng sao kê được tạo và gửi email cho khách hàng A.

     2. **Xử lý thanh toán**:
        - Khách hàng A thanh toán $406 vào ngày 10/5.
        - Thanh toán được ghi nhận vào bảng `Payments`.
        - Số dư chưa thanh toán được cập nhật thành $0.
        - Không áp dụng phí trễ hạn hoặc lãi suất bổ sung.

     3. **Áp dụng phí trễ hạn**:
        - Nếu khách hàng A không thanh toán số tiền tối thiểu trước ngày 15/5, một khoản phí trễ hạn $25 sẽ được áp dụng.
        - Tổng số tiền phải trả mới được cập nhật thành $431 ($406 + $25 phí trễ hạn).

## Ví dụ: Các kịch bản trong kỳ thanh toán

### Thông tin khách hàng
- **Tên khách hàng**: John Doe
- **Loại thẻ**: Cashback Platinum
- **Hạn mức tín dụng**: $10,000
- **Kỳ thanh toán**: 1/4 - 30/4
- **Ngày đến hạn**: 15/5
- **Lãi suất**: 1.5% mỗi tháng
- **Phí trễ hạn**: $25

---

### Giao dịch trong kỳ thanh toán
1. **Ngày 5/4**: Mua sắm $500 (Hàng tạp hóa)
2. **Ngày 15/4**: Mua sắm $200 (Điện tử)
3. **Ngày 20/4**: Thanh toán $300

---

### Kịch bản 1: Thanh toán toàn bộ số tiền
- **Số dư chưa thanh toán**: $400 (sau khi thanh toán $300)
- **Lãi suất**: $0 (không tính lãi nếu thanh toán toàn bộ trước ngày đến hạn)
- **Tổng số tiền phải trả**: $400
- **Số tiền thanh toán**: $400 vào ngày 10/5

#### Hành động của hệ thống:
1. Ghi nhận thanh toán vào bảng `Payments`:
   ```sql
   INSERT INTO Payments (
       payment_id, customer_id, payment_date, amount, payment_method, created_at
   ) VALUES (
       'pay-001', 'cust-67890', '2025-05-10', 400.00, 'Bank Transfer', CURRENT_TIMESTAMP
   );
   ```
2. Cập nhật số dư chưa thanh toán thành $0 trong bảng `Statements`.

#### Kết quả cuối cùng:
- Không áp dụng lãi suất hoặc phí trễ hạn.
- Tài khoản ở trạng thái **Tốt**.

---

### Kịch bản 2: Thanh toán số tiền tối thiểu
- **Số dư chưa thanh toán**: $400
- **Số tiền tối thiểu**: $40 (10% của tổng số tiền phải trả)
- **Lãi suất**: $5.40 (1.5% của số dư còn lại $360 sau khi thanh toán tối thiểu)
- **Tổng số tiền phải trả cho kỳ tiếp theo**: $365.40
- **Số tiền thanh toán**: $40 vào ngày 10/5

#### Hành động của hệ thống:
1. Ghi nhận thanh toán vào bảng `Payments`:
   ```sql
   INSERT INTO Payments (
       payment_id, customer_id, payment_date, amount, payment_method, created_at
   ) VALUES (
       'pay-002', 'cust-67890', '2025-05-10', 40.00, 'Bank Transfer', CURRENT_TIMESTAMP
   );
   ```
2. Cập nhật số dư chưa thanh toán thành $360 trong bảng `Statements`.
3. Thêm lãi suất $5.40 vào kỳ thanh toán tiếp theo.

#### Kết quả cuối cùng:
- Lãi suất $5.40 được áp dụng cho kỳ thanh toán tiếp theo.
- Tài khoản vẫn ở trạng thái **Tốt** vì đã thanh toán số tiền tối thiểu.

---

### Kịch bản 3: Không thanh toán
- **Số dư chưa thanh toán**: $400
- **Số tiền tối thiểu**: $40
- **Lãi suất**: $6 (1.5% của $400)
- **Phí trễ hạn**: $25
- **Tổng số tiền phải trả cho kỳ tiếp theo**: $431 ($400 + $6 lãi suất + $25 phí trễ hạn)
- **Số tiền thanh toán**: $0

#### Hành động của hệ thống:
1. Thêm lãi suất $6 vào số dư chưa thanh toán.
2. Áp dụng phí trễ hạn $25 vào số dư chưa thanh toán.
3. Cập nhật tổng số tiền phải trả thành $431 trong bảng `Statements`.

#### Kết quả cuối cùng:
- Tài khoản bị đánh dấu là **Quá hạn**.
- Lãi suất và phí trễ hạn được áp dụng cho kỳ thanh toán tiếp theo.

---

### Bảng tóm tắt

| Kịch bản                | Số tiền thanh toán | Lãi suất áp dụng | Phí trễ hạn | Tổng số tiền phải trả kỳ tiếp theo | Trạng thái tài khoản |
|-------------------------|--------------------|------------------|-------------|------------------------------------|-----------------------|
| Thanh toán toàn bộ      | $400              | $0               | $0          | $0                                | Tốt                   |
| Thanh toán tối thiểu    | $40               | $5.40            | $0          | $365.40                           | Tốt                   |
| Không thanh toán        | $0                | $6               | $25         | $431                              | Quá hạn               |

---

## Ví dụ kỳ thanh toán tiếp theo (1/5 - 31/5)

### Thông tin khách hàng
- **Tên khách hàng**: John Doe
- **Loại thẻ**: Cashback Platinum
- **Hạn mức tín dụng**: $10,000
- **Lãi suất**: 1.5% mỗi tháng
- **Phí trễ hạn**: $25
- **Kỳ thanh toán**: 1/5 - 31/5
- **Ngày đến hạn**: 15/6

---

### Kịch bản 1: Thanh toán toàn bộ trong kỳ trước
- **Số dư trước đó**: $0 (đã thanh toán toàn bộ trong kỳ trước)
- **Giao dịch mới**:
  - **Ngày 5/5**: Mua sắm $300 (Ăn uống)
  - **Ngày 20/5**: Mua sắm $150 (Nhiên liệu)
- **Tổng số tiền phải trả**: $450
- **Số tiền tối thiểu**: $45 (10% của tổng số tiền phải trả)

#### Kết quả cuối cùng:
- John Doe nhận được bảng sao kê với số tiền $450, không có lãi suất hoặc phí trễ hạn.
- Tài khoản vẫn ở trạng thái **Tốt**.

---

### Kịch bản 2: Thanh toán số tiền tối thiểu trong kỳ trước
- **Số dư trước đó**: $365.40 (số dư còn lại từ kỳ trước)
- **Lãi suất trên số dư trước đó**: $5.48 (1.5% của $365.40)
- **Giao dịch mới**:
  - **Ngày 5/5**: Mua sắm $300 (Ăn uống)
  - **Ngày 20/5**: Mua sắm $150 (Nhiên liệu)
- **Tổng số tiền phải trả**: $820.88 ($365.40 + $5.48 lãi suất + $450 giao dịch mới)
- **Số tiền tối thiểu**: $82.09 (10% của tổng số tiền phải trả)

#### Kết quả cuối cùng:
- John Doe nhận được bảng sao kê với số tiền $820.88, bao gồm lãi suất trên số dư trước đó.
- Tài khoản vẫn ở trạng thái **Tốt** vì đã thanh toán số tiền tối thiểu trong kỳ trước.

---

### Kịch bản 3: Không thanh toán trong kỳ trước
- **Số dư trước đó**: $431 (bao gồm phí trễ hạn và lãi suất từ kỳ trước)
- **Lãi suất trên số dư trước đó**: $6.47 (1.5% của $431)
- **Giao dịch mới**:
  - **Ngày 5/5**: Mua sắm $300 (Ăn uống)
  - **Ngày 20/5**: Mua sắm $150 (Nhiên liệu)
- **Phí trễ hạn**: $25 (do không thanh toán số tiền tối thiểu lần nữa)
- **Tổng số tiền phải trả**: $912.47 ($431 + $6.47 lãi suất + $25 phí trễ hạn + $450 giao dịch mới)
- **Số tiền tối thiểu**: $91.25 (10% của tổng số tiền phải trả)

#### Kết quả cuối cùng:
- John Doe nhận được bảng sao kê với số tiền $912.47, bao gồm lãi suất, phí trễ hạn và giao dịch mới.
- Tài khoản bị đánh dấu là **Quá hạn**.

---

### Bảng tóm tắt kỳ thanh toán tiếp theo

| Kịch bản                | Số dư trước đó | Lãi suất áp dụng | Phí trễ hạn | Giao dịch mới | Tổng số tiền phải trả | Số tiền tối thiểu | Trạng thái tài khoản |
|-------------------------|----------------|------------------|-------------|---------------|-----------------------|-------------------|-----------------------|
| Thanh toán toàn bộ      | $0             | $0               | $0          | $450          | $450                 | $45               | Tốt                   |
| Thanh toán tối thiểu    | $365.40        | $5.48            | $0          | $450          | $820.88              | $82.09            | Tốt                   |
| Không thanh toán        | $431           | $6.47            | $25         | $450          | $912.47              | $91.25            | Quá hạn               |

---

Những ví dụ này minh họa cách hệ thống xử lý các kịch bản thanh toán khác nhau trong kỳ thanh toán.


