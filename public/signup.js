document.addEventListener('DOMContentLoaded', function() {

  document.getElementById("loginForm").addEventListener("submit", async function(event){
    event.preventDefault();
    let emailValue = document.getElementById("email").value;
    let passwordValue = document.getElementById("password").value;
    console.log("email: " + emailValue + ", password: " + passwordValue)
    // Perform validation checks
    let emailValid = validateEmail(emailValue);
    let passwordValid = validatePassword(passwordValue);

    // If both validations pass, redirect to console_profile.html
    if (emailValid && passwordValid) {
      emailPasswordObj = {
        email : emailValue ,
        password : passwordValue
      }
      console.log(emailPasswordObj);
      try{
        const response = await fetch('/signup',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailPasswordObj)
        });

        if (response.ok){
          
          const contentType = response.headers.get('Content-Type');
          if (contentType && contentType.includes('application/json')){
            const responseData = await response.json();
            console.log(responseData);

            displayMessage(responseData.message)
          } else{
              if (response.redirected){
                console.log("Redirecting...")
                window.location.href = response.url;
              }
              console.log("I don't know what else to do.")
          }
        } else{
          console.error("Server responded with an error:", response.status )
        }
      } catch(error){
        console.error('Error:', error);
      }
    }
  });

  function displayMessage(message){
    const emailErrorText = document.getElementById("emailError");
    emailErrorText.innerText = message;
  }

  document.getElementById("togglePassword").addEventListener("click", function(event){
      let passwordInput = document.getElementById("password");
      let eyeIcon = this.querySelector('.fa-eye');
      let eyeSlashIcon = this.querySelector('.fa-eye-slash');

      if (passwordInput.type === "password") {
          passwordInput.type = "text";
          eyeIcon.style.display = 'none';
          eyeSlashIcon.style.display = 'block';
      } else {
          passwordInput.type = "password";
          eyeIcon.style.display = 'block';
          eyeSlashIcon.style.display = 'none';
      }
  });
});


function validateEmail(email) {
let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
if (regex.test(email)) {
  document.getElementById("emailError").innerText = '';
  return true;
} else {
  document.getElementById("emailError").innerText = 'Invalid email format';
  return false;
}
}

function validatePassword(password) {
let regex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{12,}$/;
if (regex.test(password)) {
  document.getElementById("passwordError").innerText = '';
  return true;
} else {
  document.getElementById("passwordError").innerText = 'Password must be 12+ characters, include an uppercase character, and a special character';
  return false;
}
}
