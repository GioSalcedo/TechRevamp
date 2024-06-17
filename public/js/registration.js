document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form');
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('fullname');
    const passwordInput = document.getElementById('password');
    const phoneInput = document.getElementById('phone');
    const repeatPasswordInput = document.getElementById('repeat-password');
    const submitButton = form.querySelector('button[type="submit"]');
    const errorParagraph = document.createElement('p');
    errorParagraph.style.color = 'var(--Colors-semantic-error, #e93828)';
    submitButton.insertAdjacentElement('afterend', errorParagraph);

    const errorColor = 'var(--Colors-semantic-error, #e93828)';

    function clearErrorStyles() {
        emailInput.style.borderColor = '';
        nameInput.style.borderColor = '';
        phoneInput.style.borderColor = '';
        passwordInput.style.borderColor = '';
        repeatPasswordInput.style.borderColor = '';
        errorParagraph.innerHTML = '';
    }

    function validateName() {
        if (nameInput.value.trim().length < 4) {
            nameInput.style.borderColor = errorColor;
            return 'El nombre debe tener al menos 4 caracteres.';
        }
        return '';
    }

    
    function validatePhone() {
        const phoneValue = phoneInput.value.trim();
        const phoneNumberRegex = /^\d+$/;
        console.log(phoneValue.length);
        if (!phoneNumberRegex.test(phoneValue)) {
            phoneInput.style.borderColor = errorColor;
            return 'Por favor, ingrese un número de teléfono válido que contenga solo números.';
        } else if (phoneValue.length !== 10) {
            phoneInput.style.borderColor = errorColor;
            return 'Por favor, ingrese un número de teléfono de 10 dígitos.';
        } else if (!phoneValue.startsWith('3')) {
            phoneInput.style.borderColor = errorColor;
            return 'Los números de teléfono deben iniciar con 3.';
        }
        return '';
        
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
        const passwordPattern = /^(?=.*[!@#$%])(?=.*[A-Z]).{6,}$/;
        if (!passwordPattern.test(passwordValue)) {
            passwordInput.style.borderColor = errorColor;
            return 'La contraseña debe tener al menos 6 caracteres, incluyendo una mayúscula y un caracter especial !@#$%.';
        }
        return '';
    }

    function validateRepeatPassword() {
        if (passwordInput.value !== repeatPasswordInput.value) {
            repeatPasswordInput.style.borderColor = errorColor;
            return 'Las contraseñas no coinciden.';
        }
        return '';
    }


    //Restricts user from entering letters to the phone field
    function restrictInputToNumbers(event) {
        const key = event.key;
        if (!/^\d$/.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Tab') {
            event.preventDefault();
        }
    }

    phoneInput.addEventListener('keydown', restrictInputToNumbers);

    function showError(message) {
        errorParagraph.innerHTML = message;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        clearErrorStyles();
        let errorMessage = validateEmail();

        errorMessage = validateName();
        if (errorMessage) {
            showError(errorMessage);
            return;
        }

        errorMessage = validatePhone();
        if (errorMessage) {
            showError(errorMessage);
            return;
        }

        if (errorMessage) {
            showError(errorMessage);
            return;
        }

        errorMessage = validatePassword();
        if (errorMessage) {
            showError(errorMessage);
            return;
        }

        errorMessage = validateRepeatPassword();
        if (errorMessage) {
            showError(errorMessage);
            return;
        }

        errorParagraph.innerHTML = '';

        // Send the data to the server
        fetch("http://localhost:4000/api/registrations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullname: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                password: passwordInput.value
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(`Error en el registro: ${data.message}`);
            } else {
                alert('¡Registro exitoso!');
                form.reset();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema con el registro.');
        });
    });
});
