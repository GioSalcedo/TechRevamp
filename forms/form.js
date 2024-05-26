// Start of the form validation
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form');
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const topicSelect = document.getElementById('topic');
    const messageTextarea = document.getElementById('message');
    const submitButton = form.querySelector('button[type="submit"]');
    const errorParagraph = document.createElement('p');
    errorParagraph.style.color = 'var(--Colors-semantic-error, #e93828)';
    submitButton.insertAdjacentElement('afterend', errorParagraph);

    const errorColor = 'var(--Colors-semantic-error, #e93828)';

    function clearErrorStyles() {
        emailInput.style.borderColor = '';
        nameInput.style.borderColor = '';
        phoneInput.style.borderColor = '';
        topicSelect.style.borderColor = '';
        messageTextarea.style.borderColor = '';
        errorParagraph.innerHTML = ''; // Clear any previous error messages
    }

    function validateEmail() {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = errorColor;
            return 'Por favor, ingrese un correo electrónico válido.';
        }
        return '';
    }

    function validateName() {
        if (nameInput.value.trim() === '') {
            nameInput.style.borderColor = errorColor;
            return 'Por favor, ingrese su nombre.';
        }
        return '';
    }

    function validatePhone() {
        const phoneValue = phoneInput.value.trim();
        const phoneNumberRegex = /^\d+$/;
        if (!phoneNumberRegex.test(phoneValue)) {
            phoneInput.style.borderColor = errorColor;
            return 'Por favor, ingrese un número de teléfono válido que contenga solo números.';
        } else if (phoneValue.length !== 11) {
            phoneInput.style.borderColor = errorColor;
            return 'Por favor, ingrese un número de teléfono de 11 dígitos.';
        } else if (!phoneValue.startsWith('3')) {
            phoneInput.style.borderColor = errorColor;
            return 'Los números de teléfono deben iniciar con 3.';
        }
        return '';
    }

    function validateTopic() {
        if (topicSelect.value === '') {
            topicSelect.style.borderColor = errorColor;
            return 'Por favor, seleccione un tema.';
        }
        return '';
    }

    function validateMessage() {
        if (messageTextarea.value.trim().length < 50) {
            messageTextarea.style.borderColor = errorColor;
            return 'Por favor, ingrese un mensaje de al menos 50 caracteres.';
        }
        return '';
    }

    function showError(message) {
        errorParagraph.innerHTML = message;
    }

    function restrictInputToNumbers(event) {
        const key = event.key;
        if (!/^\d$/.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Tab') {
            event.preventDefault();
        }
    }

    phoneInput.addEventListener('keydown', restrictInputToNumbers);

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        clearErrorStyles();

        let errorMessage = validateEmail();
        if (errorMessage) {
            showError(errorMessage);
            return;
        }

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

        errorMessage = validateTopic();
        if (errorMessage) {
            showError(errorMessage);
            return;
        }

        errorMessage = validateMessage();
        if (errorMessage) {
            showError(errorMessage);
            return;
        }

        // If no errors, allow form submission
        errorParagraph.innerHTML = '';
        form.submit();
    });
});
// End of the form validation
