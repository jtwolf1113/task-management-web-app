document.addEventListener('DOMContentLoaded', function(){
    //update every 60 seconds
    var today = new Date()
    var date = (today.getMonth()+1).toString()+"/"+today.getDate().toString().padStart(2, '0')+", "+today.getHours().toString().padStart(2, '0')+":"+today.getMinutes().toString().padStart(2, '0')+":"+today.getSeconds().toString().padStart(2, '0');
    document.querySelector("h3#current-time").innerHTML = date;
    });

var clock_display_calculation = setInterval(function(){
    var today = new Date()
    var date = (today.getMonth()+1).toString()+"/"+today.getDate().toString().padStart(2, '0')+", "+today.getHours().toString().padStart(2, '0')+":"+today.getMinutes().toString().padStart(2, '0')+":"+today.getSeconds().toString().padStart(2, '0');
    document.querySelector("h3#current-time").innerHTML = date;
}, 100); 



