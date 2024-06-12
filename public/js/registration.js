document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const fullNameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const dobInput = document.getElementById('dob');
    const submitButton = form.querySelector('button[type="submit"]');

    function clearErrorStyles() {
        document.querySelectorAll('.error').forEach(error => error.innerHTML = '');
    }

    function validateFullName() {
        if (fullNameInput.value.trim() === '') {
            return 'Por favor, ingrese su nombre completo.';
        }
        return '';
    }

    function validatePhone() {
        const phoneValue = phoneInput.value.trim();
        const phoneNumberRegex = /^\d+$/;
        if (!phoneNumberRegex.test(phoneValue)) {
            return 'Por favor, ingrese un número de teléfono válido que contenga solo números.';
        } else if (phoneValue.length !== 10) {
            return 'Por favor, ingrese un número de teléfono de 10 dígitos.';
        } else if (!phoneValue.startsWith('3')) {
            return 'Los números de teléfono deben iniciar con 3.';
        }
        return '';
    }

    function validateEmail() {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
        if (!emailRegex.test(emailInput.value)) {
            return 'Por favor, ingrese un correo electrónico válido.';
        }
        return '';
    }

    function validatePassword() {
        const password = passwordInput.value;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$^&]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return 'La contraseña debe tener al menos 6 caracteres, una letra mayúscula, un número y un carácter especial (!@#$^&).';
        }
        return '';
    }

    function validateConfirmPassword() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            return 'Las contraseñas no coinciden.';
        }
        return '';
    }

    function validateDob() {
        if (dobInput.value === '') {
            return 'Por favor, ingrese su fecha de nacimiento.';
        }
        return '';
    }

    function showError(inputElement, message) {
        const errorElement = inputElement.nextElementSibling;
        errorElement.innerHTML = message;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        clearErrorStyles();

        let errorMessage = validateFullName();
        if (errorMessage) {
            showError(fullNameInput, errorMessage);
            return;
        }

        errorMessage = validatePhone();
        if (errorMessage) {
            showError(phoneInput, errorMessage);
            return;
        }

        errorMessage = validateEmail();
        if (errorMessage) {
            showError(emailInput, errorMessage);
            return;
        }

        errorMessage = validatePassword();
        if (errorMessage) {
            showError(passwordInput, errorMessage);
            return;
        }

        errorMessage = validateConfirmPassword();
        if (errorMessage) {
            showError(confirmPasswordInput, errorMessage);
            return;
        }

        errorMessage = validateDob();
        if (errorMessage) {
            showError(dobInput, errorMessage);
            return;
        }

        form.submit();
    });
});
