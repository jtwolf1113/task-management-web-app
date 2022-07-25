document.addEventListener('DOMContentLoaded', function(){
    //update every 60 seconds
    var today = new Date();

    var date = (today.getMonth()+1)+" "+today.getDate()+", "+today.getHours()+":"+today.getMinutes();

    document.querySelector("h3#current-time").innerHTML = date;
    });