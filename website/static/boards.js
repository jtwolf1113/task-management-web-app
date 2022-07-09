  function deleteBoard(boardId) {
    fetch("/boards/delete-board", {
      method: "POST",
      body: JSON.stringify({boardId: boardId}),
    }).then((_res)=> {
      window.location.href = "/boards";
    });
  }