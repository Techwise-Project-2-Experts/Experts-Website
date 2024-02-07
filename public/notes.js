const notesContainer = document.getElementById("notes-container");
const button = document.getElementById("create-note");
let notes = document.querySelectorAll(".input-box");

button.addEventListener("click", () => {
  // Create elements
    let inputBox = document.createElement("div");
    let trashIcon = document.createElement("i");
    let confirmIcon = document.createElement("i");
    let editIcon = document.createElement("i");
    let titleInput = document.createElement("input");
    let titleText = document.createElement("h3");

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
      titleText.remove();
    });

    confirmIcon.addEventListener("click", () => {
      // Make content not editable when confirmed
      inputBox.setAttribute("contenteditable", "false");

      let confirmationBox = document.createElement("div");
      let yesButton = document.createElement("button");
      let noButton = document.createElement("button");
      let confirmIcon = document.createElement("i");
  
      confirmIcon.className = "uil-check-square";
      confirmationBox.className = "confirmation-box";
      confirmationBox.textContent = "Do you want to save this note?";
      yesButton.textContent = "Yes";
      noButton.textContent = "No";
      
      notesContainer.appendChild(confirmationBox);
      confirmationBox.append(yesButton);
      confirmationBox.append(noButton);
  
      yesButton.addEventListener("click", () => {
        confirmationBox.textContent = "What would you like to name your note?";
        yesButton.remove();
        noButton.remove();
        
        confirmationBox.appendChild(titleInput);
        confirmationBox.appendChild(confirmIcon);
  
        confirmIcon.addEventListener("click", () => {
          titleText.textContent = titleInput.value;
          notesContainer.insertBefore(titleText, trashIcon);
        
          // Save to database ?
        
          confirmIcon.remove();
          titleInput.remove();
          confirmationBox.remove();
        });
        
      });
    });

    editIcon.addEventListener("click", () => {
      // Make content editable when edit is clicked
      inputBox.setAttribute("contenteditable", "true");
    });
  });