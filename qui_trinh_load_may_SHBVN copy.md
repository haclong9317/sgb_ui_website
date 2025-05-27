### Step-by-Step Guide to Process Workflow in JIRA

1. **Initiate Task**:  
   - Create a new task or issue in JIRA and add it to the **BACKLOG**.  
   - Ensure all necessary details are included to describe the task clearly.

2. **Install Application**:  
   - Move the task to the **Install App** stage.  
   - The IT Support Team will receive the POS at this stage at warehouse - **check all information correct** (Ex: Serial number, Specification ...) before process next step - and will install the application.
   - Once the installation is complete, update the task status to **AUTH CODE**.

3. **Generate Auth Code**:  
   - The IT Installation Coordinator will receive the POS at IT Support Department and initiate the process of obtaining the Auth Code from the IT Operations Team.  
   - After obtaining the Auth Code, update the task status to **SETUP BAIS**.

4. **Setup BAIS**:  
   - The IT Operations Team will process the system to generate the Auth Code and set up the POS.  
   - Coordinate with the IT Installation Coordinator during this step.  
   - Once the setup is complete, update the task status to **PACKAGE**.

5. **Package and Delivery**:  
   - After completing the setup, the IT Installation Coordinator will prepare the package and IT Operating Team move the task to the **Delivery and Install** stage.  
   - Deliver and install the POS at the merchant's location.  
   - Once installation is complete, update the task status to **VERIFY**.

6. **Verification**:  
   - Verify all steps in the process to ensure there are no issues.  
   - If everything is correct, update the task status to **FINISH**.
   - If there are any issues, send back to IT Installtion Coordinator to update

7. **Close Task**:  
   - After successful verification, move the task to the **FINISH** stage and close it.  
   - Ensure all relevant documentation and notes are added before closing.

---

### Hướng dẫn từng bước quy trình làm việc trong JIRA

1. **Khởi tạo công việc**:  
   - Tạo một công việc hoặc vấn đề mới trong JIRA và thêm vào **BACKLOG**.  
   - Đảm bảo tất cả các thông tin cần thiết được cung cấp để mô tả công việc một cách rõ ràng.

2. **Cài đặt ứng dụng**:  
   - Chuyển công việc sang giai đoạn **Install App**.  
   - Đội Hỗ trợ CNTT sẽ nhận thiết bị POS tại kho - **kiểm tra tất cả thông tin chính xác** (Ví dụ: Số serial, thông số kỹ thuật, ...) trước khi thực hiện bước tiếp theo - và tiến hành cài đặt ứng dụng.  
   - Sau khi hoàn tất cài đặt, cập nhật trạng thái công việc thành **AUTH CODE**.

3. **Tạo mã xác thực**:  
   - Điều phối viên cài đặt CNTT sẽ nhận thiết bị POS tại Phòng Hỗ trợ CNTT và bắt đầu quy trình lấy mã xác thực từ Đội Vận hành CNTT.  
   - Sau khi nhận được mã xác thực, cập nhật trạng thái công việc thành **SETUP BAIS**.

4. **Cài đặt BAIS**:  
   - Đội Vận hành CNTT sẽ xử lý hệ thống để tạo mã xác thực và cài đặt thiết bị POS.  
   - Phối hợp với Điều phối viên cài đặt CNTT trong bước này.  
   - Sau khi hoàn tất cài đặt, cập nhật trạng thái công việc thành **PACKAGE**.

5. **Đóng gói và giao hàng**:  
   - Sau khi hoàn tất cài đặt, Điều phối viên cài đặt CNTT sẽ chuẩn bị gói hàng và Đội Vận hành CNTT chuyển công việc sang giai đoạn **Delivery and Install**.  
   - Giao và cài đặt thiết bị POS tại địa điểm của khách hàng.  
   - Sau khi hoàn tất cài đặt, cập nhật trạng thái công việc thành **VERIFY**.

6. **Xác minh**:  
   - Xác minh tất cả các bước trong quy trình để đảm bảo không có vấn đề nào xảy ra.  
   - Nếu mọi thứ đều chính xác, cập nhật trạng thái công việc thành **FINISH**.
   - Nếu có sai sót, chuyển về cho IT Installation Coordinator cập nhật.

7. **Đóng công việc**:  
   - Sau khi xác minh thành công, chuyển công việc sang giai đoạn **FINISH** và đóng lại.  
   - Đảm bảo tất cả các tài liệu và ghi chú liên quan được thêm vào trước khi đóng công việc.

   
### Sequence Diagram for Process Workflow in JIRA

```mermaid
sequenceDiagram
    participant User
    participant JIRA
    participant ITSupport as IT Support Team
    participant ITCoordinator as IT Installation Coordinator
    participant ITOperations as IT Operations Team

    User ->> JIRA: Create Task (BACKLOG)
    JIRA ->> ITSupport: Assign Task (Install App)
    ITSupport ->> ITSupport: Check POS Information
    ITSupport ->> ITSupport: Install Application
    ITSupport ->> JIRA: Update Status (AUTH CODE)

    JIRA ->> ITCoordinator: Receive POS
    ITCoordinator ->> ITOperations: Request Auth Code
    ITOperations ->> ITOperations: Generate Auth Code
    ITOperations ->> ITCoordinator: Send Auth Code
    ITCoordinator ->> JIRA: Update Status (SETUP BAIS)

    JIRA ->> ITOperations: Request BAIS Setup
    ITOperations ->> ITOperations: Setup BAIS
    ITOperations ->> ITCoordinator: Confirm Setup Complete
    ITCoordinator ->> JIRA: Update Status (PACKAGE)

    JIRA ->> ITCoordinator: Prepare Package
    ITCoordinator ->> ITCoordinator: Deliver and Install POS
    ITCoordinator ->> JIRA: Update Status (VERIFY)

    JIRA ->> User: Verify Process
    alt Verification Fails
        User ->> ITCoordinator: Report Issue
        ITCoordinator ->> JIRA: Check and Update
    else Verification Successful
        User ->> JIRA: Confirm Verification
        User ->> JIRA: Close Task (FINISH)
    end


