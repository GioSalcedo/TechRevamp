document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contact-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const passwordIcon = document.getElementById('password-icon')
  const checkbox = document.getElementById('checkbox');
  const submitButton = form.querySelector('button[type="submit"]');
  const errorParagraph = document.createElement('p');
  errorParagraph.style.color = 'var(--Colors-semantic-error, #e93828)';
  submitButton.insertAdjacentElement('afterend', errorParagraph);
  const errorColor = 'var(--Colors-semantic-error, #e93828)';

  emailInput.value = '';
  passwordInput.value = '';

  function clearErrorStyles() {
      emailInput.style.borderColor = '';
      passwordInput.style.borderColor = '';
      errorParagraph.innerHTML = '';
  }

  function validateEmail() {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
      const emailValue = emailInput.value;
      if(emailValue== ""){
        emailInput.style.borderColor = errorColor;
          return 'El correo no puede estar vacío.';
      }else if (!emailRegex.test(emailInput.value)) {
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

  //Función botón ver contraseña.
  passwordIcon.addEventListener('click', (e) => {
    if(passwordInput.type === 'password'){
      passwordIcon.className = "fa-solid fa-eye-slash";
      passwordInput.type = 'text';
    } else{
      passwordIcon.className = 'fa-solid fa-eye';
      passwordInput.type = 'password';
    }
  })
  

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
    .then( async response =>{
      const data = await response.json();
      console.log("Respuesta: ", data);
      if (response.ok){
        if(data.success){
          // Redirigir a la página principal u otra acción
          // alert('Inicio de sesión exitoso.');
          Swal.fire({
            title: "¡Nos encanta tenerte de nuevo!",
            padding: "3em",
            color: "var(--Colors-neutral-black, #010F14)",
            background: "var(--Colors-primary-blue-50, #EBFFFE)",
            showConfirmButton: true,
            confirmButtonText: `
            <a href="/productos" style="color: var(--neutral-white, #FAFEFE);">Explorar productos</a>
            `,
            confirmButtonColor: "var(--Colors-primary-blue-950, #063646)",
            backdrop: `
                rgba(25, 76, 110, 0.4)
            `
          });
        } else{
          showError(data.message);
        }
      } else{
        showError(data.message || 'Hubo un problema con el inicio de sesión.');
      }
    })
    .catch(error => {
        console.error('Error:', error);
        showError('Hubo un problema con el inicio de sesión.');
    });
  });
  //Autocompletar si se encuentran credenciales en local storage despues de seleccionar un correo
  // El local storage solo se está usando para la funcionalidad del checkbox "Recuérdame", la validación se está hacienco con el JSON.
  emailInput.addEventListener('blur', function() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const { email, password, rememberMe } = JSON.parse(userData);
      if(emailInput.value === email){
        passwordInput.value = password;
        checkbox.checked = rememberMe === 'true';
      };
    }
  });

  //funcionalidad del checkbox
  checkbox.addEventListener('change', function () {
    console.log('Checkbox marcado:', checkbox.checked);
    if (checkbox.checked) {
      localStorage.setItem('userData', JSON.stringify({
      email: emailInput.value,
      password: passwordInput.value,
      rememberMe: checkbox.checked.toString()
      }));
    } else {
      localStorage.removeItem('userData');
    }
  });

  function logout(){
    fetch('/cerrar-sesion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        document.querySelector('.login-user').innerHTML = '<a href="/iniciar-sesion"><span class="login-user">Iniciar Sesión</span></a>';
        document.querySelector('.modal-account').classList.add('toggle');
      } else {
        console.error('Error al cerrar sesión');
      }
    })
    .catch(error => console.error('Error de red:', error));
  }

});

