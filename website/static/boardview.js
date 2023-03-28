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
  document.querySelector("#board-title").innerHTML = get_new_title;
  cancelDisplayChange();
  //update the navbar here
  document.querySelectorAll("a.dropdown-item").forEach(element => {
    if (element.href == window.location.href){
      element.innerHTML = get_new_title;
    }
  });
  fetch("/boards/update-title", {
  method: "POST",
  body: JSON.stringify({boardId: boardId, boardName: get_new_title}),
  });
}


function showCategoryCreation() {
  if (document.getElementById("create-task-overlay") != null){
    document.getElementById("create-task-overlay").style.setProperty('display', 'none');
  }
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
  const new_title = document.getElementById("title-input-"+categoryId).value;
  document.querySelector("#category-title-"+categoryId).innerHTML = new_title;
  cancelEditCategory();
  fetch("/update-category-title", {
    method: "POST",
    body: JSON.stringify({categoryId: categoryId, newTitle: new_title, boardId: boardId}),
  });
}



function toggleTaskCompletion(taskId, boardId) {
  const completed = document.getElementById(taskId).checked;
  
  fetch("/toggle-task-completion", {
    method: "POST",
    body: JSON.stringify({taskId: taskId, complete: completed, boardId: boardId}),
  });

  // need to toggle the strikethrough and visibility on the date
  if(completed){
    document.getElementById(taskId).parentElement.style.setProperty("text-decoration", "line-through");
  } else {
    document.getElementById(taskId).parentElement.style.setProperty("text-decoration", "none");
  }

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

function taskDueOptions(){
  var toggleVar = document.getElementById("task-duedate-check").checked;
  if (toggleVar==true){
    document.getElementById("taskDueDateBox").style.setProperty("display", "inline-block");
  }
  else{
    document.getElementById("taskDueDateBox").style.setProperty("display", "none");
    document.getElementById("taskDueDateBox").value = '';
  }
}




function dragInitCategory(catID){
  
}