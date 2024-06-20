document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contact-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const submitButton = form.querySelector('button[type="submit"]');
  const errorParagraph = document.createElement('p');
  errorParagraph.style.color = 'var(--Colors-semantic-error, #e93828)';
  submitButton.insertAdjacentElement('afterend', errorParagraph);
  const errorColor = 'var(--Colors-semantic-error, #e93828)';

  function clearErrorStyles() {
      emailInput.style.borderColor = '';
      passwordInput.style.borderColor = '';
      errorParagraph.innerHTML = '';
  }

  function validateEmail() {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
      if (!emailRegex.test(emailInput.value)) {
          emailInput.style.borderColor = errorColor;
          return 'Por favor, ingrese un correo electrónico válido.';
      }
      return '';
  }

  function validatePassword() {
      const passwordValue = passwordInput.value;
      if (passwordValue == "") {
          passwordInput.style.borderColor = errorColor;
          return 'La contraseña no puede estar vacía';
      }
      return '';
  }

  function showError(message) {
      errorParagraph.innerHTML = message;
  }

  form.addEventListener('submit', function (event) {
      event.preventDefault();

      clearErrorStyles();
      let errorMessage;   

      errorMessage = validateEmail();
      if (errorMessage) {
          showError(errorMessage);
          return;
      }

      errorMessage = validatePassword();
      if (errorMessage) {
          showError(errorMessage);
          return;
      }
      
      errorParagraph.innerHTML = '';

    // Send the data to the server
    fetch("/api/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          email: emailInput.value,
          password: passwordInput.value
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Redirigir a la página principal u otra acción
        alert('Inicio de sesión exitoso.');
        window.location.href = '/';
      } else {
        showError(data.message);
      }
    })
    .catch(error => {
        console.error('Error:', error);
        showError('Hubo un problema con el inicio de sesión.');
    });

  });
});