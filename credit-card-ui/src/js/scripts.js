
// function toggleNavigation() {
//     const navPlaceholder = document.getElementById('nav-placeholder');
//     const toggleButton = document.getElementById('toggle-nav-placeholder');
    
//     if (navPlaceholder.style.width === '0px' || navPlaceholder.style.display === 'none') {
//       // Phóng ra
//       navPlaceholder.style.width = '250px'; // Kích thước mặc định
//       navPlaceholder.style.display = 'block'; // Hiển thị lại nếu bị ẩn
//       toggleButton.classList.remove('collapsed'); // Xóa class xoay
//     } else {
//       // Thu lại
//       navPlaceholder.style.width = '0px'; // Thu nhỏ chiều rộng
//       setTimeout(() => {
//         navPlaceholder.style.display = 'none'; // Ẩn sau khi thu nhỏ
//       }, 300); // Đợi hiệu ứng thu nhỏ hoàn tất
//       toggleButton.classList.add('collapsed'); // Thêm class xoay
//     }
// }

function toggleNavigation() {
    const navPlaceholder = document.getElementById('nav-placeholder');
    const toggleButton = document.getElementById('toggle-nav-placeholder');
    
    if (navPlaceholder.style.width === '0px' || navPlaceholder.style.display === 'none') {
      // Phóng ra
      navPlaceholder.style.width = '250px'; // Kích thước mặc định
      navPlaceholder.style.display = 'block'; // Hiển thị lại nếu bị ẩn
      toggleButton.classList.remove('collapsed'); // Xóa class xoay
    } else {
      // Thu lại
      navPlaceholder.style.width = '0px'; // Thu nhỏ chiều rộng
      setTimeout(() => {
        navPlaceholder.style.display = 'none'; // Ẩn sau khi thu nhỏ
      }, 300); // Đợi hiệu ứng thu nhỏ hoàn tất
      toggleButton.classList.add('collapsed'); // Thêm class xoay
    }
}


    // Ví dụ: Hàm dùng chung để hiển thị thông báo
function showAlert(message) {
    alert(message);
}