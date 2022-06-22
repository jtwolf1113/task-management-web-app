let root = document.documentElement;


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

function editCategoryDisplay(categoryId){
  //categoryId=categoryId.toLocaleString();
  document.getElementById("category-title-"+categoryId).style.setProperty("display", "none");
  document.getElementById("new-category-name-"+categoryId).style.setProperty("display", "inline");
  document.getElementById("").style.setProperty("display", "inline");
}

function cancelEditCategory(categoryId){
  document.getElementById("category-title-"+categoryId).style.setProperty("display", "inline");
  document.getElementById("new-category-name-"+categoryId).style.setProperty("display", "none");
  //document.getElementById("").style.setProperty("display", "none");
}

//default due date is now
var date = new Date();
var now = date.toLocaleString();
document.getElementById("taskDueDateBox").defaultValue = now;