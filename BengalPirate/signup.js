document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("submitButton").addEventListener("click", function(event){
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        // Perform validation checks
        let emailValid = validateEmail(email);
        let passwordValid = validatePassword(password);

        // If both validations pass, redirect to console_profile.html
        if (emailValid && passwordValid) {
            window.location.href = 'console_profile.html';
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
