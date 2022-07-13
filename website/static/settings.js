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



