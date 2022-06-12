let root = document.documentElement;

function deleteNote(noteId) {
  fetch("/delete-note", {
    method: "POST",
    body: JSON.stringify({ noteId: noteId }),
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

