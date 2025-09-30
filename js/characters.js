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
    },
    luffy_gear2: {
        name: "蒙奇·D·路飞",
        title: "二档·橡胶人",
        image: "images/luffy_gear2.svg",
        stats: {
            health: 1100,
            mana: 750,
            attack: 88
        },
        skills: [
            {
                id: "gomu_jet_pistol",
                name: "橡胶JET手枪",
                description: "使用二档高速血液流动，发出超高速的拳击",
                damage: 135,
                manaCost: 45,
                image: "images/skills/jet_pistol.svg"
            },
            {
                id: "gomu_jet_gatling",
                name: "橡胶JET机关枪",
                description: "二档状态下的连续高速拳击，造成大量伤害",
                damage: 170,
                manaCost: 75,
                image: "images/skills/jet_gatling.svg"
            },
            {
                id: "gomu_jet_bazooka",
                name: "橡胶JET火箭炮",
                description: "用双手发出强力冲击波，击退敌人",
                damage: 145,
                manaCost: 55,
                image: "images/skills/jet_bazooka.svg"
            },
            {
                id: "gomu_red_hawk",
                name: "橡胶火拳枪",
                description: "奥义：二档与武装色霸气结合，发出燃烧的拳击，造成巨大伤害和灼烧效果",
                damage: 230,
                effect: "额外造成60点持续伤害",
                manaCost: 145,
                isUltimate: true,
                image: "images/skills/red_hawk.svg"
            }
        ]
    },
    zoro_enma: {
        name: "罗罗诺亚·索隆",
        title: "三刀流·阎魔",
        image: "images/zoro.svg",
        stats: {
            health: 950,
            mana: 820,
            attack: 100
        },
        skills: [
            {
                id: "santoryu_onigiri",
                name: "三刀流·鬼斩",
                description: "三刀流基础奥义，从三个方向同时斩击敌人",
                damage: 155,
                manaCost: 60,
                image: "images/skills/onigiri.svg"
            },
            {
                id: "enma_release",
                name: "阎魔·霸气解放",
                description: "释放阎魔的力量，武装色霸气覆盖，下次攻击伤害提升60%",
                damage: 0,
                effect: "增加下次攻击伤害60%",
                manaCost: 55,
                image: "images/skills/enma_haki.svg"
            },
            {
                id: "santoryu_kokujou_o_tatsu_maki",
                name: "三刀流·黑绳大龙卷",
                description: "旋转身体产生龙卷风般的斩击，造成范围伤害",
                damage: 175,
                manaCost: 85,
                image: "images/skills/tatsu_maki.svg"
            },
            {
                id: "santoryu_ichidai_sanzen_daisen_sekai",
                name: "三千世界",
                description: "奥义：三刀流最强奥义，瞬间发出无数道斩击，威力惊人",
                damage: 290,
                effect: "吸收80点查克拉",
                manaCost: 165,
                isUltimate: true,
                image: "images/skills/sanzen_sekai.svg"
            }
        ]
    },
    luffy_snakeman: {
        name: "蒙奇·D·路飞",
        title: "四档·蛇人",
        image: "images/luffy_snakeman.svg",
        stats: {
            health: 1050,
            mana: 880,
            attack: 92
        },
        skills: [
            {
                id: "gomu_jet_culverin",
                name: "橡胶JET大蛇炮",
                description: "蛇人形态的追踪攻击，拳头会改变轨迹追击敌人",
                damage: 140,
                manaCost: 65,
                image: "images/skills/culverin.svg"
            },
            {
                id: "gomu_black_mamba",
                name: "橡胶黑色曼巴",
                description: "连续发射无数追踪拳击，如同黑色曼巴蛇般迅猛",
                damage: 165,
                manaCost: 80,
                image: "images/skills/black_mamba.svg"
            },
            {
                id: "gomu_python",
                name: "橡胶大蟒蛇",
                description: "强化版的追踪攻击，威力和速度都大幅提升",
                damage: 155,
                effect: "增加下次攻击伤害45%",
                manaCost: 70,
                image: "images/skills/python.svg"
            },
            {
                id: "gomu_king_cobra",
                name: "橡胶大蛇王枪",
                description: "奥义：蛇人形态的最强一击，发出巨大的蛇王般的拳击，并恢复体力",
                damage: 270,
                effect: "恢复180生命值",
                manaCost: 155,
                isUltimate: true,
                image: "images/skills/king_cobra.svg"
            }
        ]
    }
};

// 导出角色数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = characters;
}