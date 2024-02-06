const notesContainer = document.getElementById("notes-container");
const button = document.getElementById("create-note");
let notes = document.querySelectorAll(".input-box");

button.addEventListener("click", () => {
  // Create elements
    let inputBox = document.createElement("div");
    let trashIcon = document.createElement("i");
    let confirmIcon = document.createElement("i");
    let editIcon = document.createElement("i");

    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    trashIcon.className = "uil-trash";
    confirmIcon.className = "uil-check-square";
    editIcon.className = "uil-edit";

    // Add them to notes container
    notesContainer.appendChild(inputBox);
    notesContainer.appendChild(trashIcon);
    notesContainer.appendChild(confirmIcon);
    notesContainer.appendChild(editIcon);

    // Delete note and trash icon when trash icon is clicked
    trashIcon.addEventListener("click", () => {
      inputBox.remove();
      trashIcon.remove();
      confirmIcon.remove();
      editIcon.remove();
    });

    confirmIcon.addEventListener("click", () => {
      // Make content not editable when confirmed
      inputBox.setAttribute("contenteditable", "false");
    });

    editIcon.addEventListener("click", () => {
      // Make content editable when edit is clicked
      inputBox.setAttribute("contenteditable", "true");
    });
  });