export function multiClassEdit(target, cmode, class_array){
    if(cmode == 0 || cmode == "remove"){
        class_array.forEach(c2add => {
            target.classList.remove(c2add)
        });
    }
    else if(cmode == 1 || cmode == "add" ){
        class_array.forEach(c2add => {
            target.classList.add(c2add)
        });
    }
    else if(cmode == 2 || cmode == "toggle"){
        class_array.forEach(c2add => {
            target.classList.toggle(c2add)
        });
    }
}

export function iconSelector(type){
    const icons = {
        'weapon': 'fa-sword',
        'shield': 'fa-shield',
        'armor': 'fa-shirt',
        'consumable': 'fa-flask-round-potion'
    }
    return icons[type] || 'fa-question'
}