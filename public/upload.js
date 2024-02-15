const dragArea = document.querySelector('.drag-area');
const dragText = document.querySelector('.header'); 
let button = document.querySelector('.button');
let input = document.querySelector('#upload-popup input');
let originalDragAreaContent = dragArea.innerHTML; // Variable to store the intial content of dragArea
let file;

// Triggering the file input when button is clicked
button.onclick = () => {
    input.click();
};

// When a file is selected via input
input.addEventListener('change', function () {
    file = this.files[0];
    dragArea.classList.add('active');
    displayFile();
});

// When file is dragged over the drag area
dragArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dragText.textContent = 'Release to Upload';
    dragArea.classList.add('active');
});

// When file leaves the drag area
dragArea.addEventListener('dragleave', () => {
    dragText.textContent = 'Drag & Drop';
    dragArea.classList.remove('active');
});

// When the file is dropped in the drag area
dragArea.addEventListener('drop', (event) => {
    event.preventDefault();
    file = event.dataTransfer.files[0];
    displayFile();
});

function displayFile() {
    let fileType = file.type;
    let validImageExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    let validDocExtensions = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (validImageExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            dragArea.innerHTML = `<img src="${fileURL}" alt="Image preview">`;
        };
        fileReader.readAsDataURL(file);
    } else if (validDocExtensions.includes(fileType)) {
        // Display an icon or text for PDF/DOC files
        let fileIcon = fileType === 'application/pdf' ? 'fas fa-file-pdf' : 'fas fa-file-word';
        dragArea.innerHTML = `<i class="${fileIcon}"></i> <br> File name: ${file.name}`;
    } else {
        alert('This file type is not supported');
        dragArea.classList.remove('active');
    }
}

function moveFileToContainer() {
    let fileContainer = document.getElementById('file-container');

    // Remove existing content from the file-container
    fileContainer.innerHTML = '';

    // Check for image
    let imageInDragArea = dragArea.querySelector('img');

    if (imageInDragArea) {
        // Create a new image element
        let newImage = document.createElement('img');
        let imgCaption = document.createElement('figcaption'); 
        
        // Set the source and alt attributes based on the existing image
        newImage.src = imageInDragArea.src;
        newImage.alt = imageInDragArea.alt;
        imgCaption.textContent = file.name;

        // Add class for styling in the grid
        newImage.classList.add('grid-icon');
        imgCaption.style.marginLeft = "10%";

        // Append the new image to the file-container
        fileContainer.appendChild(newImage);
        fileContainer.appendChild(imgCaption);
    }

    // Return drag area to initial state
    dragArea.innerHTML = originalDragAreaContent;
}


// Close popup and return popup to initial state
document.getElementById("cancel-drop").addEventListener("click", function () {
    document.getElementById("upload-popup").classList.remove("show");
    input.value = null; // Reset the file input value
    dragArea.classList.remove('active');
    dragText.textContent = 'Drag & Drop';
    // Restore the original content of dragArea
    dragArea.innerHTML = originalDragAreaContent;
});

// When the user confirms the upload -> move the file from drag area to file container
document.getElementById("confirm-drop").addEventListener("click", function () {
    moveFileToContainer();

    // Hide the upload popup
    document.getElementById("upload-popup").classList.remove("show");
    // Reset the file input value and drag area state
    input.value = null;
    dragArea.classList.remove('active');
    dragText.textContent = 'Drag & Drop';
});