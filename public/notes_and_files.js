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

document.getElementById("confirm-drop").addEventListener("click", function () {
  // upon confirm -> file should appear in file storage area, added to server, + upload popup should hide
  document.getElementById("upload-popup").classList.remove("show");
});