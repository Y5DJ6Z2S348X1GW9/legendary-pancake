// 首页JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 添加简单的动画效果
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            hero.style.transition = 'all 0.6s ease-out';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // 为开始游戏按钮添加点击效果
    const startButton = document.querySelector('.btn-primary');
    if (startButton) {
        startButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        startButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});

