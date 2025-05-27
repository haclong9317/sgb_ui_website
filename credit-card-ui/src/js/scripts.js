
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

document.addEventListener('DOMContentLoaded', function() {
  fetch('../partials/nav.html')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
    })
    .then(data => {
      console.log('Nav loaded');
      document.getElementById('nav-placeholder').innerHTML = data;
      console.log('Navigation bar loaded successfully.');
      // Gán sự kiện sau khi nav đã được chèn vào DOM
      var container = document.getElementById('container');
      var btn1 = document.getElementById('toggle-nav-1');
      var btn2 = document.getElementById('toggle-nav-2');
      console.log('btn1:', btn1); // Xem có null không
      console.log('btn2:', btn2);
      if (btn1 && container) {
        btn1.addEventListener('click', function() {
            console.log('Button 1 clicked');
          container.classList.toggle('nav-collapsed-bottom-1');
        });
      }
      if (btn2 && container) {
        btn2.addEventListener('click', function() {
          container.classList.toggle('nav-collapsed-bottom-2');
        });
      }
    })
    .catch(err => {
        console.error('Fetch nav.html error:', err);
    });;
});