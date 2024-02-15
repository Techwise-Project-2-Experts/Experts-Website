const notesContainer = document.getElementById("notes-container");
const button = document.getElementById("create-note");

button.addEventListener("click", () => {
    // Create input box and icons
    let inputBox = document.createElement("div");
    let trashIcon = document.createElement("i");
    let confirmIcon = document.createElement("i");
    let editIcon = document.createElement("i");
    let titleText = document.createElement("h3");
    
    // Set classes for elements
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    trashIcon.className = "uil-trash";
    confirmIcon.className = "uil-check-square";
    editIcon.className = "uil-edit";

    let iconsContainer = document.createElement("div");
    iconsContainer.appendChild(trashIcon);
    iconsContainer.appendChild(confirmIcon);
    iconsContainer.appendChild(editIcon);

    notesContainer.appendChild(inputBox);
    notesContainer.appendChild(iconsContainer);

    // Delete note and icons when trash icon is clicked
    trashIcon.addEventListener("click", () => {
        inputBox.remove();
        iconsContainer.remove();
        titleText.remove();
    });

    // Confirm note
    confirmIcon.addEventListener("click", () => {
        // Make content not editable when confirmed
        inputBox.setAttribute("contenteditable", "false");

        let confirmationBox = document.createElement("div");
        let yesButton = document.createElement("button");
        let noButton = document.createElement("button");

        confirmationBox.className = "confirmation-box";
        confirmationBox.textContent = "Do you want to save this note?";
        yesButton.className = "note-choices";
        noButton.className = "note-choices";
        yesButton.textContent = "Yes";
        noButton.textContent = "No";

        confirmationBox.appendChild(yesButton);
        confirmationBox.appendChild(noButton);

        notesContainer.appendChild(confirmationBox);

        // Handle yes button click
        yesButton.addEventListener("click", () => {
            // Display input for title
            confirmationBox.textContent = "What would you like to name your note?";
            let titleInput = document.createElement("input");
            titleInput.className = "title-input";
            confirmationBox.appendChild(titleInput);

            // Handle confirmation icon click
            let confirmIcon = document.createElement("i");
            confirmIcon.className = "uil-check-square";
            confirmIcon.addEventListener("click", () => {
                titleText.textContent = titleInput.value;
                notesContainer.insertBefore(titleText, iconsContainer);
                confirmationBox.remove();
            });
            confirmationBox.appendChild(confirmIcon);
        });

        // Handle no button click
        noButton.addEventListener("click", () => {
            confirmationBox.remove();
            inputBox.setAttribute("contenteditable", "true");
        });
    });

    // Edit note
    editIcon.addEventListener("click", () => {
        // Make content editable when edit is clicked
        inputBox.setAttribute("contenteditable", "true");
    });
});
