document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    const fullName = document.getElementById("fullName");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const dob = document.getElementById("dob");
  
    registrationForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Clear previous errors
      clearErrors();
  
      // Validate form fields
      let isValid = true;
  
      if (!validateFullName(fullName.value)) {
        displayError("fullNameError", "Nombre completo no válido");
        isValid = false;
      }
  
      if (!validatePhone(phone.value)) {
        displayError("phoneError", "Número de teléfono no válido");
        isValid = false;
      }
  
      if (!validateEmail(email.value)) {
        displayError("emailError", "Email no válido");
        isValid = false;
      }
  
      if (!validatePassword(password.value, confirmPassword.value)) {
        displayError("passwordError", "Las contraseñas no coinciden o no son válidas");
        displayError("confirmPasswordError", "Las contraseñas no coinciden o no son válidas");
        isValid = false;
      }
  
      if (!validateDOB(dob.value)) {
        displayError("dobError", "Fecha de nacimiento no válida");
        isValid = false;
      }
  
      if (isValid) {
        const user = {
          fullName: fullName.value,
          phone: phone.value,
          email: email.value,
          password: password.value,
          dob: dob.value,
        };
        console.log(JSON.stringify(user));
      }
    });
  
    function clearErrors() {
      document.querySelectorAll(".error").forEach(error => error.textContent = "");
    }
  
    function displayError(elementId, message) {
      document.getElementById(elementId).textContent = message;
    }
  
    function validateFullName(name) {
      return name.trim().length > 0;
    }
  
    function validatePhone(phone) {
      const phoneRegex = /^\+?[\d\s]+$/;
      return phoneRegex.test(phone);
    }
  
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    function validatePassword(password, confirmPassword) {
      return password.length >= 6 && password === confirmPassword;
    }
  
    function validateDOB(date) {
      const selectedDate = new Date(date);
      const currentDate = new Date();
      return selectedDate < currentDate;
    }
  });
  