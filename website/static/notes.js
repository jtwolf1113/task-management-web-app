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
  
  