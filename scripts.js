// Define global intervalId for controlling the animation interval
var intervalId;

function validateFormAndAlert() {
    // Fetch the form by id and its elements
    const formElements = document.getElementById('myForm').elements;
    let isFormValid = true;

    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/; // Updated to ensure the email ends with .com
    const nameRegex = /^[a-zA-Z\s'-]+$/; // Allows letters, spaces, single quotes, and hyphens

    // Iterate over the elements of the form
    for (let element of formElements) {
        // Log the value of each element to the console
        console.log(element.name + ':', element.value);

        // Skip over the submit button in the validation check
        if (element.type !== 'submit') {
            // Check if the element's value is empty
            if (element.value.trim() === '') {
                console.error('The following field is empty:', element.name);
                alert('Please fill out the ' + element.name + ' field.');
                isFormValid = false; // Indicate that the form is not valid
                break; // Stop checking further elements once an invalid field is found
            } else {
                // Additional validation for the 'email' field
                if (element.name === 'email' && !emailRegex.test(element.value.trim())) {
                    console.error('Invalid email address:', element.value);
                    alert('Please enter a valid .com email address.');
                    isFormValid = false;
                    break;
                }
                // Additional validation for the 'name' field
                if (element.name === 'name' && !nameRegex.test(element.value.trim())) {
                    console.error('Invalid name:', element.value);
                    alert('Name can only include letters, spaces, hyphens, and apostrophes.');
                    isFormValid = false;
                    break;
                }
            }
        }
    }

    return isFormValid; // Return the validity status of the form
}


function testInputs() {
    // Fetch the form by id and its elements
    const formElements = document.getElementById('myForm').elements;

    // Iterate over the elements of the form
    for (let element of formElements) {
        // Skip the submit button
        if (element.type === 'submit') {
            continue;
        }

        // Check if the input element is empty
        if (element.value.trim() === '') {
            console.log('This input is empty!');
        } else {
            console.log('This input has some data:', element.value);
        }
    }
}



// Target the form with ID 'myForm' and assign it to the variable 'form'
const form = document.getElementById('myForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (validateFormAndAlert()) {
        // If validateFormAndAlert returns true, construct the payload and proceed with form submission
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Construct the payload with the form data
        const payload = { name, email, password };

        // Handle the form submission here, e.g., sending the data to a server with fetch
        console.log('Form submission payload:', payload);

        // Here you would continue with the AJAX request using fetch or another method
        // Example (commented out since it requires a server endpoint):
        // const response = await fetch('/submit-form', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(payload)
        // });
        // const data = await response.json();
        // Handle the response here
        // Show the modal after a 2-second delay
        setTimeout(function() {
            document.getElementById('thankYouModal').style.display = 'block';

            // Start animating the handshake image every 500ms
            intervalId = setInterval(function() {
                // Apply a simple scale animation
                var image = document.querySelector('.animated-image');
                image.style.transform = 'scale(1.1)';
                // Reset the scale after a short delay to create a "pulse" effect
                setTimeout(function() {
                    image.style.transform = 'scale(1)';
                }, 250);
            }, 500);

            // Stop the animation after 10 seconds and hide the modal
            setTimeout(function() {
                clearInterval(intervalId);
                document.getElementById('thankYouModal').style.display = 'none';
            }, 10000);
        }, 2000);
    } else {
        // Handle the invalid form state, if necessary
        console.log('Form is not valid. User has been alerted to correct the data.');
    }
});

// This script will be inside your script.js file or a script tag in the HTML.
document.addEventListener('DOMContentLoaded', (event) => {
    const toggleButton = document.getElementById('dark-mode-toggle');
    const bodyElement = document.body;

    toggleButton.addEventListener('click', function () {
        bodyElement.classList.toggle('dark-mode');
    });
    // Close button event listener for the modal
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('thankYouModal').style.display = 'none';
        clearInterval(intervalId); // Stop the animation if it's running
    });
});
// Vanilla JavaScript example

document.addEventListener('DOMContentLoaded', function() {
  // Listen for the form submission
  document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Set a timeout to show the modal after 2 seconds
    setTimeout(function() {
      document.getElementById('thankYouModal').style.display = 'block';

      // Start an interval to animate the image every 500ms
      var intervalId = setInterval(function() {
        // Here, you would add your logic to animate the image
        // For example, you might toggle a CSS class or directly modify the image's style
        var image = document.querySelector('.animated-image');
        image.style.transform = 'scale(1.1)';

        // You could define more complex animations in your CSS and simply add the class here
        // image.classList.toggle('animate');

      }, 500);

      // Stop the animation after 10 seconds
      setTimeout(function() {
        clearInterval(intervalId);
        document.getElementById('thankYouModal').style.display = 'none';
      }, 10000);

    }, 2000);
  });

  // Close the modal when the close button is clicked
  document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('thankYouModal').style.display = 'none';
    clearInterval(intervalId); // Stop the animation if it's running
  });
});

// Smooth scrolling for all anchor links
document.addEventListener('DOMContentLoaded', function () {
  // Select all links with hashes
  var anchorLinks = document.querySelectorAll('a[href*="#"]');

  // Attach a click event listener to each link
  for (var anchorLink of anchorLinks) {
    anchorLink.addEventListener('click', function (event) {
      // On-click, prevent the default action
      event.preventDefault();

      // Get the destination to scroll to
      var targetId = this.getAttribute('href');
      var targetElement = document.querySelector(targetId);

      // Use the history API to update the URL without a page jump
      if (history.pushState) {
        history.pushState(null, null, targetId);
      } else {
        location.hash = targetId;
      }

      // Smoothly scroll to the target element
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});

// Function to check if the element is in view
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to animate sections on scroll
function animateSectionsOnScroll() {
  // Select all the sections you want to animate
  const sections = document.querySelectorAll('.section'); // Use the correct selector for your sections

  // Iterate through each section and toggle visibility based on viewport
  sections.forEach(section => {
    if (isInViewport(section)) {
      section.classList.add('visible-section');
      section.classList.remove('hidden-section');
    } else {
      section.classList.add('hidden-section');
      section.classList.remove('visible-section');
    }
  });
}

// Listen for the scroll event
window.addEventListener('scroll', animateSectionsOnScroll);
// If there are other elements and event listeners, you can set them up below
// ...

// Ensure that the rest of your code is consistent with the IDs and the logic required for those functionalities.

/*document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Add 2FA code handling if necessary

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (data.success) {
        window.location.href = '/dashboard'; // Redirect on successful login
    } else {
        alert('Login failed: ' + data.error);
    }
});

document.getElementById('compare-button').addEventListener('click', async () => {
    const resumeText = document.getElementById('resume-upload').value;  // Assuming you'll parse the uploaded resume to get the text
    const jobDescription = document.getElementById('job-description').value;

    const response = await fetch('/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDescription })
    });

    const data = await response.json();
    document.getElementById('match-result').innerText = data.result;
});
*/