// JavaScript for playing a single video in the background

// Get the video element from the DOM
const videoElement = document.getElementById('background-video');

// Set the source of the video element to 'video1.mp4'
videoElement.src = './videos/video1.mp4'; // Adjust the path as needed

// Load and play the video
videoElement.load();
videoElement.play().catch(e => {
    console.error("Error playing video:", e);
});

// The following code for cycling through multiple videos is commented out
/*
const videoArray = [];
const numberOfVideos = 13; // Total number of videos you have

for (let i = 1; i <= numberOfVideos; i++) {
  videoArray.push(`./videos/video${i}.mp4`);
}

let changingVideo = false;

function changeVideo() {
  if (changingVideo) {
    console.log("Already changing video, operation aborted to prevent conflicts.");
    return;
  }

  changingVideo = true;
  const randomVideo = videoArray[Math.floor(Math.random() * videoArray.length)];
  console.log("Loading video:", randomVideo); 
  videoElement.src = randomVideo;
  videoElement.load(); 
  videoElement.play().then(() => {
    changingVideo = false;
  }).catch(e => {
    console.error("Error playing video:", e);
    changingVideo = false;
  });
}

videoElement.addEventListener('ended', changeVideo, false);
*/

// Initial call to set the first video
// changeVideo(); 
