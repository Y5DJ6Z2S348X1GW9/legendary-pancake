document.addEventListener('DOMContentLoaded', function() {
    // 获取所有标签按钮和角色详情区域
    const tabButtons = document.querySelectorAll('.tab-btn');
    const characterDetails = document.querySelectorAll('.character-detail');
    
    // 为每个标签按钮添加点击事件
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 获取当前点击的标签对应的角色ID
            const characterId = button.getAttribute('data-character');
            
            // 移除所有标签按钮的active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // 移除所有角色详情区域的active类
            characterDetails.forEach(detail => detail.classList.remove('active'));
            
            // 为当前点击的标签按钮添加active类
            button.classList.add('active');
            
            // 为对应的角色详情区域添加active类
            document.getElementById(`${characterId}-detail`).classList.add('active');
        });
    });
    
    // 默认显示第一个角色的详情
    tabButtons[0].click();
});