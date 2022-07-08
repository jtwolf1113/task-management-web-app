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
  document.getElementById("create-task-overlay").style.setProperty('display', 'none');
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
  document.getElementById("create-category-overlay").style.setProperty('display', 'none');
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
  cancelEditCategory();
  document.querySelectorAll(".edit-category.C"+categoryId).forEach(element => {
    element.style.setProperty("display", "inline-block");
  });
  document.querySelector(".display-category.C"+categoryId).style.setProperty("display", "none");
}

function cancelEditCategory(){
  document.querySelectorAll(".edit-category").forEach(element => {
    element.style.setProperty("display", "none");
  });
  document.querySelectorAll(".display-category").forEach(element=>{
    element.style.setProperty("display", "block");
  });
}

function updateCategoryTitle(categoryId, boardId){
  const redirectLocation = window.location.href;
  const new_title = document.getElementById("title-input-"+categoryId).value;

  fetch("/update-category-title", {
    method: "POST",
    body: JSON.stringify({categoryId: categoryId, newTitle: new_title, boardId: boardId}),
  }).then((_res)=> {
    window.location.href = redirectLocation;
  });

}



function toggleTaskCompletion(taskId, boardId) {
  const redirectLocation = window.location.href;
  const completed = document.getElementById(taskId).checked;
  
  fetch("/toggle-task-completion", {
    method: "POST",
    body: JSON.stringify({taskId: taskId, complete: completed, boardId: boardId}),
  }).then((_res) => {
    window.location.href = redirectLocation;
  });
}

function deleteCategory(catId){
  const redirectLocation = window.location.href;
  fetch("/delete-category", {
    method: "POST",
    body: JSON.stringify({catId: catId}),
  }).then((_res) => {
    window.location.href = redirectLocation;
  });
}

function showDeleteConfirmation(passed_command, item_type){
  document.querySelector(".filter-out-background").style.setProperty("display", "block");

  document.querySelectorAll(".destroy-item").forEach(element=>{
    if (element.tagName == 'BUTTON' && element.id == 'destroy-item-confirm'){
      element.setAttribute('onclick', passed_command);
    }
    else if (element.tagName == 'H3'){
      if (item_type == "board"){
        var message = "board, and its categories, tasks and subtasks?";
      }
      else if(item_type == "category"){
        var message = "category and its tasks and subtasks?";
      }
      else if(item_type == "task"){
        var message = "task and its subtasks?";
      }
      else if(item_type == "subtask"){
        var message = "subtask?";
      }
      else if(item_type == "note"){
        var message = "note?";
      }

      element.innerHTML = "Delete "+ message;
    }
  });
  
}

function cancelDeleteConfirmation(){
  document.querySelector(".filter-out-background").style.setProperty("display", "none");
}