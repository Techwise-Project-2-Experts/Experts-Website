const dragArea = document.querySelector('.drag-area');
const dragText = document.querySelector('.header'); 
let button = document.querySelector('.button');
let input = document.querySelector('input');
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
