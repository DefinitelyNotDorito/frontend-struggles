import { multiClassEdit, iconSelector } from "./utils.js"
import { Player, getRandomItem, Weapon, Consumable, Armor, Shield } from "./game-functionality.js"

const player = new Player()

let b_buttons = document.querySelectorAll(".begin-button")
let bb_counter = 0
let b_boxes = document.querySelectorAll(".begin-box")
let sidebar_buttons = document.querySelectorAll(".sidebar-button")

let xpw = 0

const username_input = document.querySelector("#username-input")
const money_counter = document.querySelector("#money-count")
const xp_bar = document.querySelector("#level-progress")
const level_counter = document.querySelector("#level-count")

const stat_level = document.querySelector("#stat-level")
const stat_hp = document.querySelector("#stat-hp")
const stat_xp = document.querySelector("#stat-xp")
const stat_money = document.querySelector("#stat-money")
const stat_name = document.querySelector("#stat-name")
const stat_invnum = document.querySelector("#stat-invnum")

const inventory_container = document.querySelector(".inventory-item-container")
const inventory_clear_button = document.querySelector("#clear-inventory")
const random_item_button = document.querySelector("#rand-item-btn")

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
    stat_name.innerHTML = plyr.username
    stat_hp.innerHTML = `${plyr.hp} / ${plyr.maxhp}`
    stat_level.innerHTML = plyr.level
    stat_xp.innerHTML = `${plyr.xp} / ${(plyr.level + 1) * 10}`
    stat_money.innerHTML = plyr.money
    stat_invnum.innerHTML = plyr.inventory.length
}


function updateStats(plyr, money = 0, xp = 0, hp = 0, itmArray = []){

    plyr.money += money
    money_counter.innerHTML = plyr.money

    plyr.xp += xp
    plyr.levelup()
    level_counter.innerHTML = plyr.level

    xpw = plyr.xp / (plyr.level + 1) * 10
    xp_bar.style.width = `${xpw}%`

    itmArray.forEach(itm => {
        plyr.inventory.push(itm)
    });
    refreshInventory(plyr)
    statsTab(plyr)
    
}

random_item_button.addEventListener("click", () => {
    player.inventory.push(getRandomItem())
    updateStats(player)
    console.log(player)
})
inventory_clear_button.addEventListener("click", () => {
    player.inventory = []
    updateStats(player)
})

function refreshInventory(plyr){

    inventory_container.innerHTML = ''

    plyr.inventory.forEach(item => {
        let itmico = iconSelector(item.type)

        const itemHtml = document.createElement("div")
        const itemName = document.createElement("p")
        const itemIcon = document.createElement("i")

        itemName.innerHTML = item.name
        itemIcon.className = `fa-solid ${itmico} item-icon`
        itemName.classList = 'item-name'
        itemHtml.classList = `inventory-item ${item.rarity}`
        itemHtml.appendChild(itemIcon)
        itemHtml.appendChild(itemName)

        inventory_container.appendChild(itemHtml)
    });
}

