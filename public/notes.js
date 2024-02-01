const notesContainer = document.getElementById("notes-container");
const button = document.getElementById("create-note");
let notes = document.querySelectorAll(".input-box");

button.addEventListener("click", () => {
    let inputBox = document.createElement("div");
    //let trashIcon = document.createElement("i");

    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    //trashIcon.className = "uil-trash";
    notesContainer.appendChild(inputBox)
    //.appendChild(trashIcon);
  });