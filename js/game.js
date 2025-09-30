// 游戏战斗系统
document.addEventListener('DOMContentLoaded', function() {
    // 获取玩家选择的角色
    const selectedCharacterId = localStorage.getItem('selectedCharacter') || 'naruto';
    const playerCharacter = characters[selectedCharacterId];
    
    // 随机选择AI对手角色（不同于玩家角色）
    let aiCharacterId;
    do {
        const characterIds = Object.keys(characters);
        aiCharacterId = characterIds[Math.floor(Math.random() * characterIds.length)];
    } while (aiCharacterId === selectedCharacterId);
    
    const aiCharacter = characters[aiCharacterId];
    
    // 初始化游戏状态
    const gameState = {
        player: {
            character: playerCharacter,
            currentHealth: playerCharacter.stats.health,
            maxHealth: playerCharacter.stats.health,
            currentMana: playerCharacter.stats.mana,
            maxMana: playerCharacter.stats.mana,
            effects: {
                damageBoost: 0,
                burnDamage: 0
            },
            items: {
                healthPotion: 3,
                manaPotion: 3
            }
        },
        enemy: {
            character: aiCharacter,
            currentHealth: aiCharacter.stats.health,
            maxHealth: aiCharacter.stats.health,
            currentMana: aiCharacter.stats.mana,
            maxMana: aiCharacter.stats.mana,
            effects: {
                damageBoost: 0,
                burnDamage: 0
            },
            items: {
                healthPotion: 3,
                manaPotion: 3
            }
        },
        turn: 'player', // 玩家先手
        round: 1,
        gameOver: false
    };
    
    // 获取DOM元素
    const playerImage = document.getElementById('player-image');
    const playerName = document.getElementById('player-name');
    const playerHealth = document.getElementById('player-health');
    const playerHealthValue = document.getElementById('player-health-value');
    const playerMana = document.getElementById('player-mana');
    const playerManaValue = document.getElementById('player-mana-value');
    
    const enemyImage = document.getElementById('enemy-image');
    const enemyName = document.getElementById('enemy-name');
    const enemyHealth = document.getElementById('enemy-health');
    const enemyHealthValue = document.getElementById('enemy-health-value');
    const enemyMana = document.getElementById('enemy-mana');
    const enemyManaValue = document.getElementById('enemy-mana-value');
    
    const battleMessages = document.getElementById('battle-messages');
    const skillButtons = document.getElementById('skill-buttons');
    const healthPotion = document.getElementById('health-potion');
    const manaPotion = document.getElementById('mana-potion');
    const healthPotionCount = document.getElementById('health-potion-count');
    const manaPotionCount = document.getElementById('mana-potion-count');
    
    const battleResult = document.getElementById('battle-result');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');
    
    // 初始化界面
    function initializeUI() {
        // 设置玩家角色信息
        playerImage.src = playerCharacter.image;
        playerName.textContent = playerCharacter.name;
        updateHealthAndMana();
        
        // 设置敌人角色信息
        enemyImage.src = aiCharacter.image;
        enemyName.textContent = aiCharacter.name;
        
        // 创建技能按钮
        playerCharacter.skills.forEach(skill => {
            const skillButton = document.createElement('button');
            skillButton.className = 'skill-btn' + (skill.isUltimate ? ' ultimate' : '');
            skillButton.dataset.skillId = skill.id;
            
            skillButton.innerHTML = `
                <img src="${skill.image}" alt="${skill.name}">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-cost">消耗: ${skill.manaCost}</span>
            `;
            
            skillButton.addEventListener('click', () => useSkill(skill));
            skillButtons.appendChild(skillButton);
        });
        
        // 设置道具按钮事件
        healthPotion.addEventListener('click', useHealthPotion);
        manaPotion.addEventListener('click', useManaPotion);
        
        // 添加初始战斗消息
        addBattleMessage(`战斗开始！${playerCharacter.name} VS ${aiCharacter.name}`, 'system');
        addBattleMessage('你的回合，请选择一个技能或使用道具', 'system');
    }
    
    // 更新生命值和查克拉显示
    function updateHealthAndMana() {
        // 更新玩家状态
        const playerHealthPercent = (gameState.player.currentHealth / gameState.player.maxHealth) * 100;
        playerHealth.style.width = `${Math.max(0, playerHealthPercent)}%`;
        playerHealthValue.textContent = `${gameState.player.currentHealth}/${gameState.player.maxHealth}`;
        
        const playerManaPercent = (gameState.player.currentMana / gameState.player.maxMana) * 100;
        playerMana.style.width = `${Math.max(0, playerManaPercent)}%`;
        playerManaValue.textContent = `${gameState.player.currentMana}/${gameState.player.maxMana}`;
        
        // 更新敌人状态
        const enemyHealthPercent = (gameState.enemy.currentHealth / gameState.enemy.maxHealth) * 100;
        enemyHealth.style.width = `${Math.max(0, enemyHealthPercent)}%`;
        enemyHealthValue.textContent = `${gameState.enemy.currentHealth}/${gameState.enemy.maxHealth}`;
        
        const enemyManaPercent = (gameState.enemy.currentMana / gameState.enemy.maxMana) * 100;
        enemyMana.style.width = `${Math.max(0, enemyManaPercent)}%`;
        enemyManaValue.textContent = `${gameState.enemy.currentMana}/${gameState.enemy.maxMana}`;
        
        // 更新道具数量
        healthPotionCount.textContent = gameState.player.items.healthPotion;
        manaPotionCount.textContent = gameState.player.items.manaPotion;
        
        // 检查技能是否可用（查克拉是否足够）
        const skillBtns = document.querySelectorAll('.skill-btn');
        skillBtns.forEach(button => {
            const skillId = button.dataset.skillId;
            const skill = playerCharacter.skills.find(s => s.id === skillId);
            
            if (gameState.player.currentMana < skill.manaCost || gameState.turn !== 'player') {
                button.classList.add('disabled');
                button.disabled = true;
            } else {
                button.classList.remove('disabled');
                button.disabled = false;
            }
        });
        
        // 检查道具是否可用
        if (gameState.player.items.healthPotion <= 0 || gameState.turn !== 'player') {
            healthPotion.classList.add('disabled');
            healthPotion.disabled = true;
        } else {
            healthPotion.classList.remove('disabled');
            healthPotion.disabled = false;
        }
        
        if (gameState.player.items.manaPotion <= 0 || gameState.turn !== 'player') {
            manaPotion.classList.add('disabled');
            manaPotion.disabled = true;
        } else {
            manaPotion.classList.remove('disabled');
            manaPotion.disabled = false;
        }
    }
    
    // 添加战斗消息
    function addBattleMessage(message, type = 'normal') {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        
        // 根据消息类型添加不同的样式类
        if (type === 'player') {
            messageElement.className = 'player-action';
        } else if (type === 'enemy') {
            messageElement.className = 'enemy-action';
        } else if (type === 'system') {
            messageElement.style.fontWeight = 'bold';
            messageElement.style.color = '#666';
        }
        
        battleMessages.appendChild(messageElement);
        battleMessages.scrollTop = battleMessages.scrollHeight;
    }
    
    // 使用技能
    function useSkill(skill) {
        if (gameState.turn !== 'player' || gameState.gameOver) return;
        
        // 检查查克拉是否足够
        if (gameState.player.currentMana < skill.manaCost) {
            addBattleMessage('查克拉不足，无法使用此技能！', 'system');
            return;
        }
        
        // 消耗查克拉
        gameState.player.currentMana -= skill.manaCost;
        
        // 计算伤害
        let damage = skill.damage;
        
        // 应用伤害加成效果
        if (gameState.player.effects.damageBoost > 0 && damage > 0) {
            const originalDamage = damage;
            damage = Math.floor(damage * (1 + gameState.player.effects.damageBoost));
            addBattleMessage(`伤害提升效果触发！伤害从${originalDamage}提升到${damage}！`, 'player');
            gameState.player.effects.damageBoost = 0; // 使用后清除效果
        }
        
        // 处理技能效果
        let skillMessage = `${playerCharacter.name}使用了${skill.name}！`;
        
        if (skill.effect) {
            if (skill.effect.includes('增加下次攻击伤害')) {
                const match = skill.effect.match(/(\d+)%/);
                if (match) {
                    const boostPercent = parseFloat(match[1]) / 100;
                    gameState.player.effects.damageBoost = boostPercent;
                    skillMessage += `下次攻击伤害将提升${match[1]}%！`;
                }
            } else if (skill.effect.includes('恢复') && skill.effect.includes('生命值')) {
                const match = skill.effect.match(/(\d+)/);
                if (match) {
                    const healAmount = parseInt(match[1]);
                    gameState.player.currentHealth = Math.min(gameState.player.maxHealth, gameState.player.currentHealth + healAmount);
                    skillMessage += `恢复了${healAmount}点生命值！`;
                }
            } else if (skill.effect.includes('吸收') && skill.effect.includes('查克拉')) {
                const match = skill.effect.match(/(\d+)/);
                if (match) {
                    const manaAmount = parseInt(match[1]);
                    const actualMana = Math.min(manaAmount, gameState.enemy.currentMana);
                    gameState.player.currentMana = Math.min(gameState.player.maxMana, gameState.player.currentMana + actualMana);
                    gameState.enemy.currentMana = Math.max(0, gameState.enemy.currentMana - actualMana);
                    skillMessage += `吸收了${actualMana}点查克拉！`;
                }
            } else if (skill.effect.includes('持续伤害') || skill.effect.includes('额外造成')) {
                const match = skill.effect.match(/(\d+)/);
                if (match) {
                    const burnDamage = parseInt(match[1]);
                    gameState.enemy.effects.burnDamage = burnDamage;
                    skillMessage += `将对敌人造成持续伤害！`;
                }
            }
        }
        
        // 造成伤害
        if (damage > 0) {
            gameState.enemy.currentHealth = Math.max(0, gameState.enemy.currentHealth - damage);
            skillMessage += `对${aiCharacter.name}造成了${damage}点伤害！`;
        }
        
        addBattleMessage(skillMessage, 'player');
        
        // 更新界面
        updateHealthAndMana();
        
        // 检查游戏是否结束
        if (gameState.enemy.currentHealth <= 0) {
            endGame('win');
            return;
        }
        
        // 应用持续伤害效果
        if (gameState.enemy.effects.burnDamage > 0) {
            setTimeout(() => {
                const burnDamage = gameState.enemy.effects.burnDamage;
                gameState.enemy.currentHealth = Math.max(0, gameState.enemy.currentHealth - burnDamage);
                addBattleMessage(`${aiCharacter.name}受到持续伤害${burnDamage}点！`, 'player');
                gameState.enemy.effects.burnDamage = 0;
                updateHealthAndMana();
                
                if (gameState.enemy.currentHealth <= 0) {
                    endGame('win');
                    return;
                }
                
                // 切换回合
                switchToEnemyTurn();
            }, 500);
        } else {
            // 切换回合
            switchToEnemyTurn();
        }
    }
    
    // 切换到敌人回合
    function switchToEnemyTurn() {
        gameState.turn = 'enemy';
        addBattleMessage('敌人回合...', 'system');
        updateHealthAndMana();
        setTimeout(enemyTurn, 1500);
    }
    
    // 使用红瓶
    function useHealthPotion() {
        if (gameState.turn !== 'player' || gameState.gameOver) return;
        
        if (gameState.player.items.healthPotion <= 0) {
            addBattleMessage('没有红瓶了！', 'system');
            return;
        }
        
        if (gameState.player.currentHealth >= gameState.player.maxHealth) {
            addBattleMessage('生命值已满，不需要使用红瓶！', 'system');
            return;
        }
        
        // 使用红瓶
        gameState.player.items.healthPotion--;
        const healAmount = Math.floor(gameState.player.maxHealth * 0.3);
        gameState.player.currentHealth = Math.min(gameState.player.maxHealth, gameState.player.currentHealth + healAmount);
        
        addBattleMessage(`${playerCharacter.name}使用了红瓶，恢复了${healAmount}点生命值！`, 'player');
        
        // 更新界面
        updateHealthAndMana();
        
        // 切换回合
        switchToEnemyTurn();
    }
    
    // 使用蓝瓶
    function useManaPotion() {
        if (gameState.turn !== 'player' || gameState.gameOver) return;
        
        if (gameState.player.items.manaPotion <= 0) {
            addBattleMessage('没有蓝瓶了！', 'system');
            return;
        }
        
        if (gameState.player.currentMana >= gameState.player.maxMana) {
            addBattleMessage('查克拉已满，不需要使用蓝瓶！', 'system');
            return;
        }
        
        // 使用蓝瓶
        gameState.player.items.manaPotion--;
        const manaAmount = Math.floor(gameState.player.maxMana * 0.3);
        gameState.player.currentMana = Math.min(gameState.player.maxMana, gameState.player.currentMana + manaAmount);
        
        addBattleMessage(`${playerCharacter.name}使用了蓝瓶，恢复了${manaAmount}点查克拉！`, 'player');
        
        // 更新界面
        updateHealthAndMana();
        
        // 切换回合
        switchToEnemyTurn();
    }
    
    // AI回合
    function enemyTurn() {
        if (gameState.gameOver) return;
        
        // AI决策逻辑 - 首先检查是否需要使用道具
        // 如果生命值低于25%且有红瓶，有70%几率使用
        if (gameState.enemy.currentHealth < gameState.enemy.maxHealth * 0.25 && 
            gameState.enemy.items.healthPotion > 0 && 
            Math.random() < 0.7) {
            gameState.enemy.items.healthPotion--;
            const healAmount = Math.floor(gameState.enemy.maxHealth * 0.3);
            gameState.enemy.currentHealth = Math.min(gameState.enemy.maxHealth, gameState.enemy.currentHealth + healAmount);
            addBattleMessage(`${aiCharacter.name}使用了红瓶，恢复了${healAmount}点生命值！`, 'enemy');
            updateHealthAndMana();
            
            setTimeout(() => {
                gameState.turn = 'player';
                gameState.round++;
                addBattleMessage(`第${gameState.round}回合开始，你的回合`, 'system');
                updateHealthAndMana();
            }, 1000);
            return;
        }
        
        // 如果查克拉低于30%且有蓝瓶，有60%几率使用
        if (gameState.enemy.currentMana < gameState.enemy.maxMana * 0.3 && 
            gameState.enemy.items.manaPotion > 0 && 
            Math.random() < 0.6) {
            gameState.enemy.items.manaPotion--;
            const manaAmount = Math.floor(gameState.enemy.maxMana * 0.3);
            gameState.enemy.currentMana = Math.min(gameState.enemy.maxMana, gameState.enemy.currentMana + manaAmount);
            addBattleMessage(`${aiCharacter.name}使用了蓝瓶，恢复了${manaAmount}点查克拉！`, 'enemy');
            updateHealthAndMana();
            
            setTimeout(() => {
                gameState.turn = 'player';
                gameState.round++;
                addBattleMessage(`第${gameState.round}回合开始，你的回合`, 'system');
                updateHealthAndMana();
            }, 1000);
            return;
        }
        
        // 选择可用技能
        let availableSkills = aiCharacter.skills.filter(skill => skill.manaCost <= gameState.enemy.currentMana);
        
        // 如果没有可用技能，跳过回合
        if (availableSkills.length === 0) {
            addBattleMessage(`${aiCharacter.name}的查克拉不足，跳过回合！`, 'enemy');
            setTimeout(() => {
                gameState.turn = 'player';
                gameState.round++;
                addBattleMessage(`第${gameState.round}回合开始，你的回合`, 'system');
                updateHealthAndMana();
            }, 1000);
            return;
        }
        
        // AI策略：
        // 1. 如果生命值低于35%且有治疗技能，优先使用治疗
        // 2. 如果没有伤害加成，有30%几率使用增益技能
        // 3. 如果有奥义且查克拉充足，有25%几率使用
        // 4. 否则随机选择伤害技能
        
        let selectedSkill;
        
        // 检查是否需要治疗
        if (gameState.enemy.currentHealth < gameState.enemy.maxHealth * 0.35) {
            const healingSkill = availableSkills.find(skill => 
                skill.effect && skill.effect.includes('恢复') && skill.effect.includes('生命值')
            );
            if (healingSkill) {
                selectedSkill = healingSkill;
            }
        }
        
        // 检查是否使用增益技能
        if (!selectedSkill && gameState.enemy.effects.damageBoost === 0) {
            const buffSkill = availableSkills.find(skill => 
                skill.effect && skill.effect.includes('增加下次攻击伤害')
            );
            if (buffSkill && Math.random() < 0.3) {
                selectedSkill = buffSkill;
            }
        }
        
        // 检查是否使用奥义
        if (!selectedSkill) {
            const ultimateSkill = availableSkills.find(skill => skill.isUltimate);
            if (ultimateSkill && gameState.enemy.currentMana >= ultimateSkill.manaCost * 1.2 && Math.random() < 0.25) {
                selectedSkill = ultimateSkill;
            }
        }
        
        // 随机选择技能，优先选择高伤害技能
        if (!selectedSkill) {
            const damageSkills = availableSkills.filter(skill => skill.damage > 0);
            if (damageSkills.length > 0) {
                // 按伤害排序，有更高几率选择高伤害技能
                damageSkills.sort((a, b) => b.damage - a.damage);
                const rand = Math.random();
                if (rand < 0.5 && damageSkills.length > 0) {
                    selectedSkill = damageSkills[0];
                } else if (rand < 0.8 && damageSkills.length > 1) {
                    selectedSkill = damageSkills[1];
                } else {
                    selectedSkill = damageSkills[Math.floor(Math.random() * damageSkills.length)];
                }
            } else {
                selectedSkill = availableSkills[Math.floor(Math.random() * availableSkills.length)];
            }
        }
        
        // 使用选中的技能
        gameState.enemy.currentMana -= selectedSkill.manaCost;
        
        let damage = selectedSkill.damage;
        
        // 应用伤害加成
        if (gameState.enemy.effects.damageBoost > 0 && damage > 0) {
            const originalDamage = damage;
            damage = Math.floor(damage * (1 + gameState.enemy.effects.damageBoost));
            addBattleMessage(`${aiCharacter.name}的伤害提升效果触发！伤害从${originalDamage}提升到${damage}！`, 'enemy');
            gameState.enemy.effects.damageBoost = 0;
        }
        
        // 处理技能效果
        let skillMessage = `${aiCharacter.name}使用了${selectedSkill.name}！`;
        
        if (selectedSkill.effect) {
            if (selectedSkill.effect.includes('增加下次攻击伤害')) {
                const match = selectedSkill.effect.match(/(\d+)%/);
                if (match) {
                    const boostPercent = parseFloat(match[1]) / 100;
                    gameState.enemy.effects.damageBoost = boostPercent;
                    skillMessage += `下次攻击伤害将提升${match[1]}%！`;
                }
            } else if (selectedSkill.effect.includes('恢复') && selectedSkill.effect.includes('生命值')) {
                const match = selectedSkill.effect.match(/(\d+)/);
                if (match) {
                    const healAmount = parseInt(match[1]);
                    gameState.enemy.currentHealth = Math.min(gameState.enemy.maxHealth, gameState.enemy.currentHealth + healAmount);
                    skillMessage += `恢复了${healAmount}点生命值！`;
                }
            } else if (selectedSkill.effect.includes('吸收') && selectedSkill.effect.includes('查克拉')) {
                const match = selectedSkill.effect.match(/(\d+)/);
                if (match) {
                    const manaAmount = parseInt(match[1]);
                    const actualMana = Math.min(manaAmount, gameState.player.currentMana);
                    gameState.enemy.currentMana = Math.min(gameState.enemy.maxMana, gameState.enemy.currentMana + actualMana);
                    gameState.player.currentMana = Math.max(0, gameState.player.currentMana - actualMana);
                    skillMessage += `吸收了你${actualMana}点查克拉！`;
                }
            } else if (selectedSkill.effect.includes('持续伤害') || selectedSkill.effect.includes('额外造成')) {
                const match = selectedSkill.effect.match(/(\d+)/);
                if (match) {
                    const burnDamage = parseInt(match[1]);
                    gameState.player.effects.burnDamage = burnDamage;
                    skillMessage += `你将受到持续伤害！`;
                }
            }
        }
        
        // 造成伤害
        if (damage > 0) {
            gameState.player.currentHealth = Math.max(0, gameState.player.currentHealth - damage);
            skillMessage += `对你造成了${damage}点伤害！`;
        }
        
        addBattleMessage(skillMessage, 'enemy');
        
        // 更新界面
        updateHealthAndMana();
        
        // 检查游戏是否结束
        if (gameState.player.currentHealth <= 0) {
            endGame('lose');
            return;
        }
        
        // 应用持续伤害效果
        if (gameState.player.effects.burnDamage > 0) {
            setTimeout(() => {
                const burnDamage = gameState.player.effects.burnDamage;
                gameState.player.currentHealth = Math.max(0, gameState.player.currentHealth - burnDamage);
                addBattleMessage(`你受到持续伤害${burnDamage}点！`, 'enemy');
                gameState.player.effects.burnDamage = 0;
                updateHealthAndMana();
                
                if (gameState.player.currentHealth <= 0) {
                    endGame('lose');
                    return;
                }
                
                // 切换回合
                setTimeout(() => {
                    gameState.turn = 'player';
                    gameState.round++;
                    addBattleMessage(`第${gameState.round}回合开始，你的回合`, 'system');
                    updateHealthAndMana();
                }, 500);
            }, 1000);
        } else {
            // 切换回合
            setTimeout(() => {
                gameState.turn = 'player';
                gameState.round++;
                addBattleMessage(`第${gameState.round}回合开始，你的回合`, 'system');
                updateHealthAndMana();
            }, 1000);
        }
    }
    
    // 结束游戏
    function endGame(result) {
        gameState.gameOver = true;
        
        setTimeout(() => {
            if (result === 'win') {
                resultTitle.textContent = '🎉 胜利！🎉';
                resultTitle.style.color = '#ff7e1f';
                resultMessage.textContent = `恭喜你击败了${aiCharacter.name}！你展现了真正的忍者实力！`;
            } else {
                resultTitle.textContent = '💔 失败！💔';
                resultTitle.style.color = '#ff304f';
                resultMessage.textContent = `你被${aiCharacter.name}击败了！不要气馁，继续修炼，变得更强！`;
            }
            
            battleResult.classList.remove('hidden');
        }, 1000);
    }
    
    // 初始化游戏
    initializeUI();
});
