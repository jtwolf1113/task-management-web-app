function deleteNote(noteId) {
  const classSelector = ".N".concat(noteId);
  document.querySelectorAll(classSelector).forEach(element => {
    element.style.setProperty('display', 'none');
  });
  cancelDeleteConfirmation();
    fetch("/delete-note", {
      method: "POST",
      body: JSON.stringify({ noteId: noteId }),
    });
  }
  
function toggleNoteCompletion(noteId) {
  const classSelector = ".show-note.N".concat(noteId);
  const note = document.querySelector(classSelector);
  const completed = note.checked;

  fetch("/toggle-note", {
    method: "POST",
    body: JSON.stringify({noteId: noteId, complete: completed}),
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

  document.querySelector("span.show-note.N".concat(noteId)).innerHTML = new_note_data;
  cancelNoteChange(noteId);
  fetch("/update-note", {
    method: "POST",
    body: JSON.stringify({noteId: noteId, noteData: new_note_data}),
    });
}
  