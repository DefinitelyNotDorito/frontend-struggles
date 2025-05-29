export class Player {
    constructor(){
        this.username = ""
        this.money = 0
        this.level = 0
        this.xp = 0
    }
    levelup(counter) {
        while(this.xp >= (this.level + 1) * 10){
            this.level += 1
            this.xp -= this.level * 10
            counter.innerHTML = this.level
        }
    }
}