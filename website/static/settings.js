let root = document.documentElement;

function toggleSectionAppearance(varName){
    var element = document.getElementById(varName);
    if (root.style.getPropertyValue('--'+varName) == 'none'){
        root.style.setProperty('--'+varName, 'block');
        element.innerHTML = 'Hide';
    }
    else if (root.style.getPropertyValue('--'+varName) == 'block'){
        root.style.setProperty('--'+varName, 'none');
        element.innerHTML = 'Show';
    }
    else if (root.style.getPropertyValue('--'+varName) == ''){
        root.style.setProperty('--'+varName, 'block');
        element.innerHTML = 'Hide';
    }
}

function saveName(){
    const new_name = document.getElementById("name-input").value;
    document.getElementById("name-input").placeholder = new_name;
    fetch("/update-name", {
        method: "POST",
        body: JSON.stringify({name: new_name}),
    });
}

function revertName(){
    document.getElementById("name-input").value = document.getElementById("name-input").defaultValue;
}

function saveNewEmail(){
    email = document.getElementById("email1").value;
    confirm_email = document.getElementById("email2").value;
    if (email == confirm_email){
        document.getElementById("email1").placeholder = email;
        document.getElementById("email2").placeholder = email;
        fetch("/update-email", {
            method: "POST",
            body: JSON.stringify({newEmail: email}),
        });
        document.getElementById("email2").style.setProperty('border-color', 'revert');
        document.getElementById("email-dont-match").style.setProperty('display','none');
    }
    else {
        document.getElementById("email2").style.setProperty('border-color', '#f00');
        document.getElementById("email-dont-match").style.setProperty('display','block');
    }
}

function revertEmail(){
    document.getElementById("email1").value = document.getElementById("email1").defaultValue;
    document.getElementById("email2").value = document.getElementById("email2").defaultValue;
    document.getElementById("email-dont-match").style.setProperty('display','none');
    document.getElementById("email2").style.setProperty('border-color', 'revert');
}



function previewColorChange(id){
    const newColor = document.getElementById(id).value;
    root.style.setProperty('--'+id, newColor);
    var navbarIconColor = newColor.substring(1,8);
    //need to update collapse icon like so
    if (id == "navbar-text-color"){
        const iconURL = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='%23`+navbarIconColor+`' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`;
        document.getElementById("navbar-icon").style.setProperty('background-image', iconURL,"important");
    }
}

function revertColors(){
    document.querySelectorAll(".color-selection").forEach(element =>{
        element.value = element.defaultValue;
        previewColorChange(element.id);
    });
}

function saveColors(){
    var colorData = {};
    document.querySelectorAll(".color-selection").forEach(element=>{
        colorData[element.id] = element.value;
        element.defaultValue = element.value;
    })
    
    fetch("/update-colors", {
        method: "POST",
        body: JSON.stringify(colorData),
    });
}
