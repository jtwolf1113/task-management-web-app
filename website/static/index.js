let root = document.documentElement;

function deleteNote(noteId) {
  fetch("/delete-note", {
    method: "POST",
    body: JSON.stringify({ noteId: noteId }),
  }).then((_res) => {
    window.location.href = "/";
  });
}

function toggleNoteCompletion(noteId) {
  const classSelector = "#show-note-checkbox.show-note.N".concat(noteId);
  const note = document.querySelector(classSelector);
  console.log(note.checked);
  const completed = note.checked;

  fetch("/toggle-note", {
    method: "POST",
    body: JSON.stringify({noteId: noteId, complete: completed}),
  }).then((_res) => {
    window.location.href = "/";
  });
}

function editNoteDisplay(noteId) {
  const classSelector = ".N".concat(noteId);
  const noteData = document.querySelectorAll(classSelector);
  noteData.forEach(noteElement =>{
  noteElement.style.setProperty('--show-Note-data', 'None');
  noteElement.style.setProperty('--edit-Note-data', 'block');
  noteElement.style.setProperty('--edit-Note-buttons', 'inline-block');
  });
}

function cancelNoteChange(noteId) {
  const classSelector = ".N".concat(noteId);
  const noteData = document.querySelectorAll(classSelector);
  noteData.forEach(noteElement =>{
  noteElement.style.setProperty('--show-Note-data', 'inline');
  noteElement.style.setProperty('--edit-Note-data', 'None');
  noteElement.style.setProperty('--edit-Note-buttons', 'None');
  });
}

function updateNoteData(noteId){
  const classSelector = "textarea.N".concat(noteId);
  const note_data = document.querySelector(classSelector);
  const new_note_data = note_data.value;

  fetch("/update-note", {
    method: "POST",
    body: JSON.stringify({noteId: noteId, noteData: new_note_data}),
    }).then((_res)=> {
      window.location.href = "/";
    });
}


function deleteBoard(boardId) {
  fetch("/boards/delete-board", {
    method: "POST",
    body: JSON.stringify({boardId: boardId}),
  }).then((_res)=> {
    window.location.href = "/boards";
  });
}

function editTitleDisplay(){
  root.style.setProperty('--show-title', 'None');
  root.style.setProperty('--show-input-box', 'inline');
  root.style.setProperty('--show-changename-button', 'inline');
}

function cancelDisplayChange(){
  root.style.setProperty('--show-title', 'block');
  root.style.setProperty('--show-input-box', 'None');
  root.style.setProperty('--show-changename-button', 'None');
}



function updateTitle(boardId) {
  const get_new_title = document.getElementById("board-title-input").value;

  fetch("/boards/update-title", {
  method: "POST",
  body: JSON.stringify({boardId: boardId, boardName: get_new_title}),
  }).then((_res)=> {
    window.location.href = "/boards/"+get_new_title;
  });
}


function showCategoryCreation() {
  document.getElementById("create-category-overlay").style.setProperty('display', 'block');
}

function cancelNewCategoryDisplay(){
  document.getElementById("create-category-overlay").style.setProperty('display', 'none');
}

function saveNewCategory(boardId){
  const redirectLocation = window.location.href;
  const categoryName = document.getElementById("categoryTitleBox").value;
  fetch("/boards/add-category", {
    method: "POST",
    body: JSON.stringify({boardId: boardId, categoryName: categoryName}),
  }).then((_res)=> {
    window.location.href = redirectLocation;
  });
}


function showTaskCreation(boardId, categoryId) {
  document.getElementById("create-task-overlay").style.setProperty('display', 'block');
  document.getElementById("add-task-button").onclick= function () { saveNewTask(boardId, categoryId); };
}

function cancelNewTaskDisplay(){
  document.getElementById("create-task-overlay").style.setProperty('display', 'none');
}

function saveNewTask(boardId, category){

  const redirectLocation = window.location.href;
  const taskName =document.getElementById("taskTitleBox").value;
  const taskDescription = document.getElementById("taskDescriptionBox").value;
  const taskDueDate =document.getElementById("taskDueDateBox").value;
  
  fetch("/boards/add-task", {
    method: "POST",
    body: JSON.stringify({boardId: boardId, categoryId: category, taskName: taskName, taskDescription: taskDescription, taskDueDate: taskDueDate}),
    }).then((_res)=> {
      window.location.href = redirectLocation;
    });
}



//default due date is now
var date = new Date();
var now = date.toLocaleString();
document.getElementById("taskDueDateBox").defaultValue = now;

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
      days = days*-1;
      hours = hours*-1;
      minutes=minutes*-1;
      seconds = seconds*-1;


      var displayMessage = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
      displayMessage = displayMessage+ " Overdue!";
      document.getElementById("time-remaining").innerHTML = displayMessage;
      document.getElementById("time-remaining").style.setProperty('color', 'red');
      
    }
    else{
      var displayMessage = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
      displayMessage = "Due in: " +displayMessage;
      document.getElementById("time-remaining").innerHTML = displayMessage;
      document.getElementById("time-remaining").style.setProperty('color', 'black');
    }



    
    

    // If the count down is finished, write some text

  }, 1000);
}




