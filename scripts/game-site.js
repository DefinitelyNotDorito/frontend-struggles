import { multiClassEdit } from "./utils.js"
import { Player } from "./game-functionality.js"

let player = new Player()

let b_buttons = document.querySelectorAll(".begin-button")
let bb_counter = 0
let b_boxes = document.querySelectorAll(".begin-box")
let username_input = document.querySelector("#username-input")

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

let sidebar_buttons = document.querySelectorAll(".sidebar-button")

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
                tab.style.display = "grid"
                tab.classList.remove("hidden")
                tab.classList.add("selected-tab")
            }
            else{
                tab.classList.add("hidden")
                tab.style.display = "none"
            }
        });

    })
});
let money_counter = document.querySelector("#money-count")

document.querySelector("#adv-go-button").addEventListener("click", () => {
    player.money += 1
    money_counter.innerHTML = player.money
})

document.querySelector("#temporary-stat-logger-button").addEventListener("click", () => {
    console.log(player)
})