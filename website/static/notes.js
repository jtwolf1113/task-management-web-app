function deleteNote(noteId) {
    fetch("/delete-note", {
      method: "POST",
      body: JSON.stringify({ noteId: noteId }),
    }).then((_res) => {
      window.location.href = "/notes";
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
      window.location.href = "/notes";
    });
  }
  
  function editNoteDisplay(noteId) {
    document.querySelectorAll('.edit-note').forEach(noteElement =>{
      noteElement.style.setProperty('--edit-Note-data', 'None');
      noteElement.style.setProperty('--edit-Note-buttons', 'None');
    });
    document.querySelectorAll('.show-note').forEach(noteElement =>{
      noteElement.style.setProperty('--show-Note-data', 'inline');
    });

    const classSelector = ".N".concat(noteId);
    document.querySelectorAll(classSelector).forEach(noteElement =>{
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
        window.location.href = "/notes";
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