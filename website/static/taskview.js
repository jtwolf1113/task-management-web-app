function toggleTaskCompletion(taskId, boardId) {
    const redirectLocation = window.location.href;
    const completed = document.getElementById("task-completed-checkbox").checked;
    
    fetch("/toggle-task-completion", {
      method: "POST",
      body: JSON.stringify({taskId: taskId, complete: completed, boardId: boardId}),
    }).then((_res) => {
      window.location.href = redirectLocation;
    });
}
  
  
  
function showDueDate(due){
  const dueDate = new Date(due).getTime();
  var timeRemaining = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = dueDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (86400000));
    var hours = Math.floor((distance % (86400000)) / (3600000));
    var minutes = Math.floor((distance % (3600000 )) / (60000));
    var seconds = Math.floor((distance % (60000)) / 1000);  
    
    if (distance < 0) {
      days = -1*days - 1;
      hours = -1*hours - 1;
      minutes= -1*minutes - 1;
      seconds = -1*seconds - 1;

      var displayMessage = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
      displayMessage = displayMessage+ " Overdue!";
      document.getElementById("time-remaining").innerHTML = displayMessage;
      document.getElementById("time-remaining").style.setProperty('color', 'red');
      
    }
    else{
      var displayMessage = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
      displayMessage = "Remaining Time: " +displayMessage;
      document.getElementById("time-remaining").innerHTML = displayMessage;
      document.getElementById("time-remaining").style.setProperty('color', 'black');
    }
      // If the count down is finished, write some text

  }, 1000);
}
  
function startTimer(){
  const timeMin = document.getElementById("focus-timer-selection").value;
  var timeRemaining = timeMin*60;
  document.getElementById("focus-timer-label").style.setProperty("display", "none");
  document.getElementById("focus-timer-selection").style.setProperty("display", "none");
  document.getElementById("focus-timer-button").style.setProperty("display", "none");
  document.getElementById("time-remaining").style.setProperty("display", "none");
  document.getElementById("focus-timer-button").style.setProperty("display", "none");
  document.getElementById("delete-task").style.setProperty("display","none");

  document.getElementById("focus-timer").style.setProperty("display", "inline");

  var time = setInterval(function(){
    timeRemaining = timeRemaining - 1;
    var Min = Math.floor(timeRemaining / 60);
    var Sec = (timeRemaining % 60);
    displayMessage = Min+"m "+Sec+"s";
    document.getElementById("focus-timer").innerHTML=displayMessage;
    if (timeRemaining == 0){
      document.getElementById("focus-timer-label").style.setProperty("display", "inline-block");
      document.getElementById("focus-timer-selection").style.setProperty("display", "block");
      document.getElementById("focus-timer-button").style.setProperty("display", "inline-block");
      document.getElementById("time-remaining").style.setProperty("display", "block");
      document.getElementById("delete-task").style.setProperty("display","block");
      document.getElementById("focus-timer").style.setProperty("display", "none");
      clearInterval(time);
    }
  }, 1000);



}

function updateTaskTitle(taskId){
  const redirectLocation = window.location.href;
  const new_task_title = document.getElementById("task-title-input").value;

  fetch("/update-task-title", {
    method: "POST",
    body: JSON.stringify({taskId: taskId, }),
  }).then((_res) => {
    window.location.href = redirectLocation;
  });
}

function editTaskElement(elementClassSelector){
  //restore task editing to default
  document.querySelectorAll(".show-task").forEach(element=>{
    element.style.setProperty("display","block");
  });
  document.querySelectorAll(".update-task").forEach(element=>{
    element.style.setProperty("display","none");
  });


 //restore all subtask editing to default
  document.querySelectorAll(".show-subtask").forEach(element=>{
    if (element.tagName == 'H4' || element.tagName == 'SPAN' || element.tagName == 'INPUT'){
      element.style.setProperty("display","inline-block");
    }
    else{
      element.style.setProperty("display","block");
    }
    
  });
  document.querySelectorAll(".edit-subtask").forEach(element=>{
    element.style.setProperty("display","none");
  });


  document.querySelectorAll(elementClassSelector+".update-task").forEach(element=>{
    if (element.tagName == 'TEXTAREA' || element.tagName == 'SPAN' || element.tagName =='INPUT') {
      element.style.setProperty("display", "block");
    }
    else {
      element.style.setProperty("display", "inline-block");
    }
    element.style.setProperty("vertical-align", "center");
  });
  document.querySelector(elementClassSelector+".show-task").style.setProperty("display","none");
}

function cancelEditTask(elementClassSelector){
  document.querySelectorAll(".update-task").forEach(element=>{
    element.style.setProperty("display", "none");
  });
  document.querySelectorAll(".show-task").forEach(element=>{
    element.style.setProperty("display", "block");
  });
}

function updateTask(taskId, elementId){
  const redirectLocation = window.location.href;
  const data = document.getElementById(elementId).value;
  if (elementId == "due-date-input"){
    var key = "due-Date";
  }
  else if (elementId == "title-input"){
    var key = "title";
  }
  else if (elementId == "description-input"){
    var key = "description";
  }

  fetch("/update-task", {
    method: "POST",
    body: JSON.stringify({taskId: taskId, key: key, newData: data}),
  }).then((_res) => {
    window.location.href = redirectLocation;
  });
}

function deleteTask(taskId, boardname){
  const redirectLocation = "/boards/"+boardname;
  fetch("/delete-task", {
    method: "POST",
    body: JSON.stringify({taskId: taskId}),
  }).then((_res) => {
    window.location.href = redirectLocation;
  });
}

function setDefaultDate(dateString){
  var date = new Date(dateString);
  function formatLocalString(date){
    pad = function(num) {
      return (num < 10 ? '0' : '') + num;
    };

    return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) 
  }

  var due = formatLocalString(date);
  document.getElementById("due-date-input").defaultValue = due;
}

function subTaskDueOptions(){
  var toggleVar = document.getElementById("subtask-duedate-check").checked;
  if (toggleVar == true){
    document.getElementById("subtask-due-input").style.setProperty("display", "inline-block");
  }
  else {
    document.getElementById("subtask-due-input").style.setProperty("display", "none");
    document.getElementById("subtask-due-input").value = '';
  }
}

function deleteSubtask(subtaskId){
  const redirectLocation = window.location.href;
  fetch("/delete-subtask", {
    method: "POST",
    body: JSON.stringify({subtaskId: subtaskId}),
  }).then((_res) => {
    window.location.href = redirectLocation;
  });
}

function hideSubtaskForm(){
  document.getElementById("subtask-create-form").style.setProperty("display", "none");
  document.getElementById("show-form-button").style.setProperty("display", "inline-block");
}

function showSubtaskForm(){
  document.getElementById("subtask-create-form").style.setProperty("display", "block");
  document.getElementById("show-form-button").style.setProperty("display", "none");
}

function toggleSubtaskCompletion(subtaskId){
  const redirectLocation = window.location.href;
  const completed = document.getElementById("toggle-s"+subtaskId).checked;
    
    fetch("/toggle-subtask-completion", {
      method: "POST",
      body: JSON.stringify({subtaskId: subtaskId, complete: completed}),
    }).then((_res) => {
      window.location.href = redirectLocation;
    });
}

//THE BELOW SHOULD BE MODIFIED FOR SUBTASKS

function editSubtaskElement(elementClassSelector){
  //restore task editing to default
  document.querySelectorAll(".show-task").forEach(element=>{
    element.style.setProperty("display","block");
  });
  document.querySelectorAll(".update-task").forEach(element=>{
    element.style.setProperty("display","none");
  });


 //restore all subtask editing to default
  document.querySelectorAll(".show-subtask").forEach(element=>{
    if (element.tagName == 'H4' || element.tagName == 'SPAN' || element.tagName == 'INPUT'){
      element.style.setProperty("display","inline-block");
    }
    else{
      element.style.setProperty("display","block");
    }
    
  });
  document.querySelectorAll(".edit-subtask").forEach(element=>{
    element.style.setProperty("display","none");
  });


//for each relevant element check how to properly display it
  document.querySelectorAll(elementClassSelector+".edit-subtask").forEach(element=>{
    if (element.tagName == 'TEXTAREA' || element.tagName == 'SPAN' || element.tagName =='INPUT') {
      element.style.setProperty("display", "block");
    }
    else {
      element.style.setProperty("display", "inline-block");
    }
    element.style.setProperty("vertical-align", "center");
  });
  document.querySelectorAll(elementClassSelector+".show-subtask").forEach(element=>{
    element.style.setProperty("display","none");
  });
}



function cancelEditSubtask(){
  document.querySelectorAll(".edit-subtask").forEach(element=>{
    element.style.setProperty("display", "none");
  });
  document.querySelectorAll(".show-subtask").forEach(element=>{
    if (element.tagName == 'H4' || element.tagName == 'SPAN' || element.tagName == 'INPUT'){
      element.style.setProperty("display","inline-block");
    }
    else{
      element.style.setProperty("display", "block");
    }
    
  });
}

function updateSubtask(subtaskId, elementId){
  const redirectLocation = window.location.href;
  const data = document.getElementById(elementId).value;
  
  if (elementId == "subtask-duedate-input-s"+subtaskId){
    var key = "due-Date";
  }
  else if (elementId == "subtask-title-input-s"+subtaskId){
    var key = "title";
  }
  else if (elementId == "subtask-description-input-s"+subtaskId){
    var key = "description";
  }
  console.log(key);
  fetch("/update-subtask", {
    method: "POST",
    body: JSON.stringify({subtaskId: subtaskId, key: key, newData: data, url: redirectLocation}),
  }).then((_res) => {
    window.location.href = redirectLocation;
  });
}
