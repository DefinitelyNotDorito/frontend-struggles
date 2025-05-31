export class Player {
    constructor(username = '', money = 0, level = 0, xp = 0, hp = 40, maxhp = 40){
        this.username = username
        this.money = money
        this.level = level
        this.xp = xp
        this.hp = hp
        this.maxhp = maxhp
        this.inventory = []
        this.equipped = {
            weapon: null,
            armor: null,
            shield: null
        }
    }
    levelup() {
        while(this.xp >= (this.level + 1) * 10){
            this.level += 1
            this.xp -= this.level * 10
        }
    }
    addItem(item){
        this.inventory.push(item)
    }
    removeItem(item){
        const index = this.inventory.indexOf(item)
        if(index != -1){
            this.inventory.splice(index, 1)
        }
    }
    equipItem(item){
        if(item.reqlvl <= this.level){
            switch (item.type){
                case 'weapon':
                    this.equipped.weapon = item
                    break
                case 'armor':
                    this.equipped.armor = item
                    break
                case 'shield':
                    this.equipped.shield = item
                    break
            }
        }
        else{
            alert("You're not high enough level!")
        }
    }
    consumeItem(item){
        if (item.reqlvl > this.level){
            alert("You're not high enough level!")
        }
        else{
            if (item.effect.hp){
                this.hp = Math.min(this.maxhp, this.hp + item.effect.hp)
            }
            else if (item.effect.xp){
                this.xp += item.effect.xp
                this.levelup()
            }
            this.removeItem(item)
        }

    }
}
export class Item {
    constructor(name, id, price, description, rarity = 0, type, reqlvl = 0){
        this.name = name
        this.id = id
        this.price = price
        this.description = description
        this.type = type
        this.reqlvl = reqlvl
        this.rarity = ['common', 'uncommon', 'rare', 'epic', 'legendary']
        this.rarity = this.rarity[rarity]
    }
}

export class Weapon extends Item{
    constructor(name, id, price, description, damage, rarity, reqlvl){
        super(name, id, price, description, rarity, 'weapon', reqlvl)
        this.damage = damage
    }
}

export class Armor extends Item{
    constructor(name, id, price, description, armor, rarity, reqlvl){
        super(name, id, price, description, rarity, 'armor', reqlvl)
        this.armor  = armor
    }
}

export class Shield extends Item{
    constructor(name, id, price, description, defense, rarity, reqlvl){
        super(name, id, price, description, rarity, 'shield', reqlvl)
        this.defense  = defense
    }
}

export class Consumable extends Item{
    constructor(name, id, price, description, effect, rarity, reqlvl){
        super(name, id, price, description, rarity, 'consumable', reqlvl)
        this.effect = effect
    }
}

let items = {
    'consumables':{
    'hp_s':new Consumable('Health Potion (small)', 'hp_s', 10, 'A small health potion (heals 10hp)', {'hp':10}, 1),
    'hp_m':new Consumable('Health Potion (medium)', 'hp_m', 15, 'A medium health potion (heals 20hp) [requires level 5]', {'hp':20}, 2, 5),
    'hp_l':new Consumable('Health Potion (large)', 'hp_l', 30, 'A large health potion (heals 40hp) [requires level 10]', {'hp':40}, 2, 10)
    },
    'weapons':{
        'sword_Wood':new Weapon('Wooden Sword', 'sword_wood', 5, 'A dull wooden sword... (2 damage)', 2, 0),
        'sword_iron':new Weapon('Iron Sword', 'sword_iron', 15, 'A sharp iron sword! (7 damage) [requires level 5]', 7, 1, 5),
        'sword_epic':new Weapon('Epic sword (testing)', 'sword_epic', 150, 'An epic sword! (420 damage) [req lvl 50]', 420, 3, 50)
    },
    'armors':{
        'armor_leather': new Armor('Leather Armor', 'armor_leather', 10, 'Some leather armor.. better than nothing? (3 armor)', 3, 0, 0),
        'armor_iron': new Armor('Iron Armor', 'armor_iron', 25, 'Some iron armor! Definitely an improvement.. (6 armor) [requires level 5]', 6, 1, 5),
        'armor_legendary': new Armor('Legendary Armor (testing)', 'armor_leg',500,'Some legendary armor (6969 armor) [req lvl 100]', 6969, 4, 100)

    }
}

export function getRandomItem(){
    let randcategory = Object.keys(items)[Math.floor(Math.random() * Object.keys(items).length)]
    let randkeys = Object.keys(items[randcategory])
    let randomitemkey = randkeys[Math.floor(Math.random() * randkeys.length)]

    return items[randcategory][randomitemkey]
}
