// 角色数据
const characters = {
    naruto: {
        name: "漩涡鸣人",
        title: "第七代火影",
        image: "images/naruto.svg",
        stats: {
            health: 1000,
            mana: 800,
            attack: 80
        },
        skills: [
            {
                id: "rasengan",
                name: "螺旋丸",
                description: "凝聚查克拉形成的高速旋转球体，造成中等伤害",
                damage: 120,
                manaCost: 50,
                image: "images/skills/rasengan.svg"
            },
            {
                id: "shadow_clone",
                name: "影分身之术",
                description: "创造分身迷惑敌人，提高下次攻击伤害",
                damage: 0,
                effect: "增加下次攻击伤害50%",
                manaCost: 40,
                image: "images/skills/shadow_clone.svg"
            },
            {
                id: "rasenshuriken",
                name: "螺旋手里剑",
                description: "将风遁性质变化加入螺旋丸，造成大量伤害",
                damage: 180,
                manaCost: 80,
                image: "images/skills/rasenshuriken.svg"
            },
            {
                id: "kyuubi_mode",
                name: "九尾模式",
                description: "奥义：与九尾完全同调，大幅提升攻击力并恢复生命值",
                damage: 250,
                effect: "恢复200生命值",
                manaCost: 150,
                isUltimate: true,
                image: "images/skills/fireball.svg"
            }
        ]
    },
    sasuke: {
        name: "宇智波佐助",
        title: "六道·阴之力",
        image: "images/sasuke.svg",
        stats: {
            health: 900,
            mana: 850,
            attack: 95
        },
        skills: [
            {
                id: "chidori",
                name: "千鸟",
                description: "掌心凝聚闪电查克拉，造成高伤害",
                damage: 150,
                manaCost: 60,
                image: "images/skills/chidori.svg"
            },
            {
                id: "amaterasu",
                name: "天照",
                description: "释放黑色火焰，造成持续伤害",
                damage: 100,
                effect: "额外造成50点持续伤害",
                manaCost: 70,
                image: "images/skills/amaterasu.svg"
            },
            {
                id: "susanoo_arrow",
                name: "须佐能乎之箭",
                description: "释放须佐能乎之箭，造成大量伤害",
                damage: 170,
                manaCost: 90,
                image: "images/skills/chidori.svg"
            },
            {
                id: "rinnegan",
                name: "轮回眼·天手力",
                description: "奥义：使用轮回眼的力量，造成极高伤害并吸收对方查克拉",
                damage: 280,
                effect: "吸收100点查克拉",
                manaCost: 160,
                isUltimate: true,
                image: "images/skills/amaterasu.svg"
            }
        ]
    },
    sakura: {
        name: "春野樱",
        title: "百豪解放",
        image: "images/sakura.svg",
        stats: {
            health: 950,
            mana: 750,
            attack: 85
        },
        skills: [
            {
                id: "chakra_punch",
                name: "怪力拳",
                description: "聚集查克拉于拳头，造成中等伤害",
                damage: 130,
                manaCost: 40,
                image: "images/skills/chakra_punch.svg"
            },
            {
                id: "healing_jutsu",
                name: "医疗忍术",
                description: "使用医疗忍术恢复生命值",
                damage: 0,
                effect: "恢复150生命值",
                manaCost: 60,
                image: "images/skills/healing.svg"
            },
            {
                id: "cherry_blossom_impact",
                name: "樱花冲击",
                description: "积蓄查克拉后释放强力一击，造成高伤害",
                damage: 160,
                manaCost: 70,
                image: "images/skills/chakra_punch.svg"
            },
            {
                id: "byakugou",
                name: "百豪之印·解放",
                description: "奥义：解放额头储存的查克拉，造成大量伤害并恢复生命值",
                damage: 220,
                effect: "恢复250生命值",
                manaCost: 140,
                isUltimate: true,
                image: "images/skills/strength_of_hundred.svg"
            }
        ]
    },
    kakashi: {
        name: "旗木卡卡西",
        title: "拷贝忍者",
        image: "images/kakashi.svg",
        stats: {
            health: 850,
            mana: 900,
            attack: 90
        },
        skills: [
            {
                id: "raikiri",
                name: "雷切",
                description: "改良千鸟的S级雷遁忍术，将雷属性查克拉高度集中",
                damage: 160,
                manaCost: 65,
                image: "images/skills/raikiri.svg"
            },
            {
                id: "kamui",
                name: "神威",
                description: "万花筒写轮眼的瞳术，扭曲时空造成伤害",
                damage: 140,
                manaCost: 80,
                image: "images/skills/kamui.svg"
            },
            {
                id: "sharingan_copy",
                name: "写轮眼复制",
                description: "复制对手的忍术，下次攻击伤害提升40%",
                damage: 0,
                effect: "增加下次攻击伤害40%",
                manaCost: 50,
                image: "images/skills/sharingan_copy.svg"
            },
            {
                id: "susanoo",
                name: "须佐能乎",
                description: "奥义：万花筒写轮眼的最强瞳术，召唤巨大的查克拉武士",
                damage: 240,
                effect: "额外造成80点伤害",
                manaCost: 170,
                isUltimate: true,
                image: "images/skills/susanoo.svg"
            }
        ]
    }
};

// 导出角色数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = characters;
}