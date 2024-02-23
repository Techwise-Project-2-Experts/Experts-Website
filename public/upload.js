const dragArea = document.querySelector('.drag-area');
const dragText = document.querySelector('.header'); 
let button = document.querySelector('.button');
let input = document.querySelector('#upload-popup input');
let originalDragAreaContent = dragArea.innerHTML; // Variable to store the intial content of dragArea
let file;
let fileContainer = document.getElementById('file-container');

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.4.456/pdf.worker.min.js';


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

function renderPdf(pdfData, selectedArea) {
    /* Using pdf.js to correctly work w/ pdfs:
        Getting all pages of the pdf and allowing user to scroll through, adding the pdf canvas to selected area */

    pdfjsLib.getDocument({ data: pdfData }).promise.then(function(pdf) {
        // Create a container to hold all pages
        let pdfContainer = document.createElement('div');
        // pdfContainer.style.height = '800px';
        pdfContainer.style.overflow = 'auto'; // Enable scrolling
        pdfContainer.id = `${file.name}_doc`;
        pdfContainer.name = file.name;

        let promises = []; // Array to store promises for rendering each page

        for (let i = 1; i <= pdf.numPages; i++) {
            // Create a canvas for each page
            let pdfCanvas = document.createElement('canvas');
            pdfCanvas.classList.add('pdf-page'); // Add a class for styling

            // Push the promise for rendering the page to the array
            promises.push(pdf.getPage(i).then(function(page) {
                let ctx = pdfCanvas.getContext('2d');

                // Set canvas dimensions based on the page's viewport
                let viewport = page.getViewport({ scale: 1 });
                pdfCanvas.width = viewport.width;
                pdfCanvas.height = viewport.height;

                // Render PDF page to canvas
                return page.render({ canvasContext: ctx, viewport: viewport }).promise;
            }));
            
            // Append the canvas to the PDF container
            pdfContainer.appendChild(pdfCanvas);
        }

        // Wait for all pages to be rendered before appending the container
        Promise.all(promises).then(function() {
            // Append the container to the selected area
            selectedArea.appendChild(pdfContainer);
        }).catch(function(error) {
            console.error('Error rendering PDF pages:', error);
        });
    }).catch(function(error) {
        console.error('Error loading PDF:', error);
    });
}

function displayWordPreview(fileData) {
    /* Using Mammoth.js to correctly work w/ word documents:
        Converting word document to HTML and styling container to resemble a scrollable page */

    // Create a container element
    let container = document.createElement('div');
    container.classList.add('document-container'); // Add a class for styling

    // CSS styles for the document container
    container.style.backgroundColor = 'white';
    container.style.padding = '20px';
    container.style.fontSize = '10px';
    container.style.border = '1px solid #ccc';
    container.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    container.style.overflowX = 'auto'; // Enable horizontal scrolling


    // Convert Word document to HTML using Mammoth
    mammoth.convertToHtml({ arrayBuffer: fileData })
        .then(result => {
            // Set the HTML content inside the container
            container.innerHTML = result.value;
            container.id = `${file.name}_doc`;
            container.name = file.name;

            // Append the container to the drag area
            dragArea.appendChild(container);
        })
        .catch(error => {
            console.error('Error converting Word document:', error);
        });
}

function displayFile() {
    let fileType = file.type;
    let validImageExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    let validDocExtensions = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (validImageExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            // dragArea.innerHTML = `<img src="${fileURL}" alt="Image preview">`;

            let imageObject = document.createElement('object');
            imageObject.type = fileType;
            imageObject.data = fileURL;
            imageObject.alt = 'Image preview';
            imageObject.width = '400px';
            imageObject.id = `${file.name}_image`;

            dragArea.innerHTML = '';
            dragArea.appendChild(imageObject);
        };
        fileReader.readAsDataURL(file);
    } else if (validDocExtensions.includes(fileType)) {
        // Display an icon or text for PDF/DOC files
        // let fileIcon = fileType === 'application/pdf' ? 'fas fa-file-pdf' : 'fas fa-file-word';
        // dragArea.innerHTML = `<i class="${fileIcon}"></i> <br> File name: ${file.name}`;
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileData = fileReader.result;

            dragArea.innerHTML = '';

            if (fileType === 'application/pdf') {
                // Render PDF preview
                renderPdf(fileData, dragArea);
            } else {
                // handle other
                displayWordPreview(fileData);
            }
        };
        //fileReader.readAsArrayBuffer(file);
        fileReader.readAsArrayBuffer(file);
    } else {
        alert('This file type is not supported');
        dragArea.classList.remove('active');
    }
}

function moveFileToContainer() {
    // Remove existing content from the file-container
    if (fileContainer.textContent === "No files in storage. Create a note or upload a file now!") {
        fileContainer.textContent = '';
    };

    fileContainer.textContent = '';

    // Check for image
    let imageInDragArea = document.getElementById(`${file.name}_image`);
    let fileInDragArea = document.getElementById(`${file.name}_doc`);

    if (imageInDragArea) {
        // Create a new image element
        let imgCaption = document.createElement('figcaption'); 

        imageInDragArea.classList.add('grid-icon');
        imgCaption.classList.add('grid-icon');
        
        // Set the caption based on the image name
        imgCaption.textContent = file.name;

        // Add class for styling in the grid
        imgCaption.style.textAlign = 'center';
        imgCaption.style.fontSize = "30%";

        // Append the new image to the file-container
        fileContainer.appendChild(imageInDragArea);
        fileContainer.appendChild(imgCaption);
    }

    else if (fileInDragArea) {
        console.log("File in drag area -- transferring");
        let previewCaption = document.createElement('figcaption');
        fileInDragArea.classList.add('grid-icon');

        previewCaption.textContent = fileInDragArea.name;
        previewCaption.classList.add('grid-icon');
        previewCaption.style.textAlign = 'center';
        previewCaption.style.fontSize = '30%';

        // Get the height of the file container
        let fileContainerHeight = fileContainer.offsetHeight;

        // Set the height of the file documents to 25% of the file container height
        fileInDragArea.style.height = (fileContainerHeight * 0.25) + 'px';
        
        console.log(fileInDragArea);
        fileContainer.appendChild(fileInDragArea);

        console.log("transferred");
        fileContainer.appendChild(previewCaption);
    }
}


// Close popup and return popup to initial state
document.getElementById("cancel-drop").addEventListener("click", function () {
    document.getElementById("upload-popup").classList.remove("show");
    input.value = null; // Reset the file input value
    dragArea.classList.remove('active');
    dragText.textContent = 'Drag & Drop';
});

// When the user confirms the upload -> move the file from drag area to file container
document.getElementById("confirm-drop").addEventListener("click", function () {
    console.log(file.name, file);
    localStorage.setItem(file.name, JSON.stringify(file));
    moveFileToContainer();

    // Hide the upload popup
    document.getElementById("upload-popup").classList.remove("show");

    // Reset the file input value
    input.value = null;

    // Reset the file variable
    file = null;

    // Reset the drag area to its initial state
    dragArea.innerHTML = originalDragAreaContent;

    // Remove the active class from the drag area
    dragArea.classList.remove('active');
});


// shows popup when user selects upload
document.getElementById("upload-button").addEventListener("click", function () {
    document.getElementById("upload-popup").classList.add("show");
    dragArea.classList.add('active');
  });
  
  
// hides popup when user clicks outside of it
window.addEventListener("click", function (event) {
    var uploadPopup = document.getElementById("upload-popup");
    if (event.target == uploadPopup) {
      uploadPopup.classList.remove("show");
    }
  });