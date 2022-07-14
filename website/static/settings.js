let root = document.documentElement;

function toggleAppearance(varName){
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
    //gather all the data into a json
    //send the json to the backend
    //update info on the backend
    //don't refresh the page
    var colorData = {};
    document.querySelectorAll(".color-selection").forEach(element=>{
        colorData[element.id] = element.value;
    })
    
    fetch("/update-colors", {
        method: "POST",
        body: JSON.stringify(colorData),
    });
}