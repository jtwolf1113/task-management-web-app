document.addEventListener('DOMContentLoaded', function(){
    var today = new Date();

    var date = (today.getMonth()+1)+" "+today.getDate()+", "+today.getHours()+":"+today.getMinutes();

    document.querySelector("h3#current-time").innerHTML = date;
    });