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