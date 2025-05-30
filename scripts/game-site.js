import { multiClassEdit } from "./utils.js"
import { Player, Weapon } from "./game-functionality.js"

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

const inventory_container = document.querySelector(".inventory-container")

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

document.querySelector("#adv-go-button").addEventListener("click", () => {
    updateStats(player, 5, 10)
})

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

    statsTab(plyr)
}

let sword1 = new Weapon("Iron Sword", "sword_iron", 5, "sword made of iron", 5, 2)

document.querySelector("#invaddbtn").addEventListener("click", () => {addItem(sword1)})

function addItem(item){
    let item_element = document.createElement("div")
    let item_name = document.createElement("p")
    let item_icon = document.createElement("i")

    item_name.classList.add("item-name")
    item_name.innerHTML = item.name

    multiClassEdit(item_icon, "add", ['fa-solid', 'item-icon'])
    switch(item.type){
        case 'armor':
            item_icon.classList.add("fa-shirt")
            break
        case 'shield':
            item_icon.classList.add("fa-shield")
            break
        case 'weapon':
            item_icon.classList.add("fa-sword")
            break
        case 'consumable':
            item_icon.classList.add("fa-flask-round-potion")
    }
    
    multiClassEdit(item_element, "add", [`${item.rarity}`, 'inventory-item'])

    item_element.appendChild(item_icon)
    item_element.appendChild(item_name)
    inventory_container.appendChild(item_element)
}