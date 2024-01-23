// shows popup when user selects upload
document.getElementById("upload-button").addEventListener("click", function () {
  document.getElementById("upload-popup").classList.add("show");
});

// hides popup when user clicks outside of it
window.addEventListener("click", function (event) {
  var uploadPopup = document.getElementById("upload-popup");
  if (event.target == uploadPopup) {
    uploadPopup.classList.remove("show");
  }
});

// hides popup if user clicks to cancel upload
document.getElementById("cancel-drop").addEventListener("click", function () {
  document.getElementById("upload-popup").classList.remove("show");
});

// for notes and files drop areas -- to allow for dragging and dropping
document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone--over");
  });
});

// not fully working yet :( debugging statements are showing but image is not
// after this is working -> make it so that images show on the files + the "no files" statement is gone, store files in server once that is set up

function updateThumbnail(dropZoneElement, file) {
  console.log("Updating thumbnail for: ", file.name)
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // if there is no thumbnail element -- create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log("FileReader onload triggered");
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}