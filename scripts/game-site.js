import { multiClassEdit, iconSelector } from "./utils.js"
import { Player, getRandomItem, Weapon, Consumable, Armor, Shield } from "./game-functionality.js"

const player = new Player()

const b_buttons = document.querySelectorAll(".begin-button")
const b_boxes = document.querySelectorAll(".begin-box")

let bb_counter = 0
let xpw = 0
let hpw = 100

const username_input = document.querySelector("#username-input")

username_input.addEventListener("keyup", userCheck)
b_buttons[bb_counter].addEventListener("click", bbToggle)

function bbToggle(){
    b_boxes[bb_counter].classList.add("fade-out")
    b_buttons[bb_counter].removeEventListener("click", bbToggle)

    setTimeout(() => {
        b_boxes[bb_counter].classList.add("hidden")
        if(b_boxes.length - 1 > bb_counter){
            b_boxes[bb_counter+1].classList.remove("hidden")
            bb_counter += 1
            b_buttons[bb_counter].addEventListener("click", bbToggle)
        }
        else if(bb_counter + 1 == b_boxes.length){
            let b = document.querySelector(".begin")
            document.querySelector(".game-header").style.opacity = 1
            b.classList.add("fade-out")
            setTimeout(() => {
                b.remove()
            }, 500);
        }

    }, 400);

    if(bb_counter == 1){
        player.username = username_input.value
        document.querySelector("#player-name").innerHTML = player.username
        statsTab(player)
        updateStats(player)
    }

}

function userCheck(){
    console.log(username_input.value.length, bb_counter)
    if(username_input.value.length > 2){
        b_buttons[bb_counter].disabled = false
    }
    else{
        b_buttons[bb_counter].disabled = true
    }
}

const sidebar_buttons = document.querySelectorAll(".sidebar-button")
sidebar_buttons.forEach(sidebar_button => {
    sidebar_button.addEventListener("mouseover", () => {
        sidebar_button.querySelector("span").classList.remove("hidden-sidebar-label")
    })
    sidebar_button.addEventListener("mouseout", () => {
        sidebar_button.querySelector("span").classList.add("hidden-sidebar-label")
    })
    sidebar_button.addEventListener("click", () => {
        let tabs = document.querySelectorAll(".game-tab")

        tabs.forEach(tab => {

            if(tab.id == sidebar_button.id.substring(2)){
                multiClassEdit(tab, "remove", ["hidden", "d-none"])
                tab.classList.add("selected-tab")
            }
            else{
                multiClassEdit(tab, "add", ["hidden", "d-none"])
                tab.classList.remove("selected-tab")
            }
        });

    })
});

function statsTab(plyr){
    const stat_list = document.querySelector("#stat-list")
    stat_list.innerHTML = `
    <li>Username: ${plyr.username}</li>
    <li>Health: ${plyr.hp} / ${plyr.maxhp}</li>
    <li>Level: ${plyr.level}</li>
    <li>XP: ${plyr.xp} / ${(plyr.level + 1) * 10}</li>
    <li># of items: ${plyr.inventory.length}</li>
    `
    console.log(plyr)
}


function updateStats(plyr, money = 0, xp = 0, hp = 0, itmArray = []){
    const money_counter = document.querySelector("#money-count")
    const xp_bar = document.querySelector("#level-progress")
    const level_counter = document.querySelector("#level-count")
    const hp_bar = document.querySelector("#hp-progress")
    const hp_counter = document.querySelector("#hp-count")

    plyr.money += money
    money_counter.innerHTML = plyr.money

    plyr.xp += xp
    plyr.levelup()
    level_counter.innerHTML = plyr.level

    xpw = plyr.xp / (plyr.level + 1) * 10
    xp_bar.style.width = `${xpw}%`

    plyr.hp = Math.min(plyr.hp += hp, plyr.maxhp)

    if (plyr.hp <= 0){
        plyr.hp = 0
        //add dying
    }

    hp_counter.innerHTML = `${plyr.hp} / ${plyr.maxhp}`

    hpw = (plyr.hp / plyr.maxhp) * 100
    if (hpw < 0){
        hpw = 0
    }
    hp_bar.style.width = `${hpw}%`

    itmArray.forEach(itm => {
        plyr.inventory.push(itm)
    });

    statsTab(plyr)
    updateInv(plyr)
}

function updateInv(plyr){
    const inv = document.querySelector(".inv-container")
    inv.innerHTML = ''
    plyr.inventory.forEach(item => {
        const itm = document.createElement("div")
        const itmName = document.createElement("h3")
        const itmIcon = document.createElement("i")
        const itmStuff = document.createElement('div')
        const itmBtns = document.createElement("div")
        const itmDesc = document.createElement("h4")
        const itemRar = document.createElement("p")
        const sellBtn = document.createElement('button')
        
        itmStuff.classList = 'item-stuff hidden'
        itmBtns.classList = 'item-buttons hidden'

        itmDesc.innerHTML = item.description
        itmDesc.classList = 'item-description'
        itemRar.innerHTML = item.rarity
        itemRar.classList = 'item-rarity'
        itmStuff.appendChild(itmDesc)
        itmStuff.appendChild(itemRar)

        if(item.type === 'consumable'){
            const consumebtn = document.createElement('button')
            consumebtn.classList = `item-action-button consume-button`
            consumebtn.addEventListener('click', () => itemAction(plyr, item, 'use'))
            consumebtn.innerHTML = 'USE'
            itmBtns.appendChild(consumebtn)
        }
        else{
            const equipbtn = document.createElement('button')
            equipbtn.addEventListener('click', () => itemAction(plyr, item, 'equip'))
            equipbtn.classList = `item-action-button equip-button`
            equipbtn.innerHTML = 'Equip'
            itmBtns.appendChild(equipbtn)
        }
        sellBtn.classList = 'item-action-button sell-button'
        sellBtn.addEventListener('click', () => itemAction(plyr,item, 'sell'))
        sellBtn.innerHTML = `Sell (${Math.ceil(item.price/2)}G)`
        itmBtns.appendChild(sellBtn)

        itm.classList.add('inv-item')
        itmName.classList.add('item-name')
        itmIcon.classList = `fa-solid ${iconSelector(item.type)} item-icon`
        itmName.innerHTML = item.name
        itm.appendChild(itmIcon)
        itm.appendChild(itmName)
        itm.appendChild(itmStuff)
        itm.appendChild(itmBtns)
        itm.addEventListener('click', (e) => selectItem(e, itm, inv))
        inv.appendChild(itm)
    });
}

function selectItem(e, itm, inv) {
    if (e.target.closest('.item-action-button')) {
        return; 
    }
    const itemStuff = itm.querySelector('.item-stuff')
    const itemButtons = itm.querySelector('.item-buttons')
    if(itm.classList.contains('selected-item')){
        itm.classList.remove('selected-item')
        itemStuff.classList.add('hidden')
        itemButtons.classList.add('hidden')
        return;
    }
    document.querySelectorAll('.selected-item').forEach(s_item => {
        s_item.classList.remove('selected-item')
        s_item.querySelector('.item-stuff').classList.add('hidden')
        s_item.querySelector('.item-buttons').classList.add('hidden')
    })

    itm.classList.add('selected-item')
    itemStuff.classList.remove('hidden')
    itemButtons.classList.remove('hidden')
    inv.prepend(itm)
}

function itemAction(plyr, itm, action){
    switch (action){
        case 'use':
            plyr.consumeItem(itm)
            console.log(`used ${itm.name}`)
            updateStats(plyr)
            break;
        case 'equip':
            plyr.equipItem(itm)
            console.log(`equipped ${itm.name}`)
            updateStats(plyr)
            break;
        case 'sell':
            plyr.money += (Math.ceil(itm.price / 2))
            console.log(`sold ${itm.name}`)
            plyr.removeItem(itm.id)
            updateStats(plyr)
            break;
    }
}

document.querySelector('.button-that-does-everything').addEventListener('click', () => updateStats(player, 3, 3, -3, [getRandomItem()]))