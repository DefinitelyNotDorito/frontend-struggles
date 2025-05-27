let b_buttons = document.querySelectorAll(".begin-button")
let bb_counter = 0
let b_boxes = document.querySelectorAll(".begin-box")
let username = ""
let username_input = document.querySelector("#username-input")


b_buttons[bb_counter].addEventListener("click", bbToggle)

function bbToggle(){
    b_boxes[bb_counter].classList.add("fade-out")
    b_buttons[bb_counter].removeEventListener("click", bbToggle)

    setTimeout(() => {
        b_boxes[bb_counter].classList.add("hidden")
        console.log(`${b_boxes.length} ${bb_counter}`)
        if(b_boxes.length - 1 > bb_counter){
            b_boxes[bb_counter+1].classList.remove("hidden")
            bb_counter += 1
            b_buttons[bb_counter].addEventListener("click", bbToggle)
            console.log(bb_counter, b_boxes.length)
        }
        else if(bb_counter + 1 == b_boxes.length){
            console.log("in")
            let b = document.querySelector(".begin")
            document.querySelector(".game-header").style.opacity = 1
            b.classList.add("fade-out")
            
            setTimeout(() => {
                b.remove()
            }, 500);
        }

    }, 400);

    if(bb_counter == 1){
        username = username_input.value
        document.querySelector("#player-name").innerHTML = username
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
});

