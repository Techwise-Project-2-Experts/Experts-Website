// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD8hiqddvzKddH6AklHiuKBnNTJHjlvhe4",
    authDomain: "expertswebsite-de33c.firebaseapp.com",
    projectId: "expertswebsite-de33c",
    storageBucket: "expertswebsite-de33c.appspot.com",
    messagingSenderId: "300053268179",
    appId: "1:300053268179:web:b8ca48466d1ae376443626",
    measurementId: "G-KL6LR1T4PB"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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
    console.log("Browse button clicked");
    input.click();
};

// When a file is selected via input
input.addEventListener('change', function () {
    file = this.files[0];
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
    pdfjsLib.getDocument({ data: pdfData }).promise.then(function(pdf) {
        // Create a container to hold all pages
        let pdfContainer = document.createElement('div');
        // pdfContainer.style.height = '800px';
        pdfContainer.style.overflow = 'auto'; // Enable scrolling
        pdfContainer.id = `${file.name}_doc`;
        pdfContainer.name = file.name;
        pdfContainer.style.border = '1px solid #ccc';

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
    // Create a container element
    let container = document.createElement('div');
    container.classList.add('document-container'); // Add a class for styling

    // CSS styles for the document container
    container.style.backgroundColor = 'white';
    container.style.fontSize = '10px';
    container.style.border = '1px solid #ccc';
    container.style.height = '200px';
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
            imageObject.style.border = '1px solid #ccc';

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
    if (fileContainer.innerText === "No files in storage. Create a note or upload a file now!") {
        fileContainer.innerText = '';
    };

    // Check for image
    let imageInDragArea = document.getElementById(`${file.name}_image`);
    let fileInDragArea = document.getElementById(`${file.name}_doc`);

    if (imageInDragArea) {
        // Create a new image element
        let fileItem = document.createElement('div');
        let imgCaption = document.createElement('div'); 

        fileItem.classList.add('file-item');
        imageInDragArea.classList.add('file-preview');
        imgCaption.classList.add('file-caption');
        
        // Set the caption based on the image name
        imgCaption.textContent = file.name;

        fileItem.appendChild(imageInDragArea);
        fileItem.appendChild(imgCaption);

        fileContainer.appendChild(fileItem);
    }

    else if (fileInDragArea) {
        console.log("File in drag area -- transferring");
        let fileItem = document.createElement('div');
        let previewCaption = document.createElement('div');

        fileItem.classList.add('file-item');
        fileInDragArea.classList.add('file-preview');
        previewCaption.classList.add('file-caption');

        previewCaption.textContent = fileInDragArea.name;

        fileItem.appendChild(fileInDragArea);
        fileItem.appendChild(previewCaption);
        
        fileContainer.appendChild(fileItem);
    }
}

// Function to upload file to Firebase Storage
function uploadFileToFirebase(file) {
    let storageRef = firebase.storage().ref(`uploads/${file.name}`);
    let uploadTask = storageRef.put(file);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Handling state changes, e.g., paused, running, but not displaying percentages
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING:
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // Handle unsuccessful uploads
            console.log(error);
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                // Here you can, for example, display the image or file from the URL if needed
            });
        }
    );
}


// Close popup and return popup to initial state
document.getElementById("cancel-drop").addEventListener("click", function () {
    document.getElementById("upload-popup").classList.remove("show");
    input.value = null; // Reset the file input value
    file = null;
    dragArea.classList.remove('active');
    dragText.textContent = originalDragAreaContent;
});

// When the user confirms the upload -> move the file from drag area to file container
document.getElementById("confirm-drop").addEventListener("click", function () {
    console.log(file.name, file);
    uploadFileToFirebase(file); // Added line for uploading to Firebase    
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