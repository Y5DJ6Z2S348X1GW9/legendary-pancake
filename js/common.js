// 通用JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏高亮当前页面
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.endsWith(linkPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});