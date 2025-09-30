// 角色选择页面脚本
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有选择按钮
    const selectButtons = document.querySelectorAll('.select-btn');
    
    // 为每个按钮添加点击事件
    selectButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 获取选中的角色
            const characterElement = this.closest('.character');
            const characterId = characterElement.dataset.character;
            
            // 将选中的角色保存到本地存储
            localStorage.setItem('selectedCharacter', characterId);
            
            // 跳转到游戏页面
            window.location.href = 'game.html';
        });
    });
});