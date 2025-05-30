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
    levelup(counter) {
        while(this.xp >= (this.level + 1) * 10){
            this.level += 1
            this.xp -= this.level * 10
            counter.innerHTML = this.level
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
    constructor(name, id, price, description, type){
        this.name = name
        this.id = id
        this.price = price
        this.description = description
        this.type = type
    }
}

export class Weapon extends Item{
    constructor(name, id, price, description, damage){
        super(name, id, price, description, 'weapon')
        this.damage = damage
    }
}

export class Armor extends Item{
    constructor(name, id, price, description, armor){
        super(name, id, price, description, 'armor')
        this.armor  = armor
    }
}

export class Shield extends Item{
    constructor(name, id, price, description, defense){
        super(name, id, price, description, 'shield')
        this.defense  = defense
    }
}

export class Consumable extends Item{
    constructor(name, id, price, description, effect){
        super(name, id, price, description, 'consumable')
        this.effect = effect
    }
}