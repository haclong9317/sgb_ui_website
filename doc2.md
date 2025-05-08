
# **TÀI LIỆU MÔ TẢ YÊU CẦU NGƯỜI DÙNG (URD)_V02  ** 

**DỰ ÁN: PHÁT HÀNH VÀ XỬ LÝ GIAO DỊCH THẺ TÍN DỤNG NỘI ĐỊA**
**SAIGONBANK**

**Thời gian thực hiện**: Từ ngày 01/04/2025
**Đại diện khách hàng**:

- Ông/Bà: Nguyễn Văn A
- Chức vụ: Giám đốc Trung tâm Thẻ
- Ngày: 22/04/2025
- Ký tên:

**Đại diện Công ty (BC Card)**:

- Ông/Bà: Trần Thị B
- Chức vụ: Trưởng nhóm phát triển
- Ngày: 22/04/2025
- Ký tên:

## **Lịch sử sửa đổi**

| Ngày sửa đổi | Phiên bản | Người sửa | Người duyệt | Lý do sửa đổi |
| --- | --- | --- | --- | --- |
| 26/03/2025 | V0.1 | Thao Phan | Khoa Nguyễn, Hải Nguyễn, Minh Phan | Tạo mới |
| 22/04/2025 | V1.0 |  |  | Cập nhật theo phản hồi SAIGONBANK |

# **Giới thiệu**

Tài liệu này mô tả các yêu cầu người dùng cho hệ thống phát hành và quản lý thẻ tín dụng nội địa (TDNĐ) của SAIGONBANK, đảm bảo tuân thủ quy định của Ngân hàng Nhà nước Việt Nam (NHNN), tiêu chuẩn Napas, và các chính sách nội bộ. Hệ thống sẽ hỗ trợ các hoạt động phát hành thẻ, xử lý giao dịch, quản lý hạn mức, và tích hợp với Core Banking (Symbols) để đồng bộ dữ liệu.

# **Mục tiêu**

- Phát hành và quản lý thẻ TDNĐ theo tiêu chuẩn Napas.
- Tích hợp với hệ thống Core Banking (Symbols) để đồng bộ dữ liệu khách hàng.
- Đảm bảo bảo mật, hạch toán chính xác, quản lý rủi ro, và hỗ trợ các chính sách sản phẩm.
- Xử lý các giao dịch thẻ tín dụng (mua hàng, rút tiền mặt, trả góp, thanh toán dư nợ).
- Cung cấp các báo cáo quản trị và vận hành chi tiết.

# **Phạm vi**

## **Giai đoạn 1**

- Phát hành thẻ TDNĐ (thẻ chính, thẻ phụ, thẻ combo).
- Xử lý các giao dịch cơ bản: mua hàng (POS/ECOM), rút tiền mặt (ATM/quầy), trả góp, thanh toán dư nợ.
- Quản lý hạn mức, nhóm nợ, và hạch toán.
- Tích hợp với Core Banking (Symbols) và Napas.

## **Giai đoạn 2**

- Quản lý khách hàng thân thiết, chương trình khuyến mại, và các tính năng nâng cao.

# **Định nghĩa và từ viết tắt**

| **Thuật ngữ** | **Định nghĩa** |
| --- | --- |
| TDNĐ | Thẻ tín dụng nội địa, phát hành theo tiêu chuẩn Napas. |
| Core Banking (Symbols) | Hệ thống ngân hàng lõi của SAIGONBANK. |
| CVK | Card Verification Key, khóa xác minh thẻ. |
| PVK | PIN Verification Key, khóa xác minh mã PIN. |
| EOD | End of Day, kết toán cuối ngày. |
| Napas | Hệ thống thanh toán thẻ quốc gia Việt Nam. |
| ĐVPH | Đơn vị phát hành (Chi nhánh SAIGONBANK). |
| TTKDT | Trung tâm kiểm duyệt thẻ. |
| Ngày ân hạn| Khoảng thời gian từ ngày sao kê đến ngày đến hạn thanh toán mà không bị tính lãi. |
| Batch Job| Tác vụ tự động được lập lịch chạy định kỳ trên hệ thống.|

# **Yêu cầu chi tiết**

## **Quản lý các cấu hình**

### **1. Cài đặt toàn hệ thống**
**Mô tả**
Cấu hình các thông số hệ thống liên quan đến quản lý thẻ tín dụng, bao gồm ngày sao kê, tỷ lệ thanh toán tối thiểu, hạn mức rút tiền hàng tháng, và giới hạn rút tiền tối thiểu/tối đa.

---

**Thông tin cấu hình**
| **Tên tham số**            | **Bắt buộc** | **Kiểu dữ liệu** | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------|---------------------------------------------------------------------------|
| Ngày sao kê (*)             | Có           | Number        | Ngày cố định hàng tháng để sao kê giao dịch (ví dụ: ngày 10), giá trị refer.             |
| Tỷ lệ thanh toán tối thiểu (*) | Có        | Number       | Tỷ lệ phần trăm tối thiểu khách hàng phải thanh toán (ví dụ: 5%).         |
| Lãi suất rút tiền mặt (*) | Có        | Number       | Tỷ lệ phần trăm lãi suất rút tiền mặt (ví dụ: 5%).         |
| Hạn mức rút tiền hàng tháng (*) | Có      | Number       | Tổng số tiền tối đa được phép rút trong một tháng (ví dụ: 100,000,000 VNĐ).|
| Giới hạn rút tiền tối thiểu (*) | Có       | Number       | Số tiền tối thiểu cho mỗi lần rút tiền (ví dụ: 200,000 VNĐ).              |
| Giới hạn rút tiền tối đa (*) | Có          | Number       | Số tiền tối đa cho mỗi lần rút tiền (ví dụ: 100,000,000 VNĐ).               |
| Số ngày quá hạn khóa thẻ    | Có           | Number           | Số ngày từ ngày đến hạn thanh toán mà khách hàng chưa thanh toán khoản tối thiểu. Hết thời gian này, hệ thống sẽ tự động khóa thẻ. |
| Khôi phục tự động           | Có           | Dropdown         | Có/Không. Cho phép mở lại thẻ tự động sau khi khách hàng thanh toán khoản tối thiểu. |
---

## **Hành động**
- **Sửa**: Chỉnh sửa thông tin cấu hình hiện tại.

---

## **Giao diện**

* **Form sửa cấu hình**
    * Hiển thị dạng modal với các trường nhập liệu:
        * Ngày sao kê (*): Textbox để nhập ngày (ví dụ: 10).
        * Tỷ lệ thanh toán tối thiểu (*): Textbox để nhập tỷ lệ phần trăm (ví dụ: 5%).
        * Lãi suất rút tiền mặt (*): Textbox để nhập tỷ lệ phần trăm (ví dụ: 5%).
        * Hạn mức rút tiền hàng tháng (*): Textbox để nhập số tiền (ví dụ: 100,000,000 VNĐ).
        * Giới hạn rút tiền tối thiểu (*): Textbox để nhập số tiền (ví dụ: 200,000 VNĐ).
        * Giới hạn rút tiền tối đa (*): Textbox để nhập số tiền (ví dụ: 100,000,000 VNĐ).
        * Số ngày quá hạn khóa thẻ (*): textbox nhập số ngày thanh toán tối thiểu khóa thẻ
        * Khôi phục tự động (*): Dropdown có/không khôi phục tự động

---
--------------------------------------
| Ngày sao kê (*): [__________]       |
| Tỷ lệ thanh toán tối thiểu (*): [__5%__] |
| Lãi suất rút tiền (*): [__5%__] |
| Hạn mức rút tiền hàng tháng (*): [100,000,000 VNĐ] |
| Giới hạn rút tiền tối thiểu (*): [200,000 VNĐ]    |
| Giới hạn rút tiền tối đa (*): [100,000,000 VNĐ]     |
| Số ngày quá hạn khóa thẻ: [___30___] |
| Khôi phục tự động:                  |
|   [Dropdown ▼] Có                   |
--------------------------------------
| [Lưu] [Hủy]                         |
--------------------------------------

### **2. Cấu hình Hạng Thẻ**

**Mô tả**
Cấu hình chi tiết các hạng thẻ tín dụng, bao gồm đối tượng khách hàng, hạn mức tín dụng, tính năng, phí thường niên, và các quy định liên quan đến thẻ phụ.


**Thông tin cấu hình**
| **Tên tham số**            | **Bắt buộc** | **Kiểu dữ liệu** | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------|---------------------------------------------------------------------------|
| Tên hạng thẻ (*)            | Có           | String           | Tên hạng thẻ (ví dụ: Standard, Platinum). Độ dài tối đa 50 ký tự.         |
| Đối tượng khách hàng (*)    | Có           | String           | Đối tượng khách hàng áp dụng (ví dụ: Cá nhân, Doanh nghiệp).              |
| Hạn mức tín dụng tối thiểu (*) | Có        | Number           | Hạn mức tín dụng tối thiểu (ví dụ: 10,000,000 VNĐ).                      |
| Hạn mức tín dụng tối đa (*) | Có           | Number           | Hạn mức tín dụng tối đa (ví dụ: 30,000,000 VNĐ).                         |
| Phí thường niên (*)         | Có           | Number           | Phí thường niên áp dụng cho hạng thẻ (ví dụ: 500,000 VNĐ).                |
| Hạn mức rút tiền mặt (*)         | Có           | int           | hạn mức rút tiền mặt áp dụng cho hạng thẻ (ví dụ: 50% hạng classic).                |
| Mức độ ưu tiên (*)          | Có           | Number           | Thứ tự ưu tiên sử dụng cho việc phát hành thẻ phụ (ví dụ: 1-10).          |


**Hành động**
- **Thêm**: Thêm mới cấu hình hạng thẻ.
- **Sửa**: Chỉnh sửa cấu hình hạng thẻ hiện tại.
- **Xóa**: Xóa cấu hình hạng thẻ không còn áp dụng.

**Giao diện**

* **Danh sách cấu hình**
- Hiển thị dưới dạng bảng với các cột:
  - **Tên hạng thẻ**: Ví dụ: Standard, Platinum.
  - **Đối tượng khách hàng**: Ví dụ: Cá nhân, Doanh nghiệp.
  - **Hạn mức tín dụng tối thiểu**: Ví dụ: 10 triệu
  - **Hạn mức tín dụng tối đa**: Ví dụ: 50 triệu VNĐ.
  - **Phí thường niên**: Ví dụ: 500,000 VNĐ.
  - **Mức độ ưu tiên**: Ví dụ: 1.
  - **Hạn mức rút tiền mặt**: ví dụ 50%
  - **Thao tác**: Thêm, Sửa, Xóa.

```plaintext
+-------------------+-------------------+-------------------+-------------------+-------------------+----------------+
| Tên hạng thẻ      | Đối tượng KH      | Hạn mức tín dụng  | Phí thường niên   | Mức độ ưu tiên    | Thao tác       |
+-------------------+-------------------+-------------------+-------------------+-------------------+----------------+
| Standard          | Cá nhân           | 10-50 triệu VNĐ   | 500,000 VNĐ       | 1                 | [Sửa] [Xóa]    |
| Platinum          | Cá nhân           | 50-200 triệu VNĐ  | 1,500,000 VNĐ     | 2                 | [Sửa] [Xóa]    |
+-------------------+-------------------+-------------------+-------------------+-------------------+----------------+
```

[Thêm Hạng Thẻ]

* **Form thêm/sửa cấu hình**
    * Hiển thị dạng modal với các trường nhập liệu:
        * Tên hạng thẻ (*): Textbox để nhập tên hạng thẻ.
        * Đối tượng khách hàng (*): Dropdown để chọn đối tượng khách hàng.
        * Hạn mức tín dụng tối thiểu(*): Textbox để nhập khoảng hạn mức tín dụng.
        * Hạn mức tín dụng tối đa(*): Textbox để nhập khoảng hạn mức tín dụng.
        * Phí thường niên (*): Dropdown Chọn phí thường niên
        * Hạn mức rút tiền mặt (*): Textbox để nhập Hạn mức rút tiền mặt.
        * Mức độ ưu tiên (*): Textbox để nhập thứ tự ưu tiên.
        
-----
--------------------------------------
| Tên hạng thẻ (*): [______________] |
| Đối tượng KH (*): [Dropdown ▼]     |
| Hạn mức tín dụng (*):              |
|   Từ: [__________] Đến: [________] |
| Phí thường niên (*):[Dropdown ▼] 
| Hạn mức rút tiền mặt (*): [__________]   |
| Mức độ ưu tiên (*): [__________]   |
--------------------------------------
| [Lưu] [Hủy]                        |
--------------------------------------
    
### **3. Cấu hình phí**
**Mô tả**
Cấu hình các loại phí liên quan đến thẻ tín dụng: phí rút tiền mặt, phí phạt trả chậm, Phí chuyển đổi trả góp, ... và các loại phí khác. Cấu hình này cho phép áp dụng phí theo phần trăm hoặc số tiền cố định, đồng thời hỗ trợ áp dụng cho tất cả hoặc một số sản phẩm thẻ cụ thể.

---

**Thông tin cấu hình**
| **Tên cột**                | **Bắt buộc** | **Kiểu dữ liệu**       | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------------|---------------------------------------------------------------------------|
| Mã phí                     | Có           | NUMBER             | Mã định danh phí, duy nhất.                                               |
| Tên phí                    | Có        | String          | Tên loại phí (ví dụ: , Phí rút tiền mặt).                  |
| Loại phí                   | Có           | NUMBER          | Mã loại phí, liên kết với bảng loại phí (FeeType).                        |
| Hình thức tính phí         | Có           | String           | Hình thức tính phí: `P` (Phần trăm) hoặc `F` (Số tiền cố định).           |
| Giá trị phần trăm          | Không        | DECIMAL         | Giá trị phí theo phần trăm (ví dụ: 2.5%).                                 |
| Giá trị cố định            | Không        | DECIMAL          | Giá trị phí cố định (ví dụ: 500,000 VNĐ).                                 |
| Trạng thái                 | Có           | String       | Trạng thái cấu hình: `ACTIVE` (Hoạt động) hoặc `INACTIVE` (Không hoạt động). Mặc định hoạt động. |
| Mô tả                     | Không        | String      | Mô tả chi tiết về cấu hình phí.                                           |
| Áp dụng cho tất cả sản phẩm thẻ | Không    | String          | `Y` (Có) hoặc `N` (Không).                                                |


**Lưu ý**
Phí phạt trả chậm được tính dựa trên phần trăm của số tiền thanh toán tối thiểu. 

**Quy tắc**
**Kiểm tra loại phí tồn tại**:
   - Trước khi thêm mới, hệ thống kiểm tra xem loại phí đã tồn tại hay chưa.
   - Nếu loại phí đã được cấu hình với tùy chọn "Áp dụng cho tất cả sản phẩm thẻ", không cho phép thêm mới loại phí đó.


**Liên kết với sản phẩm thẻ**
| **Tên cột**                | **Bắt buộc** | **Kiểu dữ liệu**       | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------------|---------------------------------------------------------------------------|
| Mã cấu hình phí            | Có           | NUMBER             | Mã cấu hình phí, liên kết với bảng cấu hình phí (FeeConfiguration).       |
| Mã sản phẩm thẻ            | Có           | String          | Mã sản phẩm thẻ, liên kết với bảng sản phẩm thẻ (CardProduct).            |

---

**Hành động**
- **Thêm**: Thêm mới cấu hình phí.
- **Sửa**: Chỉnh sửa cấu hình phí hiện tại.
- **Xóa**: Xóa cấu hình phí không còn áp dụng.

---

**Giao diện**

**Danh sách cấu hình phí**
- Hiển thị dưới dạng bảng với các cột:
  - **Mã phí**: Ví dụ: 001.
  - **Tên phí**: Ví dụ: Phí rút tiền mặt.
  - **Hình thức tính phí**: Ví dụ: Phần trăm (%), Số tiền cố định.
  - **Giá trị phí**: Ví dụ: 2.5% hoặc 500,000 VNĐ.
  - **Trạng thái**: Hoạt động/Không hoạt động.
  - **Thao tác**: Thêm, Sửa, Xóa.

```plaintext
| Mã phí | Tên phí               | Loại phí           | Hình thức tính phí | Giá trị phí    | Trạng thái | Thao tác       |
|--------|------------------------|---------------------|---------------------|----------------|------------|----------------|
| 001    | Phí rút tiền mặt       | CASH_ADVANCE_FEE    | Phần trăm           | 2.5%           | Hoạt động | [Sửa] [Xóa]    |
| 002    | Phí chuyển đổi trả góp | CONVERSION_FEE      | Số tiền cố định     | 500,000 VNĐ    | Hoạt động | [Sửa] [Xóa]    |

```

[Thêm Cấu Hình Phí]

* **Form thêm/sửa cấu hình phí**
    * Hiển thị dạng modal với các trường nhập liệu:
        * Mã phí: Textbox để nhập mã phí.
        * Tên phí: Textbox để nhập tên phí.
        * Loại phí: Dropdown để chọn loại phí.
        * Hình thức tính phí: Dropdown để chọn P (Phần trăm) hoặc F (Số tiền cố định).
        * Giá trị phần trăm: Textbox để nhập giá trị phần trăm (nếu áp dụng).
        * Giá trị cố định: Textbox để nhập giá trị cố định (nếu áp dụng).
        * Trạng thái: Dropdown để chọn Hoạt động/Không hoạt động.
        * Áp dụng cho tất cả sản phẩm thẻ: Checkbox để chọn Có/Không.
        * Mô tả: Textarea để nhập mô tả chi tiết.
---
--------------------------------------
| Mã phí: [__________]                |
| Tên phí: [________________________] |
| Loại phí: [Dropdown ▼]    |
| Hình thức tính phí: [Dropdown ▼]    |
| Giá trị phần trăm: [_____%]         |
| Giá trị cố định: [__________ VNĐ]   |
| Áp dụng cho tất cả sản phẩm thẻ: [ ]|
| Danh sách sản phẩm thẻ:             |
|   [ ] TDNĐ-001                      |
|   [ ] TDNĐ-002                      |
|   [ ] TDNĐ-003                      |
| Trạng thái: [Dropdown ▼]            |
| Mô tả:                              |
| [________________________________]  |
--------------------------------------
| [Lưu] [Hủy]                         |
--------------------------------------

Nếu không chọn "Áp dụng cho tất cả sản phẩm thẻ", bắt buộc chọn ít nhất một sản phẩm thẻ.

### **4. Cấu hình Nhóm Nợ**

**Mô tả**
Cấu hình nhóm nợ giúp phân loại các khoản nợ của khách hàng dựa trên thời gian quá hạn và mức độ rủi ro. Mỗi nhóm nợ được định nghĩa với lãi suất tương ứng.

---

**Thông tin cấu hình**
| **Tên tham số**            | **Bắt buộc** | **Kiểu dữ liệu** | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------|---------------------------------------------------------------------------|
| Tên nhóm nợ (*)            | Có           | String           | Tên nhóm nợ (ví dụ: Nhóm 1, Nhóm 2). Độ dài tối đa 50 ký tự.              |
| Diễn giải                  | Không        | String           | Mô tả chi tiết nhóm nợ (ví dụ: Nợ trong hạn, Nợ quá hạn 10-90 ngày).      |
| Lãi suất (%) (*) | Có           | Number           | phần trăm lãi suất theo nhóm (%).                       |
| Số ngày tối đa (*)               | Có           | Number           | Số ngày tối đa mà khoản nợ được phép tồn tại trong nhóm này (ví dụ: 90 ngày). |

---

**Hành động**
- **Thêm**: Thêm mới cấu hình nhóm nợ.
- **Sửa**: Chỉnh sửa cấu hình nhóm nợ hiện tại.
- **Xóa**: Xóa cấu hình nhóm nợ không còn áp dụng.

---

**Giao diện**

**Danh sách Nhóm Nợ**
- Hiển thị dưới dạng bảng với các cột:
  - **Tên nhóm nợ**: Ví dụ: Nhóm 1, Nhóm 2.
  - **Diễn giải**: Ví dụ: Nợ trong hạn, Nợ quá hạn 10-90 ngày.
  - **Tỷ lệ DP tối thiểu (%)**: Ví dụ: 3%, 5%.
  - **Tỷ lệ DP tối đa (%)**: Ví dụ: 5%, 10%.
  - **Số ngày tối đa**: Ví dụ: 9, 90.
  
* **Form thêm/sửa Nhóm Nợ**
    * Hiển thị dạng modal với các trường nhập liệu:
        * Tên nhóm nợ (*): Textbox để nhập tên nhóm nợ.
        * Diễn giải: Textarea để nhập mô tả chi tiết nhóm nợ.
        * Phẩn trăm lãi suất
        * Số ngày tối đa  (*): Textbox để nhập số ngày tối đa mà khoản nợ được phép tồn tại.
---
        --------------------------------------
        | Tên nhóm nợ (*): [______________]  |
        | Diễn giải:       [______________]  |
        | lãi suất (%): [_____]    |
        | Số ngày tối đa (*):      [_____]          |
        --------------------------------------
        | [Lưu] [Hủy]                         |
        --------------------------------------        
---

### **5. Cấu hình Sản phẩm Thẻ Tín dụng**

**Mô tả**
Cấu hình sản phẩm thẻ tín dụng bao gồm các thông tin cơ bản như mã sản phẩm, tên sản phẩm, loại thẻ, hạng thẻ, và các thông số liên quan khác.

---
**Thông tin cấu hình**
| **Tên tham số**            | **Bắt buộc** | **Kiểu dữ liệu** | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------|---------------------------------------------------------------------------|
| Mã sản phẩm (*)            | Có           | String           | Mã định danh sản phẩm thẻ (ví dụ: TDNĐ-001). Độ dài cố định 10 ký tự, chỉ chấp nhận chữ và số. |
| Tên sản phẩm (*)           | Có           | String           | Tên sản phẩm thẻ (ví dụ: Visa Signature).                                |
| Hạng thẻ (*)               | Có           | Dropdown         | Chọn hạng thẻ áp dụng cho sản phẩm thẻ.                                  |
| Số ngày miễn lãi (*)       | Có           | Number           | Số ngày tối đa được miễn lãi (ví dụ: 45 ngày).                           |
| Mã ngân hàng (*)           | Có           | String           | Mã định danh ngân hàng phát hành thẻ (ví dụ: BANK02).                    |
| Loại thẻ đẹp               | Không        | Checkbox         | Tùy chọn cho phép phát hành thẻ đẹp (nếu có).                            |
| Độ tuổi phát hành          | Không        | Number           | Quy định độ tuổi tối thiểu để phát hành thẻ.                             |
| Cho phép trả góp           | Không        | Checkbox         | Tùy chọn cho phép giao dịch trả góp.                                     |
| Hạn mức tối thiểu trả góp  | Không        | Number           | Hạn mức tối thiểu cho giao dịch trả góp (nếu tùy chọn trả góp được bật). |

---

**Quy tắc**
1. Nếu chọn "Cho phép trả góp", người dùng phải nhập "Hạn mức tối thiểu trả góp".
2. Người dùng cần khai báo danh sách quy định phí trả góp, bao gồm số tháng trả góp và phần trăm phí trả góp.

---

**Liên kết với phí trả góp**
| **Tên tham số**            | **Bắt buộc** | **Kiểu dữ liệu** | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------|---------------------------------------------------------------------------|
| Số tháng trả góp (*)        | Có           | Number           | Số tháng áp dụng trả góp (ví dụ: 3 tháng, 6 tháng, 12 tháng).             |
| Phần trăm phí trả góp (*)   | Có           | Number           | Tỷ lệ phần trăm phí trả góp (ví dụ: 0%, 1.5%).                            |

---

**Ví dụ**
- **Sản phẩm thẻ**: Visa Signature
  - **Mã sản phẩm**: TDNĐ-001
  - **Hạng thẻ**: Platinum
  - **Số ngày miễn lãi**: 45 ngày
  - **Cho phép trả góp**: Có
  - **Hạn mức tối thiểu trả góp**: 5,000,000 VNĐ
  - **Danh sách phí trả góp**:
    - Số tháng trả góp: 3 tháng, Phần trăm phí trả góp: 0%
    - Số tháng trả góp: 6 tháng, Phần trăm phí trả góp: 1.5%
    - Số tháng trả góp: 12 tháng, Phần trăm phí trả góp: 2.5%


**Hành động**
- **Thêm**: Thêm mới cấu hình sản phẩm thẻ.
- **Sửa**: Chỉnh sửa cấu hình sản phẩm thẻ hiện tại.
- **Xóa**: Xóa cấu hình sản phẩm thẻ không còn áp dụng.

---

**Giao diện**
* **Danh sách Sản phẩm thẻ**

* **Form thêm/sửa Sản phẩm Thẻ**
- Hiển thị dạng modal với các trường nhập liệu:
  - **Mã sản phẩm (*)**: Textbox để nhập mã sản phẩm (độ dài cố định 10 ký tự, chỉ chấp nhận chữ và số).
  - **Tên sản phẩm (*)**: Textbox để nhập tên sản phẩm.
  - **Hạng thẻ (*)**: Dropdown để chọn hạng thẻ áp dụng.
  - **Số ngày miễn lãi (*)**: Textbox để nhập số ngày miễn lãi tối đa (ví dụ: 45 ngày).
  - **Mã ngân hàng (*)**: Textbox để nhập mã định danh ngân hàng phát hành thẻ.
  - **Loại thẻ đẹp**: Checkbox để chọn tùy chọn phát hành thẻ đẹp.
  - **Độ tuổi phát hành**: Textbox để nhập độ tuổi tối thiểu để phát hành thẻ.
  - **Cho phép trả góp**: Checkbox để chọn có cho phép trả góp hay không.
  - **Hạn mức tối thiểu trả góp**: Textbox để nhập hạn mức tối thiểu giao dịch trả góp (chỉ hiển thị khi chọn "Cho phép trả góp").

```plaintext
--------------------------------------
| Mã sản phẩm (*): [______________]  |
| Tên sản phẩm (*): [______________] |
| Hạng thẻ (*):       [Dropdown ▼]   |
--------------------------------------
| Số ngày miễn lãi (*): [__________] |
--------------------------------------
| Mã ngân hàng (*): [______________] |
| [ ] Loại thẻ đẹp                   |
--------------------------------------
| [x] Cho phép trả góp               |
| Hạn mức tối thiểu trả góp: [__500.000_] |
| Danh sách phí:             |
|   [ 3 ] 0%                 |
|   [ 12 ] 2%                |
|   [ 24 ] 5%                |
--------------------------------------
| [Lưu] [Hủy]                        |
--------------------------------------
```
### **6. Cấu hình Phí Thường Niên**

**Mô tả**
Cấu hình phí thường niên áp dụng cho các hạng thẻ tín dụng. Phí thường niên có thể được tính theo số tiền cố định.

---

**Thông tin cấu hình**
| **Tên tham số**            | **Bắt buộc** | **Kiểu dữ liệu** | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------|---------------------------------------------------------------------------|
| Mã phí thường niên (*)     | Có           | String           | Mã định danh phí thường niên, duy nhất (ví dụ: PTN001).                   |
| Tên (*)                    | Có           | String           | Tên phí thường niên (ví dụ: Phí thường niên Standard).                   |
| Số tiền (*)                | Có           | Number           | Số tiền cố định áp dụng cho phí thường niên (ví dụ: 500,000 VNĐ).         |
---

**Hành động**
- **Thêm**: Thêm mới cấu hình phí thường niên.
- **Sửa**: Chỉnh sửa cấu hình phí thường niên hiện tại.
- **Xóa**: Xóa cấu hình phí thường niên không còn áp dụng.

---

**Giao diện**
**Danh sách**

**Form thêm/sửa Phí Thường Niên**
- Hiển thị dạng modal với các trường nhập liệu:
  - **Mã phí thường niên (*)**: Textbox để nhập mã phí thường niên.
  - **Tên (*)**: Textbox để nhập tên phí thường niên.
  - **Số tiền (*)**: Textbox để nhập số tiền cố định.
 
 

```plaintext
--------------------------------------
| Mã phí thường niên (*): [________] |
| Tên (*):               [__________] |
| Số tiền (*):           [____0.00___]|
--------------------------------------
| [Lưu] [Thoát]                        |
--------------------------------------
```
### **7. Cấu hình Merchant**

**Mô tả**
Cấu hình Merchant (Đơn vị chấp nhận thẻ) giúp quản lý thông tin các đơn vị chấp nhận thẻ tín dụng. Hệ thống hỗ trợ thêm mới, chỉnh sửa, và quản lý danh sách Merchant với các thông tin chi tiết như địa chỉ, tài khoản, người liên hệ, và chi nhánh quản lý.

---

**Thông tin cấu hình**
| **Tên tham số**            | **Bắt buộc** | **Kiểu dữ liệu** | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------|---------------------------------------------------------------------------|
| Merchant ID                | Không        | String           | Mã định danh Merchant, hệ thống tự tạo sau khi khai báo thành công.       |
| Tên (*)                    | Có           | String           | Tên Merchant (ví dụ: Công ty ABC).                                        |
| Địa chỉ (*)                | Có           | String           | Địa chỉ Merchant.                                                        |
| Email                      | Không        | String           | Email liên hệ của Merchant.                                              |
| Tài khoản                  | Có        | String           | Tài khoản ngân hàng của Merchant.                                        |
| Người liên hệ (*)          | Có           | String           | Họ tên người liên hệ của Merchant.                                       |
| Số điện thoại (*)          | Có           | String           | Số điện thoại liên hệ của Merchant.                                       |
| Giới tính                  | Không        | Dropdown         | Giới tính của người liên hệ (Nam/Nữ).                                    |
| Ngày sinh                  | Không        | Date             | Ngày sinh của người liên hệ.                                             |
| Số CCCD                   | Không        | String           | Số căn cước công dân của người liên hệ.                                  |
| Chức vụ                   | Không        | String           | Chức vụ của người liên hệ.                                               |
| Chi nhánh quản lý Merchant (*) | Có       | Dropdown         | Chi nhánh SAIGONBANK quản lý Merchant.                                   |
| Trạng thái                 | Không        | Dropdown         | Trạng thái Merchant, mặc định là `ACTIVE` khi thêm mới.                  |

---

**Quy tắc**
1. **Trường bắt buộc**:
   - Các trường bắt buộc phải được nhập đầy đủ trước khi lưu (các trường bắt buộc được đánh dấu bằng ký hiệu `(*)`).
   - Nếu thiếu bất kỳ trường bắt buộc nào, hệ thống không cho phép tạo Merchant và hiển thị thông báo lỗi.

2. **Merchant ID**:
   - Merchant ID được hệ thống tự động tạo sau khi khai báo thành công, không cho phép người dùng nhập.

3. **Trạng thái mặc định**:
   - Khi thêm mới Merchant, trạng thái mặc định là `ACTIVE`, không cần người dùng chọn.

4. **Danh sách Merchant**:
   - Bổ sung nút "Điều chỉnh" để chỉnh sửa thông tin Merchant.

---

**Hành động**
- **Thêm**: Thêm mới Merchant.
- **Sửa**: Chỉnh sửa thông tin Merchant hiện tại.
- **Xóa**: Xóa Merchant không còn áp dụng.

---

**Giao diện**

**Form thêm/sửa Merchant**
- Hiển thị dạng modal với các trường nhập liệu:
  - **Merchant ID**: Hiển thị sau khi hệ thống tự tạo.
  - **Tên (*)**: Textbox để nhập tên Merchant.
  - **Địa chỉ (*)**: Textbox để nhập địa chỉ Merchant.
  - **Email**: Textbox để nhập email liên hệ.
  - **Tài khoản**: Textbox để nhập tài khoản ngân hàng.
  - **Người liên hệ (*)**: Textbox để nhập họ tên người liên hệ.
  - **Số điện thoại (*)**: Textbox để nhập số điện thoại liên hệ.
  - **Giới tính**: Dropdown để chọn giới tính (Nam/Nữ).
  - **Ngày sinh**: Date picker để chọn ngày sinh.
  - **Số CCCD**: Textbox để nhập số căn cước công dân.
  - **Chức vụ**: Textbox để nhập chức vụ của người liên hệ.
  - **Chi nhánh quản lý Merchant (*)**: Dropdown để chọn chi nhánh quản lý.
  - **Trạng thái**: Checkbox hiển thị trạng thái Merchant, mặc định là `ACTIVE`.

```plaintext
--------------------------------------
| Merchant ID:       [Tự động tạo]   |
| Tên (*):           [______________]|
| Địa chỉ (*):       [______________]|
| Email:             [______________]|
| Tài khoản:         [______________]|
| Người liên hệ (*): [______________]|
| Số điện thoại (*): [______________]|
| Giới tính:         [Dropdown ▼]    |
| Ngày sinh:         [__/__/____]    |
| Số CCCD:           [______________]|
| Chức vụ:           [______________]|
| Chi nhánh quản lý (*):  [Dropdown]|
| Trạng thái:        [ACTIVE]        |
--------------------------------------
| [Lưu] [Thoát]                        |
--------------------------------------
```


## **Chức năng phát hành thẻ**

### **1. Hồ sơ Khách hàng**

**Mô tả**
Hồ sơ khách hàng được quản lý dựa trên thông tin từ Core Banking (Symbols). Hệ thống hỗ trợ thêm mới, cập nhật, và lưu trữ thông tin khách hàng, bao gồm thông tin cá nhân, thông tin công ty chủ thẻ, thông tin liên quan, và các tài liệu đính kèm.

---

**Thông tin cấu hình**
**Tab 1: Thông tin chủ thẻ**
| **Tên tham số**            | **Bắt buộc** | **Kiểu dữ liệu** | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------|---------------------------------------------------------------------------|
| Mã khách hàng (*)          | Có           | String           | Mã định danh khách hàng, lấy từ Core Banking.                            |
| Loại khách hàng (*)        | Có           | Dropdown         | Chọn loại khách hàng: Cá nhân, Doanh nghiệp.                             |
| Tên khách hàng (*)         | Có           | String           | Họ tên khách hàng.                                                       |
| Tên tiếng Anh              | Không        | String           | Tên khách hàng bằng tiếng Anh (nếu có).                                  |
| Tình trạng hôn nhân        | Không        | Dropdown         | Chọn: Độc thân, Đã kết hôn, Ly hôn.                                      |
| Ngày sinh (*)              | Có           | Date             | Ngày sinh của khách hàng.                                                |
| Nơi sinh (*)              | Không           | Date             | Nơi của khách hàng.                                                |
| Số CMND/CCCD (*)           | Có           | String           | Số CMND/CCCD của khách hàng.                                             |
| Ngày cấp (*)               | Có           | Date             | Ngày cấp CMND/CCCD.                                                      |
| Nơi cấp (*)                | Có           | String           | Nơi cấp CMND/CCCD.                                                       |
| Ngày hết hạn                | không           | String           | Ngày hết hạn                                                     |
| Địa chỉ (*)                | Có           | String           | Địa chỉ thường trú của khách hàng, lấy từ Symbols.                       |
| Mã tỉnh/thành phố               | không           | Dropdown           | Mã tỉnh thành                                                     |
| Tên quốc gia               | không           | Dropdown           | Tên quốc gia                                                    |
| Địa chỉ liên hệ 2          | Không        | String           | Địa chỉ liên hệ bổ sung (nếu có).                                         |
| Số điện thoại (*)          | Có           | String           | Số điện thoại liên hệ, lấy từ Core Banking.                              |
| Email (*)                  | Có           | String           | Email liên hệ, lấy từ Core Banking.                                      |
| Số di động (*)                  | Có           | String           | Số di động.                                      |
| Số fax                   | Không           | String           | Số fax                                      |
| Giới tính (*)              | Có           | Dropdown         | Chọn giới tính: Nam/Nữ.                                                  |
| Địa chỉ thông báo          | Không        | String           | Địa chỉ nhận thông báo.                                  |
| Nhóm nợ| Không           | Không         | Nhóm nợ hiện tại của khách hàng. Mỗi kỳ sao kê hệ thống tự tín toán và nhảy nhóm nợ cho khách hàng.                                        |
| Dư nợ hiện tại|   Không         | Không         | Dư nợ hiện tại được hệ thống tín toán hiển thị thông tin sau mỗi lần giao dịch.                              |
| Phương thức giao thẻ (*)   | Có           | String         |  Bưu phát, Chi nhánh....                                              |
| Hạn mức phê duyệt trước đó | Không        | Number           | Hạn mức tín dụng gần nhất đã được phê duyệt.                             |
| Sản phẩm thẻ gần nhất | Không        | String           | Sản phẩm thẻ gần nhất đã dùng.                             |

---

**Tab 2: Thông tin công ty chủ thẻ**
| **Tên tham số**            | **Bắt buộc** | **Kiểu dữ liệu** | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------|---------------------------------------------------------------------------|
| Tên công ty                | Không        | String           | Tên công ty chủ thẻ.                                                     |
| Địa chỉ                    | Không        | String           | Địa chỉ công ty.                                                         |
| Số điện thoại              | Không        | String           | Số điện thoại công ty.                                                   |
| Số fax                     | Không        | String           | Số fax công ty.                                                          |
| Số hợp đồng chi lương      | Không        | String           | Số hợp đồng chi lương của công ty.                                       |
| Ngày ký hợp đồng chi lương | Không        | Date             | Ngày ký hợp đồng chi lương.                                              |
| Mã Client của đơn vị chi lương | Không    | String           | Mã định danh đơn vị chi lương.                                           |

---

**Tab 3: Thông tin liên quan**
| **Tên tham số**            | **Bắt buộc** | **Kiểu dữ liệu** | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------|---------------------------------------------------------------------------|
| Tên người liên hệ (*)      | Có           | String           | Họ tên người liên hệ.                                                    |
| Mối quan hệ (*)            | Có           | Dropdown         | Mối quan hệ với chủ thẻ (Cha/Mẹ, Vợ/Chồng, Bạn bè, Khác).                 |
| Số điện thoại (*)          | Có           | String           | Số điện thoại của người liên hệ.                                         |
| Số CCCD                   | Không        | String           | Số căn cước công dân của người liên hệ.                                  |
| Chức vụ                   | Không        | String           | Chức vụ của người liên hệ.                                               |
| Giới tính                 | Không        | Dropdown         | Giới tính của người liên hệ (Nam/Nữ).                                    |
| Ngày sinh                 | Không        | Date             | Ngày sinh của người liên hệ.                                             |
| Địa chỉ                   | Không        | String           | Địa chỉ của người liên hệ.                                               |
| Số fax                    | Không        | String           | Số fax của người liên hệ.                                                |
| Tên công ty               | Không        | String           | Tên công ty của người liên hệ.                                           |

---

**Tab 4: Tài liệu đính kèm**
| **Tên tham số**            | **Bắt buộc** | **Kiểu dữ liệu** | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------|---------------------------------------------------------------------------|
| Tên file                   | Có           | String           | Tên file tài liệu đính kèm.                                              |
| Nội dung                   | Có           | String           | Mô tả nội dung tài liệu.                                                 |
| Đường dẫn                  | Có           | String           | Đường dẫn file tài liệu.                                                 |
| Dung lượng tối đa           | Có           | Number           | Giới hạn dung lượng mỗi file: 10MB.                                      |
| Số lượng file tối đa        | Có           | Number           | Giới hạn số lượng file: 10 file.                                         |
| Mã file                    | Có           | String           | Mã định danh file, tự động tạo khi upload.                               |

---

**Tab 5: Thông tin khác liên quan đến thẻ tín dụng**
| **Tên tham số**            | **Bắt buộc** | **Kiểu dữ liệu** | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------|---------------------------------------------------------------------------|
| Nghề nghiệp                | Không        | String           | Nghề nghiệp của khách hàng (ví dụ: Nhân viên văn phòng, Kinh doanh).      |
| Chức vụ                    | Không        | String           | Chức vụ của khách hàng (ví dụ: Trưởng phòng, Giám đốc).                  |
| Học vấn                    | Không        | Dropdown         | Trình độ học vấn (ví dụ: Trung cấp, Cao đẳng, Đại học, Sau đại học).      |
| Làm chủ                    | Không        | Dropdown         | Khách hàng có phải là chủ doanh nghiệp không (Có/Không).                 |
| Nơi công tác               | Không        | String           | Tên công ty hoặc tổ chức nơi khách hàng đang làm việc.                   |
| Thu nhập chính             | Không        | Number           | Thu nhập chính của khách hàng (VNĐ).                                     |
| Thu nhập khác              | Không        | Number           | Thu nhập bổ sung của khách hàng (VNĐ).                                   |
| Tổng thu nhập              | Không        | Number           | Tổng thu nhập của khách hàng (VNĐ).                                      |
| Các ngân hàng hiện đang cấp thẻ tín dụng | Không | Textarea | Danh sách các ngân hàng hiện đang cấp thẻ tín dụng cho khách hàng.       |

---

**Quy tắc**
1. **Thông tin từ Core Banking**:
   - Các thông tin được lấy từ Core Banking để đảm bảo tính chính xác.
   
2. **Upload hồ sơ tín dụng**:
   - Hỗ trợ upload các tài liệu tín dụng (PDF, JPG).
   - Giới hạn dung lượng mỗi file: 10MB.
   - Mỗi lần upload, hệ thống tự tạo mã file để dễ nhận diện.
   - Người dùng có thể thêm, sửa, hoặc xóa hồ sơ upload.

3. **Cảnh báo tuổi**:
   - Hệ thống cảnh báo nếu khách hàng không đủ tuổi hoặc vượt quá giới hạn tuổi cấp thẻ.

4. **Nhiều người liên hệ**:
   - Hệ thống hỗ trợ thêm nhiều người liên hệ.
   - Mỗi người liên hệ được hiển thị dưới dạng một dòng trong danh sách.
   - Người dùng có thể thêm, sửa, hoặc xóa thông tin người liên hệ.
---

**Hành động**
- **Thêm**: Thêm mới khách hàng. Thêm mới khách hàng thành công, trạng thái khách hàng chờ Duyệt
- **Cập nhật**: Cập nhật thông tin khách hàng hiện tại. Cập nhật khách hàng thành công trạng thái chuyển sang chờ Duyệt
- **Xem**: Xem chi tiết thông tin khách hàng.
- **Xóa**: xóa thông tin khách hàng.
- **Thoái Duyệt**: Khi Khách hàng ở trạng thái đã duyệt thì chuyển sang trạng thái thoái duyệt thực hiện chỉnh sửa thông tin. Khách hàng đang trong quá trình phát hành thẻ không cho phép thoái duyệt chỉnh sửa thông tin. Sao khi sửa thông tin thành công hệ thống sẽ hiển thị thông báo có hồ sơ khách hàng cần duyệt. Thông tin hồ sơ khách hàng chuyển tới kiểm soát viên chờ duyệt.
---

**Giao diện**

**Form thêm/cập nhật khách hàng**
- Hiển thị dạng modal với các tab:
  - **Thông tin chủ thẻ**: Hiển thị các trường thông tin cá nhân.
  - **Thông tin công ty chủ thẻ**: Hiển thị thông tin công ty (nếu có).
  - **Thông tin liên quan**: Hiển thị thông tin người liên hệ.
  - **Tài liệu đính kèm**: Hiển thị danh sách file đính kèm.

```plaintext
--------------------------------------
| Tab: Thông tin chủ thẻ             |
| Mã khách hàng (*): [______________]|
| Tên khách hàng (*): [______________]|
| Ngày sinh (*):      [__/__/____]    |
| Giới tính (*):      [Dropdown ▼]    |
| Số CMND/CCCD (*):   [______________]|
| Ngày cấp (*):       [__/__/____]    |
| Nơi cấp (*):        [______________]|
| Địa chỉ (*):        [______________]|
| Địa chỉ liên hệ 2:  [______________]|
| Số điện thoại (*):  [______________]|
| Email (*):          [______________]|
--------------------------------------
| Tab: Thông tin công ty chủ thẻ     |
| Tên công ty:        [______________]|
| Địa chỉ:            [______________]|
| Số điện thoại:      [______________]|
| Số fax:             [______________]|
--------------------------------------
| Tab: Thông tin liên quan           |
```plaintext
+-------------------+-------------------+-------------------+-------------------+----------------+
| Họ tên            | Mối quan hệ      | Số điện thoại     | Chức vụ           | Thao tác       |
+-------------------+-------------------+-------------------+-------------------+----------------+
| Nguyễn Văn A      | Cha               | 0901234567        | Giám đốc          | [Sửa] [Xóa]    |
| Trần Thị B        | Mẹ                | 0909876543        | Nhân viên văn phòng| [Sửa] [Xóa]   |
| Lê Văn C          | Bạn bè            | 0912345678        |                   | [Sửa] [Xóa]    |
+-------------------+-------------------+-------------------+-------------------+----------------+
--------------------------------------
```
| Tab: Tài liệu đính kèm             |
| Tên file:           [______________]|
| Nội dung:           [______________]|
| Đường dẫn:          [______________]|
| [Upload] [Xóa]                       |
--------------------------------------
| [Lưu] [Thoát]                       |
--------------------------------------
```plaintext
--------------------------------------
| Tab: Thông tin khác liên quan đến thẻ tín dụng |
| Nghề nghiệp:        [______________]           |
| Chức vụ:            [______________]           |
| Học vấn:            [Dropdown ▼]               |
| Làm chủ:            [Dropdown ▼]               |
| Nơi công tác:       [______________]           |
| Tình trạng hôn nhân: [Dropdown ▼]              |
| Thu nhập chính:     [__________ VNĐ]           |
| Thu nhập khác:      [__________ VNĐ]           |
| Tổng thu nhập:      [__________ VNĐ]           |
| Các NH cấp thẻ TD:  [________________________] |
|                     [________________________] |
--------------------------------------
| [Lưu] [Thoát]                                 |
--------------------------------------
```
### **2. Đơn Mở Thẻ**

## **Mô tả**
Đơn mở thẻ là quy trình quản lý thông tin khách hàng và các yêu cầu phát hành thẻ tín dụng hoặc thẻ combo. Hệ thống hỗ trợ tạo mới, chỉnh sửa, và duyệt đơn mở thẻ với các thông tin chi tiết như thông tin chủ thẻ, hạn mức tín dụng, thông tin công ty chủ thẻ, và các thông tin liên quan khác được init những thông tin khai báo tại khách hàng.


---

## **Thông tin cấu hình**

### **Tab 1: Thông tin đơn mở thẻ**
| **Tên tham số**            | **Bắt buộc** | **Kiểu dữ liệu** | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------|---------------------------------------------------------------------------|
| Mã đơn mở thẻ (*)          | Có           | String           | Hệ thống tự động sinh mã định danh cho đơn mở thẻ. Người dùng không cần nhập tay. |
| Thẻ chính                  | Không        | Checkbox         | Chọn nếu đây là thẻ chính. Mặc định là thẻ chính. Nếu không chọn, hệ thống sẽ hiểu đây là thẻ phụ. |
| Đơn mở thẻ gốc             | Không        | Dropdown         | Chọn số đơn mở thẻ gốc nếu đây là thẻ phụ. Trường này chỉ hiển thị khi chọn thẻ phụ. |
| Tình trạng đơn mở thẻ       | Không        | Dropdown         | Tình trạng của đơn mở thẻ (Chờ duyệt, Đã duyệt, Thoái duyệt). Trường này chỉ đọc, không cho phép chỉnh sửa. |
| Chi nhánh                  | Không        | Dropdown         | Chi nhánh thực hiện mở thẻ. Trường này chỉ đọc sau khi thông tin được lưu. |
| Thẻ (*)                    | Có           | Dropdown         | Chọn loại thẻ (Tín dụng/Combo). Nếu là thẻ phụ, hệ thống mặc định là thẻ tín dụng và không cho phép chọn lại. |
| Đơn mở thẻ ghi nợ (*)      | Có           | Textbox          | Nhập mã đơn mở thẻ ghi nợ. Trường này bắt buộc nếu chọn loại thẻ là Combo. |
| Hạng thẻ (*)               | Có           | Dropdown         | Chọn hạng thẻ áp dụng. Đối với thẻ phụ, hạng thẻ phải nhỏ hơn hoặc bằng hạng thẻ chính. |
| Sản phẩm thẻ (*)           | Có           | Dropdown         | Chọn sản phẩm thẻ tương ứng với hạng thẻ đã chọn. |
| Thời hạn thẻ (*)           | Có           | Dropdown         | Nhập thời hạn mở thẻ (theo tháng). Ví dụ: 12 tháng, 24 tháng.|
| Tài khoản tiền gửi (*)     | Có           | Dropdown         | Chọn tài khoản tiền gửi liên kết với thẻ. Mỗi thẻ chính chỉ được liên kết với một tài khoản duy nhất. Thẻ phụ sẽ sử dụng cùng tài khoản với thẻ chính. |

---

### **Tab 2: Hạn mức chủ thẻ**
| **Tên tham số**            | **Bắt buộc** | **Kiểu dữ liệu** | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------|---------------------------------------------------------------------------|
| Tiền tệ (*)                | Có           | Dropdown         | Mặc định là VNĐ.                                                         |
| Ngày sao kê (*)               | Có           | Dropdown         | Hệ thống tự động hiển thị ngày sao kê theo mục cấu hình hệ thống (cho phép chọn lại ngày sao kê từng khách hàng)            |
| Hạn mức tín dụng tối đa (*)| Có           | Number           | Hạn mức thẻ tín dụng được cấp. Hệ thống tự động init theo hạn thẻ và cho phép thay đồi. Mức tiền thay đồi <= mức tín dụng tối đa của hạng thẻ |

---

### **Tab 3: Thông tin chủ thẻ**
 **Tên tham số**            | **Bắt buộc** | **Kiểu dữ liệu** | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------|---------------------------------------------------------------------------|
| Mã khách hàng (*)          | Có           | String           | Mã định danh khách hàng, lấy từ Core Banking.                            |
| Loại khách hàng (*)        | Có           | Dropdown         | Chọn loại khách hàng: Cá nhân, Doanh nghiệp.                             |
| Tên khách hàng (*)         | Có           | String           | Họ tên khách hàng.                                                       |
| Tên tiếng Anh              | Không        | String           | Tên khách hàng bằng tiếng Anh (nếu có).                                  |
| Tình trạng hôn nhân        | Không        | Dropdown         | Chọn: Độc thân, Đã kết hôn, Ly hôn.                                      |
| Ngày sinh (*)              | Có           | Date             | Ngày sinh của khách hàng.                                                |
| Nơi sinh (*)              | Không           | Date             | Nơi của khách hàng.                                                |
| Số CMND/CCCD (*)           | Có           | String           | Số CMND/CCCD của khách hàng.                                             |
| Ngày cấp (*)               | Có           | Date             | Ngày cấp CMND/CCCD.                                                      |
| Nơi cấp (*)                | Có           | String           | Nơi cấp CMND/CCCD.                                                       |
| Ngày hết hạn                | không           | String           | Ngày hết hạn                                                     |
| Địa chỉ (*)                | Có           | String           | Địa chỉ thường trú của khách hàng, lấy từ Symbols.                       |
| Mã tỉnh/thành phố               | không           | Dropdown           | Mã tỉnh thành                                                     |
| Tên quốc gia               | không           | Dropdown           | Tên quốc gia                                                    |
| Địa chỉ liên hệ 2          | Không        | String           | Địa chỉ liên hệ bổ sung (nếu có).                                         |
| Số điện thoại (*)          | Có           | String           | Số điện thoại liên hệ, lấy từ Core Banking.                              |
| Email (*)                  | Có           | String           | Email liên hệ, lấy từ Core Banking.                                      |
| Số di động (*)                  | Có           | String           | Số di động.                                      |
| Số fax                   | Không           | String           | Số fax                                      |
| Giới tính (*)              | Có           | Dropdown         | Chọn giới tính: Nam/Nữ.                                                  |
| Địa chỉ thông báo          | Không        | String           | Địa chỉ nhận thông báo.                                  |                                           |

---

### **Tab 4: Thông tin công ty chủ thẻ**
| **Tên tham số**            | **Bắt buộc** | **Kiểu dữ liệu** | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------|---------------------------------------------------------------------------|
| Tên công ty                | Không        | String           | Tên công ty chủ thẻ.                                                     |
| Địa chỉ                    | Không        | String           | Địa chỉ công ty.                                                         |
| Số điện thoại              | Không        | String           | Số điện thoại công ty.                                                   |
| Số fax                     | Không        | String           | Số fax công ty.                                                          |
| Số hợp đồng chi lương      | Không        | String           | Số hợp đồng chi lương của công ty.                                       |
| Ngày ký hợp đồng chi lương | Không        | Date             | Ngày ký hợp đồng chi lương.                                              |
| Mã Client của đơn vị chi lương | Không    | String           | Mã định danh đơn vị chi lương.                                                      |

---

### **Tab 5: Thông tin liên quan**
| **Tên tham số**            | **Bắt buộc** | **Kiểu dữ liệu** | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------|---------------------------------------------------------------------------|
| Tên người liên hệ (*)      | Có           | String           | Họ tên người liên hệ.                                                    |
| Mối quan hệ (*)            | Có           | Dropdown         | Mối quan hệ với chủ thẻ (Cha/Mẹ, Vợ/Chồng, Bạn bè, Khác).                 |
| Số điện thoại (*)          | Có           | String           | Số điện thoại của người liên hệ.                                         |
| Số CCCD                   | Không        | String           | Số căn cước công dân của người liên hệ.                                  |
| Chức vụ                   | Không        | String           | Chức vụ của người liên hệ.                                               |
| Giới tính                 | Không        | Dropdown         | Giới tính của người liên hệ (Nam/Nữ).                                    |
| Ngày sinh                 | Không        | Date             | Ngày sinh của người liên hệ.                                             |
| Địa chỉ                   | Không        | String           | Địa chỉ của người liên hệ.                                               |
| Số fax                    | Không        | String           | Số fax của người liên hệ.                                                |
| Tên công ty               | Không        | String           | Tên công ty của người liên hệ.                                           |                                             |

---

### **Tab 6: Thông tin khác liên quan đến thẻ tín dụng**
| **Tên tham số**            | **Bắt buộc** | **Kiểu dữ liệu** | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------|---------------------------------------------------------------------------|
| Nghề nghiệp                | Không        | String           | Nghề nghiệp của khách hàng (ví dụ: Nhân viên văn phòng, Kinh doanh).      |
| Chức vụ                    | Không        | String           | Chức vụ của khách hàng (ví dụ: Trưởng phòng, Giám đốc).                  |
| Học vấn                    | Không        | Dropdown         | Trình độ học vấn (ví dụ: Trung cấp, Cao đẳng, Đại học, Sau đại học).      |
| Làm chủ                    | Không        | Dropdown         | Khách hàng có phải là chủ doanh nghiệp không (Có/Không).                 |
| Nơi công tác               | Không        | String           | Tên công ty hoặc tổ chức nơi khách hàng đang làm việc.                   |
| Thu nhập chính             | Không        | Number           | Thu nhập chính của khách hàng (VNĐ).                                     |
| Thu nhập khác              | Không        | Number           | Thu nhập bổ sung của khách hàng (VNĐ).                                   |
| Tổng thu nhập              | Không        | Number           | Tổng thu nhập của khách hàng (VNĐ).                                      |
| Các ngân hàng hiện đang cấp thẻ tín dụng | Không | Textarea | Danh sách các ngân hàng hiện đang cấp thẻ tín dụng cho khách hàng.       |
---

**Quy tắc**

**1. Thẻ chính và thẻ phụ**
- Nếu chọn "Thẻ chính", không cần chọn "Đơn mở thẻ gốc".
- Nếu chọn "Thẻ phụ", bắt buộc phải chọn "Đơn mở thẻ gốc" (đơn mở thẻ chính).
- Đối với thẻ phụ:
  - **Sản phẩm thẻ**, **Thời hạn hiệu lực**, và **Hạn mức tín dụng tối đa** sẽ được tự động lấy từ thông tin của đơn mở thẻ chính.
  - **Hạng thẻ** của thẻ phụ phải nhỏ hơn hoặc bằng **Hạng thẻ** của thẻ chính.

---

**2. Hạn mức tín dụng**
- Hạn mức tín dụng tối đa của thẻ không được vượt quá giá trị cấu hình cho hạng thẻ đã chọn.
- Hệ thống tự động kiểm tra và hiển thị thông báo nếu hạn mức vượt quá giới hạn.

---

**3. Tự động sinh mã đơn mở thẻ**
- Hệ thống tự động sinh mã đơn mở thẻ theo nguyên tắc riêng, đảm bảo tính duy nhất.
- Người dùng không được phép nhập tay mã đơn mở thẻ.

---

**4. Khởi tạo dữ liệu khi thêm mới đơn mở thẻ**
- Khi tạo mới đơn mở thẻ, hệ thống sẽ tự động lấy thông tin khách hàng từ Core Banking (Symbols) để gán vào đơn mở thẻ, bao gồm:
  - **Thông tin cá nhân**: Họ tên, ngày sinh, số CMND/CCCD, địa chỉ, số điện thoại...
  - **Thông tin tài chính**: Hạn mức tín dụng, nhóm nợ hiện tại...
  - **Thông tin liên hệ**: Người liên hệ, mối quan hệ, số điện thoại...
  - **Tài liệu đính kèm**: ....

**5. Tạo đơn mở thẻ: Thẻ combo**
*  Màn hình đơn mở thẻ Thẻ Ghi nợ cũ:
    *  Tạo đơn mở thẻ và chọn loại thẻ là **Combo**.
    *  Không gán đơn mở thẻ vào lô ngay lập tức.
    *  Thực hiện duyệt từng đơn mở thẻ riêng lẻ: Đơn mở thẻ ghi nợ được duyệt trước.
* Màn hình đơn mở thẻ tín dụng mới:
    * Tạo đơn mở thẻ và chọn loại thẻ là **Combo**.
    * Nhập số đơn mở thẻ ghi nợ liên quan vào trường "Đơn mở thẻ ghi nợ".
* Màn hình Duyệt lô đơn mở thẻ tín dụng **Combo**.
    * Kiểm tra đơn mở thẻ ghi nợ phải duyệt trước
    * Thực hiện duyệt lô tín dụng combo.
    
---

## **Hành động**
- **Thêm**: Thêm mới đơn mở thẻ. Thêm mới thành công đơn mở thẻ cập nhật trạng thái chờ quyệt.
- **Sửa**: Chỉnh sửa thông tin đơn mở thẻ hiện tại. Cập nhật thành công đơn mở thẻ cập nhật trạng thái chờ quyệt.
    - Không được phép sửa đơn mở thẻ trong quá trình phát hành thẻ. 
- **Xóa**: Xóa đơn mở thẻ không còn áp dụng.
- **Thoái Duyệt**: Khi đơn mở thẻ ở trạng thái đã duyệt thì chuyển sang trạng thái thoái duyệt thực hiện chỉnh sửa thông tin. Đơn mở thẻ đang trong quá trình phát hành thẻ không cho phép thoái duyệt chỉnh sửa thông tin. Sao khi sửa thông tin đơn mở thẻ hệ thống sẽ hiển thị thông báo có hồ sơ đơn mở thẻ cần duyệt. Thông tin hồ sơ đơn mở thẻ chuyển tới kiểm soát viên chờ duyệt.


---

## **Giao diện**

### **Form thêm/sửa đơn mở thẻ**
- Hiển thị dạng modal với các tab:
  - **Thông tin đơn mở thẻ**: Hiển thị thông tin cơ bản về đơn mở thẻ.
  - **Hạn mức chủ thẻ**: Hiển thị thông tin hạn mức tín dụng.
  - **Thông tin chủ thẻ**: Hiển thị thông tin cá nhân của khách hàng.
  - **Thông tin công ty chủ thẻ**: Hiển thị thông tin công ty (nếu có).
  - **Thông tin liên quan**: Hiển thị thông tin người liên hệ.
  - **Thông tin khác liên quan đến thẻ tín dụng**
  

```plaintext
--------------------------------------
| Tab: Thông tin đơn mở thẻ          |
| Thẻ chính:        [ ]              |
| Đơn mở thẻ gốc (*): [Dropdown ▼]   |
| Mã đơn mở thẻ (*): [______________]|
| Tình trạng đơn (*): [Dropdown ▼]   |
| Chi nhánh (*):     [Dropdown ▼]    |
| Loại yêu cầu (*):  [Dropdown ▼]    |
| Sản phẩm thẻ (*):  [Dropdown ▼]    |
--------------------------------------
| Tab: Hạn mức chủ thẻ               | (mp: Phần này đề nghị đổi thành thông tin thẻ)
| Tiền tệ (*):       [Dropdown ▼]    |
| Hạng thẻ (*):      [Dropdown ▼]    |
| Hạn mức tín dụng (*): [__________] |
| Ngày sao kê (*):   [__________]    |
--------------------------------------
| Tab: Thông tin chủ thẻ             |
| Mã khách hàng (*): [______________]|
| Tên khách hàng (*): [______________]|
| Ngày sinh (*):      [__/__/____]    |
| Số CMND/CCCD (*):   [______________]|
--------------------------------------
| Tab: Thông tin công ty chủ thẻ     |
| Tên công ty:        [______________]|
| Địa chỉ:            [______________]|
| Số điện thoại:      [______________]|
--------------------------------------
| Tab: Thông tin liên quan           |
| Họ tên (*):         [______________]|
| Mối quan hệ (*):    [Dropdown ▼]    |
| Số điện thoại (*):  [______________]|
--------------------------------------
| Tab: Lịch sử duyệt hồ sơ           |
| Người tạo dữ liệu:  [______________]|
| Ngày giờ cập nhật:  [__/__/____]    |
| Lý do thoái duyệt:  [______________]|
--------------------------------------
| [Lưu] [Duyệt] [Thoát]              |
--------------------------------------
```
### **3. Tạo Lô Yêu Cầu**

**Mô tả**
Màn hình **Tạo Lô Yêu Cầu** cho phép người dùng tạo mới một lô yêu cầu phát hành thẻ tín dụng hoặc thẻ combo. Mỗi lô yêu cầu sẽ được quản lý theo các thông tin như mã lô, loại lô, chi nhánh thực hiện, và tình trạng lô. Người dùng có thể chọn các đơn mở thẻ gán vào lô.

---

**Thực hiện gán đơn mở thẻ vào lô**
1. **Tạo lô mở mới**:
   - Người dùng thêm các đơn mở thẻ mới chưa được gán vào lô.
   - Hệ thống hiển thị danh sách các đơn mở thẻ mới thuộc cùng chi nhánh.
   - Cung cấp bộ lọc để tìm kiếm đơn mở thẻ theo:
     - Mã khách hàng.
     - Mã đơn mở thẻ.
     - CCCD/CMND.
   - Người dùng chọn các đơn mở thẻ cần thêm vào lô.

2. **Tạo lô cấp lại thẻ**:
   - Người dùng thêm các đơn mở thẻ để cấp lại thẻ.
   - Hệ thống hiển thị danh sách tất cả các thẻ đang hoạt động và còn hiệu lực.
   - Cung cấp bộ lọc để tìm kiếm thẻ theo:
     - Mã khách hàng.
     - Mã đơn mở thẻ.
     - CCCD/CMND.
   - Người dùng chọn các thẻ cần cấp lại và nhập lý do cấp lại cho từng thẻ.

3. **Tạo lô thay thế thẻ**:
   - Người dùng thêm các đơn mở thẻ để thay thế thẻ.
   - Hệ thống hiển thị danh sách tất cả các thẻ đang hoạt động và còn hiệu lực.
   - Cung cấp bộ lọc để tìm kiếm thẻ theo:
     - Mã khách hàng.
     - Mã đơn mở thẻ.
     - CCCD/CMND.
   - Người dùng chọn các thẻ cần thay thế và nhập lý do thay thế cho từng thẻ.

4. **Tạo lô gia hạn thẻ**:
   - Người dùng thêm các đơn mở thẻ để gia hạn thẻ.
   - Hệ thống hiển thị danh sách tất cả các thẻ đang hoạt động và còn hiệu lực.
   - Cung cấp bộ lọc để tìm kiếm thẻ theo:
     - Mã khách hàng.
     - Mã đơn mở thẻ.
     - CCCD/CMND.
   - Người dùng chọn các thẻ cần gia hạn và nhập lý do gia hạn cho từng thẻ.

---

## **Thông tin cấu hình**
| **Tên tham số**            | **Bắt buộc** | **Kiểu dữ liệu** | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------|---------------------------------------------------------------------------|
| Mã lô                      | Có           | String           | Hệ thống tự động sinh mã lô theo quy tắc: `[Ngày tháng] + [Mã chi nhánh] + [Mã loại lô]`. |
| Tên lô                     | Có           | String           | Tên lô do người dùng nhập. Độ dài tối đa 100 ký tự.                       |
| Loại lô                    | Có           | Dropdown         | Chọn loại lô: Mở mới, Cấp lại, Thay thế, Gia hạn.                         |
| Thẻ                   | Có           | Dropdown         | Chọn  Tín dụng, Combo.                                           |
| Tên chi nhánh              | Có           | Dropdown         | Chọn chi nhánh SAIGONBANK thực hiện yêu cầu.                              |
| Tình trạng                 | Có           | Dropdown         | Tình trạng lô: mới, Xét duyệt hồ sơ lô, Phủ quyết lô yêu cầu, Xét duyệt lô yêu cầu, Kết xuất dữ liệu thẻ, Giao thẻ cho chi nhánh,Giao thẻ cho chủ thẻ, Đóng. |
| Trạng thái lô                 | Có           | Dropdown         | Trạng thái lô: Chờ duyệt hồ sơ lô, Đã duyệt hồ sơ lô, Từ chối duyệt hồ sơ lô, Đã phủ quyết,Từ chối phủ quyết, Đã Xét duyệt lô yêu cầu,Từ chối xét duyệt lô yêu cầu.|
| Danh sách đơn mở thẻ   | Có           | String         | Nút thêm đơn mở thẻ: Danh sách đơn mở thẻ có trong hệ thống
|
---

## **Quy tắc**
1. **Mã lô**:
   - Hệ thống tự động sinh mã lô, người dùng không được phép nhập tay.
   - Quy tắc sinh mã: `[Ngày tháng] + [Mã chi nhánh] + (Mã lô Tăng dần) `.

2. **Loại lô**:
   - Người dùng phải chọn loại lô phù hợp với yêu cầu (Mở mới, Cấp lại, Thay thế, Gia hạn).

3. **Loại thẻ**:
   - Nếu chọn loại thẻ là **Combo**, hệ thống yêu cầu nhập thông tin liên quan đến đơn mở thẻ ghi nợ.

4. **Danh sách đơn mở thẻ**:
   - Chỉ hiển thị các đơn mở thẻ tín dụng/combo chưa được gán vào lô.
   - Người dùng có thể tick chọn các đơn mở thẻ để đưa vào lô.

5. **Tình trạng lô**:
   - Mặc định là "Mới" khi tạo lô.
   - Tình trạng sẽ thay đổi tự động dựa trên tiến trình xử lý (mới, Xét duyệt hồ sơ lô, Phủ quyết lô yêu cầu, Xét duyệt lô yêu cầu, Kết xuất dữ liệu thẻ, Giao thẻ cho chi nhánh,Giao thẻ cho chủ thẻ, Đóng).
---

## **Hành động**
- **Lưu**: Lưu thông tin lô yêu cầu và gán các đơn mở thẻ đã chọn vào lô. Lưu thành công hệ thống sẽ thực hiện thông báo có hồ sơ lô cần duyệt. Thông tin lô được đưa qua kiểm soát viên chờ duyệt hồ sơ.
- **Thoát**: Thoát khỏi màn hình tạo lô mà không lưu thông tin.

---

## **Giao diện**

### **Form Tạo Lô Yêu Cầu**
- Hiển thị dạng modal với các trường nhập liệu:
  - **Mã lô**: Hiển thị mã lô tự động sinh.
  - **Tên lô**: Textbox để nhập tên lô.
  - **Loại lô**: Dropdown để chọn loại lô.
  - **Loại thẻ**: Dropdown để chọn loại thẻ.
  - **Tên chi nhánh**: Dropdown để chọn chi nhánh thực hiện.
  - **Tình trạng**:  mặc định là "Mới". Không cho chọn.

```plaintext
--------------------------------------
| Mã lô:           [Tự động tạo]     |
| Tên lô:          [______________]  |
| Loại lô:         [Dropdown ▼]      |
| Thẻ:        [Dropdown ▼]      |
| Tên chi nhánh:   [Dropdown ▼]      |
| Tình trạng:      [Dropdown ▼]      |
| Danh sách đơn mở thẻ|
|[ 0001 ]: Tín dụng/combo | (MP: Phần này các thẻ chung 1 loại, không có mix)
|[ 0002 ]: Ghi nợ/Combo |
|[ 0003 ]: Tín dụng |
--------------------------------------
| [Lưu] [Thoát]                       |
--------------------------------------
```
### **4. Màn hình Duyệt Hồ Sơ Lô Mở Thẻ**

**Mô tả**
Màn hình **Duyệt Hồ Sơ Lô Mở Thẻ** được thiết kế để kiểm soát viên (KSV)  thực hiện các thao tác liên quan đến duyệt hoặc từ chối các lô mở thẻ. Màn hình hiển thị danh sách các lô yêu cầu duyệt, thông tin chi tiết về khách hàng và các đơn mở thẻ trong lô. Tất cả các lô: Mở mới, cấp lại thẻ, Gia hạn thẻ, thay thế thẻ điều qua bước Duyệt hồ sơ lô.

- **Kiểm soát viên (KSV)**:
* Hiển thị những lô chờ duyệt. Có quyền duyệt hoặc từ chối lô mở thẻ. 
* Hiển thị những lô bị phủ quyết và lý do bị phủ quyết: có quyền duyệt lại hoặc từ chối
  * Khi duyệt thành công:
    * Hệ thống sẽ gửi email xác nhận đến khách hàng. 
  * Từ chối duyệt: Nhập lý do từ chối
- **Giao dịch viên (GDV)**: Hiển thị tất cả các lô có trong hệ thống, xem trạng thái hồ sơ lô, lý do bị từ chối. 
  * Lô trạng thái Từ chối Duyệt: Sau khi chỉnh sửa thông tin GDV thực hiện chuyển sang chờ duyệt. Hệ thống sẽ gởi thông báo đến giao dịch viên có Hồ sơ lô đang chờ duyệt, Hồ sơ sẽ chuyển đến KSV.
  * Lô trạng thái Duyệt: Hiển thị Nút Báo cáo (xuất mẫu báo cáo BM01), Button Xuất file. 

---

**Chức năng chính**
1. **Duyệt lô**:
   - KSV kiểm tra thông tin lô và các đơn mở thẻ trong lô.
   - Nhấn nút **Duyệt** để phê duyệt lô. Hệ thống sẽ gửi email xác nhận đến khách hàng.
   
2. **Từ chối lô**:
   - KSV nhấn nút **Từ chối** và nhập lý do từ chối.
   - Lô bị trả về trạng thái "Bị từ chối". GDV có thể xem lý do và chỉnh sửa trước khi gửi lại.

3. **Xem chi tiết lô**:
   - Hiển thị danh sách khách hàng trong lô. Xem chi tiết từng thông tin khách hàng trong lô.
   - Khi chọn một khách hàng, hiển thị danh sách các đơn mở thẻ liên quan. Xem chi tiết thông tin từng đơn mở thẻ trong lô.

4. **Lọc dữ liệu**:
   - Hỗ trợ lọc danh sách lô theo: Mã lô,  trạng thái (Đang Mở, Chờ duyệt, Đã duyệt, Bị từ chối).
5. **Báo cáo**:
   - Button hiển thị.
---

## **Thông tin cấu hình**
| **Tên tham số**            | **Bắt buộc** | **Kiểu dữ liệu** | **Mô tả**                                                                 |
|-----------------------------|--------------|------------------|---------------------------------------------------------------------------|
| Mã lô                      | Có           | String           | Mã định danh của lô mở thẻ.                                               |
| Tên lô                     | Có           | String           | Tên lô mở thẻ.                                                            |
| Tên chi nhánh              | Có           | String           | Tên chi nhánh thực hiện yêu cầu mở thẻ.                                   |
| Số đơn mở thẻ              | Có           | Number           | Tổng số đơn mở thẻ trong lô.                                              |
| Đơn mở thẻ chưa duyệt      | Có           | Number           | Số lượng đơn mở thẻ chưa được duyệt trong lô.                             |
| Tình trạng lô              | Có           | Dropdown         | Tình trạng của lô (Mới, Chờ duyệt, Đã duyệt, Bị từ chối).                 |
| Lý do từ chối              | Không        | String           | Lý do từ chối duyệt lô (nếu có).                                          |

---

## **Quy tắc**
1. **Phân quyền**:
   - **KSV**: Có quyền duyệt hoặc từ chối lô.
   - **GDV**: Chỉ được phép xem trạng thái và lý do từ chối. Thực hiện chuyển lô sang chờ Duyệt.

2. **Duyệt lô**:
   - Khi KSV nhấn **Duyệt**, hệ thống sẽ kiểm tra tất cả các đơn mở thẻ trong lô.
   - Nếu tất cả đơn hợp lệ, lô sẽ chuyển sang trạng thái "Đã duyệt" và hệ thống gửi email xác nhận đến khách hàng. (MP: hệ thống kiểm tra ra sao ?)
3. **Từ chối lô**:
   - Khi KSV nhấn **Từ chối**, phải nhập lý do từ chối.
   - Lô sẽ chuyển sang trạng thái "Bị từ chối". GDV có thể chỉnh sửa và gửi lại lô.

4. **Hiển thị danh sách**:
   - Khi chọn một lô, hiển thị danh sách khách hàng trong lô. Cho  xem thông tin chi tiết của từng khách hàng trong lô.
   - Khi chọn một khách hàng, hiển thị danh sách các đơn mở thẻ liên quan. Cho phép xem thông tin chi tiết từng đơn mở thẻ trong lô.

---

## **Hành động**
- **Duyệt**: KSV  tại chi nhánh Phê duyệt lô mở thẻ. 
- **Từ chối**: KSV  tại chi nhánh Từ chối lô mở thẻ và nhập lý do.
- **Chờ Duyệt**: GDV chuyển lô qua trạng thái chờ duyệt khi điền đầy đủ thông tin khách hàng/ đơn mở thẻ
- **Xem chi tiết**: Hiển thị thông tin chi tiết về khách hàng và các đơn mở thẻ trong lô.
- **Lọc dữ liệu**: Lọc danh sách lô theo trạng thái.

---

## **Giao diện**

### **Danh sách lô yêu cầu duyệt - Dành cho KSV**
- Hiển thị danh sách các lô yêu cầu duyệt (trạng thái chờ duyệt) với các thông tin:
  - Mã lô, Tên lô, Tên chi nhánh, Số đơn mở thẻ, Đơn mở thẻ chưa duyệt, Tình trạng lô.
- Các nút hành động:
  - **Duyệt**: Dành cho KSV.
  - **Từ chối**: Dành cho KSV.
  - **Chờ duyệt**: Dành cho GDV.
  - **Chọn vào lô**: Hiển thị danh sách khách hàng, Xem chi tiết thông tin khách hàng, Chọn vào khách hàng xem danh sách đơn mở thẻ chi tiết từng đơn mở thẻ

### **Trạng thái danh sách Hồ sơ lô - GDV **
- Hiển thị danh sách các lô yêu cầu lọc theo: Lô, trạng thái: Chờ duyệt, Thoái duyệt, duyệt.
- Các trạng thái của Lô
  - **Duyệt**: Hiển thị button Báo cáo, Xuất file
  - **Từ chối**: Hiển thị Button Chờ duyệt khi sửa thông tin và sẵn sàng Duyệt. Khi Nhấn Button chờ Duyệt hệ thống sẽ thực hiện thông báo đến KSV, đẩy hồ sơ đến KSV.
  - **Chờ duyệt**
  - **Chọn vào lô**: Hiển thị danh sách khách hàng, Xem chi tiết thông tin khách hàng, Chọn vào khách hàng xem danh sách đơn mở thẻ chi tiết từng đơn mở thẻ

### **5. Màn hình Duyệt Hồ Sơ Khách Hàng**

**Mô tả**
Màn hình **Duyệt Hồ Sơ Khách Hàng** được thiết kế để kiểm soát viên (KSV) thực hiện các thao tác duyệt hoặc từ chối các thay đổi thông tin hồ sơ khách hàng. Màn hình hiển thị danh sách khách hàng cần duyệt, thông tin chi tiết về khách hàng, giao dịch viên (GDV) xem thông tin những khách hàng có được duyệt hay từ chối duyệt, lý do từ chối.

- **Kiểm soát viên (KSV)**: Có quyền duyệt hoặc từ chối các thay đổi thông tin khách hàng. Khi duyệt thành công, hệ thống cập nhật thông tin mới vào hồ sơ khách hàng.
- **Giao dịch viên (GDV)**: Chỉ được phép xem trạng thái hồ sơ khách hàng và lý do bị từ chối. Sau khi chỉnh sửa, GDV có thể gửi lại hồ sơ để duyệt.

---
## **Chức năng chính**
1. **Duyệt hồ sơ khách hàng**:
   - KSV kiểm tra thông tin thay đổi của khách hàng.
   - Nhấn nút **Duyệt** để phê duyệt thay đổi. Hệ thống cập nhật thông tin mới vào hồ sơ khách hàng.

2. **Từ chối hồ sơ khách hàng**:
   - KSV nhấn nút **Từ chối** và nhập lý do từ chối.
   - Hồ sơ bị trả về trạng thái "Bị từ chối". GDV có thể xem lý do và chỉnh sửa trước khi gửi lại.

3. **Xem chi tiết khách hàng**:
   - Hiển thị thông tin chi tiết của khách hàng, bao gồm các thay đổi đã thực hiện.

4. **Lọc dữ liệu**:
   - Hỗ trợ lọc danh sách khách hàng theo: Mã khách hàng, CCCD, Tên khách hàng,số điện thoại, trạng thái (Chờ duyệt, Đã duyệt, Bị từ chối).

---

## **Quy tắc**
1. **Phân quyền**:
   - **KSV**: Có quyền duyệt hoặc từ chối các thay đổi thông tin khách hàng.
   - **GDV**: Chỉ được phép xem trạng thái và lý do từ chối. Thực hiện chỉnh sửa và gửi lại hồ sơ.

2. **Duyệt hồ sơ**:
   - Khi:
     - Nếu lô ở trạng thái "Đóng" và thẻ đang hoạt động, hệ thống cho phép duyệt các thay đổi thông tin cá nhân (không ảnh hưởng đến trạng thái thẻ).
     - Nếu khách hàng đang trong quá trình phát hành thẻ, không cho phép chỉnh sửa hoặc duyệt thông tin.

3. **Từ chối hồ sơ**:
   - Khi KSV nhấn **Từ chối**, phải nhập lý do từ chối.
   - Hồ sơ sẽ chuyển sang trạng thái "Bị từ chối". GDV có thể chỉnh sửa và gửi lại hồ sơ.

4. **Hiển thị danh sách**:
   - Khi chọn một khách hàng, hiển thị thông tin chi tiết về Thông tin khách hàng

---

## **Hành động**
- **Duyệt**: KSV phê duyệt các thay đổi thông tin khách hàng.
- **Từ chối**: KSV từ chối các thay đổi thông tin khách hàng và nhập lý do.
- **Chờ duyệt**: GDV gửi lại hồ sơ sau khi chỉnh sửa.
- **Xem chi tiết**: Hiển thị thông tin chi tiết về khách hàng và các thay đổi đã thực hiện.
- **Lọc dữ liệu**: Mã khách hàng, CCCD, Tên khách hàng,số điện thoại, trạng thái (Chờ duyệt, Đã duyệt, Bị từ chối).

---

**Giao diện**

**Danh sách khách hàng cần duyệt - KSV**
- Hiển thị danh sách các khách hàng cần duyệt (Trạng thái chờ duyệt) 
- Các nút hành động:
  - **Duyệt**: Dành cho KSV.
  - **Từ chối**: Dành cho KSV.
  - **Chờ duyệt**: Dành cho GDV.
  - **Xem chi tiết**: Hiển thị thông tin chi tiết về khách hàng.

**Danh sách khách hàng cần duyệt - GDV**
- Hiển thị danh sách các khách hàng theo điều kiện lọc
- Xem các thông tin khách hàng theo các trạng thái và lý do từ chối duyệt:
  - **Xem chi tiết**: Hiển thị thông tin chi tiết về khách hàng.

### **6. Màn hình Duyệt Hồ Sơ đơn mở thẻ**

**Mô tả**
Màn hình **Duyệt Hồ Sơ Đơn mở thẻ** được thiết kế để kiểm soát viên (KSV) thực hiện các thao tác duyệt hoặc từ chối các thay đổi thông tin hồ sơ đơn mở thẻ. Màn hình hiển thị danh sách đơn mở thẻ cần duyệt, thông tin chi tiết về đơn mở thẻ, giao dịch viên (GDV) xem thông tin những đơm mở thẻ có được duyệt hay từ chối duyệt, lý do từ chối.

- **Kiểm soát viên (KSV)**: Có quyền duyệt hoặc từ chối các thay đổi thông tin đơn mở thẻ. Khi duyệt thành công, hệ thống cập nhật thông tin mới vào hồ sơ đơn mở thẻ.
- **Giao dịch viên (GDV)**: Chỉ được phép xem trạng thái hồ sơ đơn mở thẻ và lý do bị từ chối. Sau khi chỉnh sửa, GDV có thể gửi lại hồ sơ để duyệt.

---
## **Chức năng chính**
1. **Duyệt hồ sơ đơn mở thẻ**:
   - KSV kiểm tra thông tin thay đổi của đơn mở thẻ.
   - Nhấn nút **Duyệt** để phê duyệt thay đổi. Hệ thống cập nhật thông tin mới vào hồ sơ đơn mở thẻ.

2. **Từ chối hồ sơ đơn mở thẻ**:
   - KSV nhấn nút **Từ chối** và nhập lý do từ chối.
   - Hồ sơ bị trả về trạng thái "Bị từ chối". GDV có thể xem lý do và chỉnh sửa trước khi gửi lại.

3. **Xem chi tiết đơn mở thẻ**:
   - Hiển thị thông tin chi tiết của đơn mở thẻ, bao gồm các thay đổi đã thực hiện.

4. **Lọc dữ liệu**:
   - Hỗ trợ lọc danh sách đơn mở thẻ theo: Mã đơn mở thẻ, CCCD, Tên khách hàng,số điện thoại, trạng thái (Chờ duyệt, Đã duyệt, Bị từ chối).

---

## **Quy tắc**
1. **Phân quyền**:
   - **KSV**: Có quyền duyệt hoặc từ chối các thay đổi thông tin đơn mở thẻ.
   - **GDV**: Chỉ được phép xem trạng thái và lý do từ chối. Thực hiện chỉnh sửa và gửi lại hồ sơ.

2. **Duyệt hồ sơ**:
   - Khi:
     - Nếu lô ở trạng thái "Đóng" và thẻ đang hoạt động, hệ thống cho phép duyệt các thay đổi thông tin cá nhân (không ảnh hưởng đến trạng thái thẻ).
     - Nếu đơn mở thẻ trong quá trình phát hành thẻ, không cho phép chỉnh sửa hoặc duyệt thông tin đơn mở thẻ.

3. **Từ chối hồ sơ**:
   - Khi KSV nhấn **Từ chối**, phải nhập lý do từ chối.
   - Hồ sơ sẽ chuyển sang trạng thái "Bị từ chối". GDV có thể chỉnh sửa và gửi lại hồ sơ.

4. **Hiển thị danh sách**:
   - Khi chọn một đơn mở thẻ, hiển thị thông tin chi tiết về Thông tin đơn mở thẻ

---

## **Hành động**
- **Duyệt**: KSV phê duyệt các thay đổi thông tin đơn mở thẻ.
- **Từ chối**: KSV từ chối các thay đổi thông tin đơn mở thẻ và nhập lý do.
- **Chờ duyệt**: GDV gửi lại hồ sơ sau khi chỉnh sửa.
- **Xem chi tiết**: Hiển thị thông tin chi tiết về đơn mở thẻ và các thay đổi đã thực hiện.
- **Lọc dữ liệu**: Mã đơn mở thẻ, Mã khách hàng, CCCD, Tên khách hàng,số điện thoại, trạng thái (Chờ duyệt, Đã duyệt, Bị từ chối).

---

**Giao diện**

**Danh sách đơn mở thẻ cần duyệt - KSV**
- Hiển thị danh sách các đơn mở thẻ cần duyệt (Trạng thái chờ duyệt) 
- Các nút hành động:
  - **Duyệt**: Dành cho KSV.
  - **Từ chối**: Dành cho KSV.
  - **Chờ duyệt**: Dành cho GDV.
  - **Xem chi tiết**: Hiển thị thông tin chi tiết về đơn mở thẻ.

**Danh sách Đơn mở thẻ cần duyệt - GDV**
- Hiển thị danh sách các đơn mở thẻ theo điều kiện lọc
- Xem các thông tin đơn mở thẻ theo các trạng thái và lý do từ chối duyệt:
  - **Xem chi tiết**: Hiển thị thông tin chi tiết về đơn mở thẻ.
  
### **7. Màn hình Phủ Quyết Hạn Mức Tín Dụng**

**Mô tả**
Màn hình **Phủ Quyết Hạn Mức Tín Dụng** được thiết kế để Trung tâm Kiểm Duyệt Thẻ (TTKDT) thực hiện các thao tác duyệt hoặc phủ quyết các hạn mức tín dụng của khách hàng. Màn hình hiển thị danh sách Hồ sơ lô, thông tin chi tiết về khách hàng, thông tin đơn mở thẻ và các hạn mức tín dụng.

- **TTKDT**: Có quyền duyệt hoặc phủ quyết tín dụng. Khi duyệt thành công, chuyển sang bước Xét Duyệt lô Yêu cầu. Nếu phủ quyết, TTKDT phải nhập lý do phủ quyết và trả hồ sơ lô về bước màn hình Duyệt Hồ sơ Lô.

---

## **Chức năng chính**
1. **Duyệt hạn mức tín dụng**:
   - TTKDT kiểm tra thông tin.
   - Nhấn nút **Duyệt** để phê duyệt. 

2. **Phủ quyết hạn mức tín dụng**:
   - TTKDT nhấn nút **Phủ quyết** và nhập lý do phủ quyết.
   - Hồ sơ lô bị trả về bước xét duyệt hồ sơ lô, trạng thái "Bị phủ quyết". 

3. **Xem chi tiết khách hàng**:
   - Hiển thị thông tin chi tiết của khách hàng, Xem chi tiết thông tin đơn mở thẻ.

4. **Lọc dữ liệu**:
   - Hỗ trợ lọc danh sách yêu cầu theo: Mã lô.

---

## **Quy tắc**
1. **Phủ quyết yêu cầu**:
   - Khi TTKDT nhấn **Phủ quyết**, phải nhập lý do phủ quyết.
   - Hồ sơ lô trả về bước Xét duyệt hồ sơ lô, trạng thái "Bị phủ quyết".

2. **Hiển thị danh sách**:
   - Khi chọn một yêu cầu, hiển thị thông danh sách khách hàng có trong lô có thể xem chi tiết từng khách hàng, Chọn 1 khách hàng danh sách đơn mở thẻ và có thể xem chi tiết từng đơn mở thẻ.
   - Hiển thị danh sách hồ sơ lô đã được duyệt, Danh sách hồ sơ lô bị hủy lô, lý do hỷ lô từ màn hình xét duyệt lô yêu cầu.

---

**Hành động**
- **Duyệt**: TTKDT phê duyệt yêu cầu chuyển sang bước xét duyệt lô yêu cầu.
- **Phủ quyết**: TTKDT từ chối và nhập lý do.
- **Xem chi tiết**: Hiển thị thông tin chi tiết về khách hàng, chi tiết đơn mở thẻ
- **Lọc dữ liệu**: Lọc Mã lô

---

**Giao diện**

**Danh sách yêu phủ quyết hạn mức tín dụng**


### **8. Màn hình Xét Duyệt Lô Yêu Cầu**

## **Mô tả**
Màn hình **Xét Duyệt Lô Yêu Cầu** được thiết kế để kiểm soát viên (KSV) thực hiện các thao tác duyệt, thoái lô hoặc hủy lô yêu cầu từ chi nhánh. Chức năng chính màn hình này sinh ra thông tin thẻ.

- **Kiểm soát viên (KSV)**:
  - Nhập mã thẻ số đẹp nếu đơn mở thẻ chọn sản phẩm là thẻ đẹp.
  - Có quyền duyệt lô hoặc hủy lô.
  - Khi duyệt thành công, hệ thống sẽ sinh ra thông tin thẻ
  - Khi hủy lô, KSV phải nhập lý do và hệ thống sẽ trả lô về bước phủ quyết hạn mức tín dụng.

---

## **Chức năng chính**
1. **Duyệt lô yêu cầu**:
   - KSV kiểm tra thông tin lô và các đơn mở thẻ trong lô.
   - Nhập số thẻ đẹp nếu đơn mở thẻ chọn sản phẩm là thẻ đẹp.
   - Nhấn nút **Duyệt** để phê duyệt lô. Hệ thống sẽ sinh ra thông tin thẻ bao gồm:
     - Ngày hiệu lực thẻ.
     - Ngày hết hạn thẻ.
     - CVV.
     - Sản phẩm thẻ.
     - Hạn mức trên thẻ.
     - Hạng thẻ.
     - Số thẻ 16 số (theo cấu trúc: 4 chữ số đầu là mã BIN, 2 chữ số tiếp theo là mã ngân hàng, 2 chữ tiếp theo là mã sản phẩm thẻ, các số còn lại là ngẫu nhiên và duy nhất).
     - Chiều dài PIN: 6 số.
     - Đối với thẻ phụ, thời hạn hết hiệu lực = thời hạn thẻ chính.
     - Đánh dấu thẻ combo nếu là thẻ combo và hiển thị số thẻ liên kết combo.

2. **Hủy lô yêu cầu**:
   - KSV nhấn nút **Hủy lô** và nhập lý do hủy.
   - Lô bị trả về bước Phủ quyết hạn mức tín dụng.

4. **Xem chi tiết lô**:
   - Hiển thị danh sách khách hàng trong lô.
   - Khi chọn một khách hàng, hiển thị danh sách các đơn mở thẻ liên quan và thông tin chi tiết từng đơn.

5. **Cảnh báo lô chưa xét duyệt**:
   - Hệ thống sẽ cảnh báo đối với các lô yêu cầu chưa được xét duyệt

---

## **Quy tắc**
1. **Phân quyền**:
   - **KSV**: Có quyền duyệt, hủy lô.

2. **Duyệt lô**:
   -Lô sẽ chuyển sang trạng thái "Đã duyệt" và hệ thống sinh ra thông tin thẻ.

3. **Hủy lô**:
   - Khi KSV nhấn **Hủy lô**, phải nhập lý do hủy.
   - Lô sẽ chuyển về trạng thái "Bị hủy" và trả về chi nhánh.

4. **Hiển thị danh sách**:
   - Khi chọn một lô, hiển thị danh sách khách hàng trong lô.
   - Khi chọn một khách hàng, hiển thị danh sách các đơn mở thẻ liên quan.

---

## **Hành động**
- **Duyệt**: KSV phê duyệt lô yêu cầu.
- **Hủy lô**: KSV hủy toàn bộ lô và nhập lý do.
- **Xem chi tiết**: Hiển thị thông tin chi tiết về khách hàng và các đơn mở thẻ trong lô.
- **Lọc dữ liệu**: Lọc danh sách lô mã lô

---

## **Giao diện**

### **Danh sách lô yêu cầu duyệt**
- Hiển thị danh sách các lô yêu cầu duyệt với các thông tin:
  - Mã lô, Tên lô, Tên chi nhánh, Số lượng đơn, Cập nhật lúc, Cập nhật bởi.
- Các nút hành động:
  - **Duyệt**: Dành cho KSV.
  - **Hủy lô**: Dành cho KSV.
  - **Xem chi tiết**: Hiển thị thông tin chi tiết về lô.

### **9. Màn hình Kết Xuất Dữ Liệu Thẻ**

**Mô tả**
Màn hình **Kết Xuất Dữ Liệu Thẻ** được thiết kế để kiểm soát viên (KSV) thực hiện các thao tác liên quan đến việc xuất dữ liệu thẻ. Màn hình hiển thị danh sách các lô yêu cầu, thông tin chi tiết về từng lô.

---

## **Chức năng chính**
1. **Báo cáo**:
   - KSV có thể xuất báo theo dạng PDF hoặc excel.

2. **Xác nhận đã tạo thẻ**:
   - KSV xác nhận rằng các thẻ trong lô đã được tạo thành công.
   - Sau khi xác nhận, lô sẽ chuyển sang bước Giao thẻ cho chi nhánh.

3. **Thoái duyệt lô**:
   - KSV có thể thoái duyệt lô yêu cầu, đưa lô quay lại bước **Xét Duyệt Lô Yêu Cầu** để chỉnh sửa hoặc xử lý lại.
   
4. **Xuất dữ liệu thẻ**:
   - KSV thực hiện xuất dữ liệu thẻ in ra file xuất dữ liệu.

---

## **Quy tắc**
1. **Phân quyền**:
   - **KSV**: Có quyền thực hiện các thao tác như báo cáo, xác nhận tạo thẻ, thoái lô, và xuất dữ liệu thẻ.
   
2. **Thoái duyệt lô**:
    - Lô sẽ quay lại bước **Xét Duyệt Lô Yêu Cầu** để chỉnh sửa hoặc xử lý lại.

3. **Xác nhận đã tạo thẻ**:
   - Chuyển sang bước Giao thẻ cho chi nhánh

4. **Xuất dữ liệu thẻ**:
   - Xuất tất cả dữ liệu thẻ có trong lô

---

## **Hành động**
- **Báo cáo**: in ra báo cáo PDF, excel
- **Xác nhận đã tạo thẻ**: Xác nhận rằng các thẻ trong lô đã được tạo thành công.
- **Thoái duyệt**: Thoái duyệt lô yêu cầu và nhập lý do.
- **Xuất dữ liệu thẻ**: Xuất dữ liệu thẻ 
- **Xem chi tiết**: Hiển thị thông tin chi tiết về từng khách hàng, từng đơn mở thẻ trong lô.

---

## **Giao diện**

### **Danh sách lô yêu cầu kết xuất dữ liệu**
- Hiển thị danh sách các lô yêu cầu với các thông tin:
  - Mã lô, Tên lô, Tên chi nhánh, Số lượng đơn mở thẻ, Cập nhật lúc, Cập nhật bởi.
- Các nút hành động:
  - **Báo cáo**: Xuất báo cáo.
  - **Xác nhận đã tạo thẻ**: Xác nhận rằng các thẻ trong lô đã được tạo thành công.
  - **Thoái duyệt**: Thoái duyệt lô yêu cầu và nhập lý do.
  - **Xuất dữ liệu thẻ**: Xuất dữ liệu thẻ 

### **9. Màn hình Giao Thẻ cho Chi Nhánh**

**Mô tả**
Màn hình **Giao Thẻ và PIN cho Chi Nhánh** được thiết kế để kiểm soát viên (KSV) và lãnh đạo Trung tâm Kiểm Duyệt Thẻ (LĐ TTKDT) thực hiện các thao tác xác nhận giao thẻ đến chi nhánh, xử lý các lô thất lạc. Màn hình hiển thị danh sách các lô yêu cầu giao thẻ cho chi nhánh. Sau khi Lô đã qua bước kết xuất dữ liệu thẻ.

---

## **Chức năng chính**
1. **Xác nhận giao thẻ**:
   - KSV xác nhận rằng lô thẻ đã được giao cho chi nhánh.
   - Sau khi xác nhận, lô sẽ chuyển sang trạng thái "Đã giao thẻ cho chi nhánh". và chuyển sang bước Giao thẻ và Pin cho chủ thẻ.

2. **Lô thất lạc**:
   - KSV nhấn nút **Lô thất lạc** để báo cáo lô bị thất lạc. 
   - Hệ thống hiện thị cảnh báo.
   - Hệ thống yêu cầu nhập lý do thất lạc và ghi nhận bộ phận làm thất lạc.
   - Lô thất lạc sẽ được chuyển đến màn hình của lãnh đạo TTKDT để duyệt hủy.

3. **Hủy lô thất lạc**:
   - Chỉ có lãnh đạo TTKDT mới được duyệt hủy lô thất lạc.


---

## **Quy tắc**
1. **Phân quyền**:
   - **KSV TTKDT**: Có quyền xác nhận giao thẻ, báo cáo lô thất lạc.
   - **LĐ TTKDT**: Chỉ lãnh đạo TTKDT mới được duyệt hủy lô thất lạc.

2. **Lô thất lạc**:
   - Khi KSV nhấn **Lô thất lạc**, hệ thống yêu cầu nhập lý do và bộ phận làm thất lạc.
   - Lô thất lạc sẽ được chuyển đến lãnh đạo TTKDT để duyệt hủy.

3. **Xác nhận giao thẻ**:
   - KSV phải xác nhận giao thẻ trước khi lô chuyển sang trạng thái "Đã giao thẻ". và chuyển đến bước giao thẻ và pin cho chủ thẻ

4. **Truy vấn lô chưa giao thẻ cho chi nhánh**:
   - Hiển thị danh sách các lô cần chuyển giao cho chi nhánh (những lô đã hoàn thành bước kết xuất dữ liệu thẻ)

---

## **Hành động**
- **Xác nhận**: KSV xác nhận giao thẻ cho chi nhánh.
- **Lô thất lạc**: KSV báo cáo lô thất lạc và nhập lý do.
- **Hủy lô thất lạc**: LĐ TTKDT duyệt hủy lô thất lạc.


---

## **Giao diện**

### **Danh sách lô giao thẻ**
- Hiển thị danh sách các lô giao thẻ với các thông tin:
  - Mã lô, Tên lô, Tên chi nhánh, Số lượng đơn, Cập nhật lúc, Cập nhật bởi.
- Các nút hành động:
  - **Xác nhận**: Xác nhận giao thẻ cho chi nhánh.
  - **Lô thất lạc**: Báo cáo lô thất lạc.

### **10. Màn hình Giao Thẻ và PIN cho Chủ Thẻ**

## **Mô tả**
Màn hình **Giao Thẻ và PIN cho Chủ Thẻ** được thiết kế để kiểm soát viên (KSV) thực hiện các thao tác xác nhận giao thẻ và mã PIN đến khách hàng. Màn hình hiển thị danh sách các lô yêu cầu giao thẻ, thông tin chi tiết về từng lô. 

---

## **Chức năng chính**
1. **Xác nhận giao thẻ và PIN**:
   - KSV xác nhận rằng thẻ và mã PIN đã được giao đến khách hàng.
   - Sau khi xác nhận, hệ thống sẽ gửi SMS hoặc email mã PIN đến khách hàng.

2. **Lô thất lạc**:
   - KSV nhấn nút **Lô thất lạc** để báo cáo lô bị thất lạc.
   - Hệ thống yêu cầu nhập lý do thất lạc và bộ phận làm thất lạc.
   - Lô thất lạc sẽ được chuyển đến lãnh đạo TTKDT để duyệt hủy.

3. **Hủy lô thất lạc**:
   - Chỉ có lãnh đạo TTKDT mới được duyệt hủy lô thất lạc.

---

## **Quy tắc**
1. **Phân quyền**:
   - **KSV TTKDT**: Có quyền xác nhận giao thẻ và PIN, báo cáo lô thất lạc.
   - **LĐ TTKDT**: Chỉ lãnh đạo TTKDT mới được duyệt hủy lô thất lạc.

2. **Lô thất lạc**:
   - Khi KSV nhấn **Lô thất lạc**, hệ thống yêu cầu nhập lý do và bộ phận làm thất lạc.
   - Lô thất lạc sẽ được chuyển đến lãnh đạo TTKDT để duyệt hủy.

4. **Truy vấn lô chưa giao thẻ và PIN**:
   - Hiển thị danh sách các lô cần giao thẻ và PIN cho chủ thẻ (những lô đã hoàn thành bước giao thẻ cho chi nhánh).

---

## **Hành động**
- **Xác nhận**: KSV xác nhận giao thẻ và PIN cho khách hàng.
- **Lô thất lạc**: KSV báo cáo lô thất lạc và nhập lý do.
- **Hủy lô thất lạc**: LĐ TTKDT duyệt hủy lô thất lạc.

---

## **Giao diện**

### **Danh sách lô giao thẻ và PIN cho chủ thẻ**
- Hiển thị danh sách các lô giao thẻ và PIN với các thông tin:
  - Mã lô, Tên lô, Tên chi nhánh, Số lượng đơn, Cập nhật lúc, Cập nhật bởi.
- Các nút hành động:
  - **Xác nhận**: Xác nhận giao thẻ và PIN cho khách hàng.
  - **Lô thất lạc**: Báo cáo lô thất lạc.

---
# **Màn hình Kích Hoạt Thẻ**

## **Mô tả**
Màn hình **Kích Hoạt Thẻ** được thiết kế để kiểm soát viên (KSV) thực hiện các thao tác kích hoạt thẻ cho khách hàng. Màn hình hiển thị danh sách các lô thẻ đã giao, thông tin chi tiết về từng lô, và trạng thái kích hoạt của từng thẻ trong lô. Ngoài ra, hệ thống hỗ trợ kích hoạt thẻ theo lô hoặc từng thẻ riêng lẻ thông qua các nguồn yêu cầu khác nhau.

---

## **Chức năng chính**
1. **Kích hoạt thẻ theo lô**:
   - KSV có thể kích hoạt toàn bộ thẻ trong một lô.
   - Hệ thống ghi nhận nguồn yêu cầu kích hoạt (Smart Banking, Tổng đài, Chi nhánh, Email, v.v.).

2. **Kích hoạt thẻ theo từng thẻ**:
   - KSV có thể vào chi tiết từng lô và kích hoạt từng thẻ riêng lẻ.
   - Hệ thống ghi nhận trạng thái kích hoạt thành công/không thành công, thời gian kích hoạt, và tên nhân sự thực hiện.

3. **Hiển thị trạng thái lô**:
   - Hiển thị danh sách các lô chưa ở trạng thái cần kích hoạt.
   - Hiển thị tình trạng từng lô (Chờ kích hoạt, Đã kích hoạt, Không thành công).

4. **Truy vấn nguồn yêu cầu kích hoạt**:
   - Hiển thị nguồn yêu cầu kích hoạt thẻ (Smart Banking, Tổng đài, Chi nhánh, Email, v.v.).

5. **Lịch sử kích hoạt**:
   - Hiển thị lịch sử kích hoạt thẻ, bao gồm:
     - Tên nhân sự thực hiện.
     - Trạng thái kích hoạt (Thành công/Không thành công).
     - Thời gian kích hoạt.

---

## **Quy tắc**
1. **Phân quyền**:
   - **KSV**: Có quyền kích hoạt thẻ theo lô hoặc từng thẻ.
   - **Khách hàng**: Có thể kích hoạt thẻ qua ứng dụng Smart Banking.

2. **Nguồn yêu cầu kích hoạt**:
   - Hệ thống ghi nhận nguồn yêu cầu kích hoạt từ các kênh: Smart Banking, Tổng đài, Chi nhánh, Email.

3. **Trạng thái kích hoạt**:
   - Thẻ chỉ được kích hoạt khi lô đã ở trạng thái "Đã giao thẻ".
   - Nếu kích hoạt không thành công, hệ thống yêu cầu nhập lý do.

4. **Lịch sử kích hoạt**:
   - Hệ thống lưu lại thông tin lịch sử kích hoạt, bao gồm: tên nhân sự, trạng thái, thời gian kích hoạt.

---

## **Hành động**
- **Kích hoạt lô**: Kích hoạt toàn bộ thẻ trong lô.
- **Kích hoạt thẻ**: Kích hoạt từng thẻ riêng lẻ trong lô.
- **Xem chi tiết**: Hiển thị thông tin chi tiết về từng thẻ trong lô.
- **Lọc dữ liệu**: Lọc danh sách lô theo trạng thái (Chờ kích hoạt, Đã kích hoạt, Không thành công).

---

## **Giao diện**

### **Danh sách lô cần kích hoạt**
- Hiển thị danh sách các lô cần kích hoạt với các thông tin:
  - Mã lô, Tên lô, Tên chi nhánh, Số lượng đơn, Trạng thái lô, Cập nhật lúc, Cập nhật bởi.
- Các nút hành động:
  - **Kích hoạt**: Kích hoạt toàn bộ thẻ trong lô.
  - **Xem chi tiết**: Hiển thị thông tin chi tiết về từng thẻ trong lô.

```plaintext
+-------------------+-------------------+-------------------+-------------------+-------------------+-------------------+
| Mã lô             | Tên lô           | Tên chi nhánh     | Số lượng đơn      | Trạng thái lô     | Thao tác          |
+-------------------+-------------------+-------------------+-------------------+-------------------+-------------------+
| 38019             | THE LUU TRU 2    | Trung Tâm Kinh Doanh Thẻ | 0         | Chờ kích hoạt     | [Kích hoạt] [Xem chi tiết] |
| 42878             | TTT - MO THE MOI | Trung Tâm Kinh Doanh Thẻ | 0         | Đã kích hoạt      | [Xem chi tiết]    |
| 91251             | PGD BEN THANH    | Trung Tâm Kinh Doanh Thẻ | 0         | Không thành công  | [Xem chi tiết]    |
+-------------------+-------------------+-------------------+-------------------+-------------------+-------------------+
-----------thao
# **Giả định và ràng buộc**

## **Giả định**

- SAIGONBANK cung cấp API Core Banking và mẫu báo cáo.
- Hệ thống hiện tại có khả năng tích hợp với Napas và CIC.

## **Ràng buộc**

- Thời gian triển khai giai đoạn 1: 6 tháng (từ 01/04/2025).
- Ngân sách: Theo hợp đồng với BC Card.
- Hạn chế về tài nguyên kỹ thuật: Đội ngũ phát triển cần hỗ trợ từ SAIGONBANK.

# **Phụ lục**

## **Danh sách API**

- API đồng bộ dữ liệu khách hàng từ Core Banking.
- API xử lý giao dịch với Napas.
- API truy vấn thông tin thẻ cho SAIGONBANK Smart Banking, SAIGONBANK Pay.

## **Tài liệu ERD**

- Mô tả mối quan hệ giữa các bảng trong cơ sở dữ liệu (Khách hàng, Thẻ, Giao dịch, Nhóm nợ).
- Vẽ sơ đồ ERD với các thực thể và mối quan hệ rõ ràng.

## **Mẫu file template**

- File Excel để import lô phát hành và cấp lại thẻ.

**Hình minh họa ERD**:

- **Mô tả sơ đồ**:
  - Sơ đồ ERD với các thực thể: Khách hàng, Thẻ, Giao dịch, Nhóm nợ, Merchant.
  - Mối quan hệ được vẽ bằng mũi tên, ghi chú khóa chính và khóa ngoại.
  - Sử dụng màu xanh dương cho thực thể, màu đen cho mối quan hệ.
- **Công cụ đề xuất**: Lucidchart hoặc Draw.io, với bố cục gọn gàng, font Roboto 12px.




