document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("loginForm").addEventListener("submit", async function(event){
    event.preventDefault();
    let emailValue = document.getElementById("email").value;
    let passwordValue = document.getElementById("password").value;
    console.log("email: " + emailValue + ", password: " + passwordValue)

    emailPasswordObj = {
      email : emailValue ,
      password : passwordValue
    }
    console.log(emailPasswordObj);
    try{
      const response = await fetch('/login',{
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
  });

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

  function displayMessage(message){
    const emailErrorText = document.getElementById("emailError");
    const passwordErrorText = document.getElementById("passwordError");
    emailErrorText.innerText = message;
    emailErrorText.innerText = message;
  }
});