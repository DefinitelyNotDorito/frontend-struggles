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
    removeItem(itemID){
        this.inventory = this.inventory.filter(item => item.id !== itemID)
    }
    equipItem(item){
        switch (item.type){
            case 'weapon':
                this.equipped.weapon = item
                break
            case 'armor':
                this.equipped.armor = item
                break
            case 'shield':
                this.equipped.shield = item
        }
    }
    consumeItem(item){
        if (item.type === 'consumable'){
            if (item.effect.hp){
                this.hp = Math.min(this.maxhp, this.hp + item.effect.hp)
            }
            else if (item.effect.xp){
                this.xp += item.effect.xp
                this.levelup()
            }
            this.removeItem(item.id)
        }
    }
}
export class Item {
    constructor(name, id, price, description, rarity = 0, type){
        this.name = name
        this.id = id
        this.price = price
        this.description = description
        this.type = type
        this.rarity = ['common', 'uncommon', 'rare', 'epic', 'legendary']
        this.rarity = this.rarity[rarity]
    }
}

export class Weapon extends Item{
    constructor(name, id, price, description, damage, rarity){
        super(name, id, price, description, rarity, 'weapon')
        this.damage = damage
    }
}

export class Armor extends Item{
    constructor(name, id, price, description, armor, rarity){
        super(name, id, price, description, rarity, 'armor')
        this.armor  = armor
    }
}

export class Shield extends Item{
    constructor(name, id, price, description, defense, rarity){
        super(name, id, price, description, rarity, 'shield')
        this.defense  = defense
    }
}

export class Consumable extends Item{
    constructor(name, id, price, description, effect, rarity){
        super(name, id, price, description, rarity, 'consumable')
        this.effect = effect
    }
}