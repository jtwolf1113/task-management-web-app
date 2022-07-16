//On startup need to adjust the colors and fonts to user selections

document.addEventListener("DOMContentLoaded", function(){
  document.querySelectorAll("p.template-information-section").forEach(element=>{
    document.documentElement.style.setProperty('--'+element.id, element.innerHTML);
    if (element.id == "navbar-text-color"){
      const iconURL = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='%23`+element.innerHTML.substring(1,8)+`' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`;
      document.getElementById("navbar-icon").style.setProperty('background-image', iconURL,"important");
    }
  });
});

//show delete item menu
function showDeleteConfirmation(passed_command, item_type){
    document.querySelector(".filter-out-background").style.setProperty("display", "block");
  
    document.querySelectorAll(".destroy-item").forEach(element=>{
      if (element.tagName == 'BUTTON' && element.id == 'destroy-item-confirm'){
        element.setAttribute('onclick', passed_command);
      }
      else if (element.tagName == 'H3'){
        if (item_type == "account"){
          var message = "account and all its associated data."
        }
        else if (item_type == "board"){
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
// hide the delete item menu
function cancelDeleteConfirmation(){
  document.querySelector(".filter-out-background").style.setProperty("display", "none");
} 
        