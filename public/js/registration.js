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

//mongoDB? mongoose npm


//https://www.freecodecamp.org/learn/quality-assurance/advanced-node-and-express/registration-of-new-users

//example with jquery

// let formFields = $("fieldset");

// let activeForm = $("active");

// function currentField(formFields) {
//   for (let index = 0; index < formFields.length; index++) {
//     if ($(formFields[index]).hasClass("active")) {
//       return index;
//     }
//   }
// }

// //this code is for progress bar percentage

// let formProgress = 0;
// $("form input, form select").on("input", function () {
//   //if input has value and doesnt have full clase, we add percentage to the progress
//   if ($(this).val() !== "" && !$(this).hasClass("full")) {
//     formProgress += 1 / $('form input[value!=""], form select').length;
//     $(this).addClass("full");
//     setBarPercentage(Math.floor(formProgress * 100));
//   }
//   //else, input is empty, we substract his value in percentage
//   //if it is a checkbox and was putted in false, we substract his value
//   else if ($(this).val() == "" || ($(this).attr("type") == "checkbox" && $(this).prop("checked") == false)) {
//     formProgress -= 1 / $('form input[value!=""], form select').length;
//     $(this).removeClass("full");
//     setBarPercentage(Math.floor(formProgress * 100));
//   }

  
// });

// //Form validation
// $.validator.setDefaults({
//   submitHandler: function () {
//     alert("submitted!");
//   },
// });

// jQuery.validator.addMethod(
//   "password_validation",
//   function (value, element) {
//     return this.optional(element) || validatePassword(value);
//   },
//   "Password error"
// );
// function validatePassword(pass) {
//   let mayus = new RegExp("^(?=.*[A-Z])");
//   let special = new RegExp("^(?=.*[!@#$%&*])");
//   let numbers = new RegExp("^(?=.*[0-9])");
//   let lower = new RegExp("^(?=.*[a-z])");

//   let regExp = [mayus, special, numbers, lower];

//   if (pass.length < 8 || pass.length > 20) return false;

//   for (var i = 0; i < 4; i++) {
//     if (!regExp[i].test(pass)) {
//       return false;
//     }
//   }
//   return true;
// }

// $(document).ready(function () {
//   form = $("#register-form");
//   form.validate({
//     rules: {
//       first_name: "required",
//       last_name: "required",
//       genre: "required",
//       date_birth: "required",
//       country_birth: "required",
//       state_birth: "required",
//       city_birth: "required",
//       personal_document_file: "required",

//       password: {
//         required: true,
//         password_validation: true,
//         minlength: 8,
//       },
//       repeat_password: {
//         required: true,
//         minlength: 8,
//         equalTo: "#password",
//       },
//       accept_terms: "required",
//     },
   

//     messages: {
//       first_name: "Por favor introduce tu nombre(s)",
//       last_name: "Por favor introduce tu apellido paterno",
//       genre: "Por favor elige un género",
//       date_birth: "Por favor, introduce tu fecha de nacimiento",
//       country_birth: "Por favor, introduce tu país de nacimiento",
//       state_birth: "Por favor, introduce tu estado de nacimiento",
//       city_birth: "Por fabor introduce tu ciudad de nacimiento",
//       personal_document_file: "Por favor, adjunta tu documento personal",
//       password: {
//         required: "Por favor introduce la contraseña",
//         minlength: "Tu contraseña debe tener minimo 8 caracteres",
//       },
//       repeat_password: {
//         required: "Por favor introduce la contraseña",
//         minlength: "Tu contraseña debe tener minimo 8 caracteres",
//         equalTo: "Por favor introduce la misma contraseña",
//       },
//       accept_terms: "Por favor acepta nuestras politicas",
//     },
//     errorElement: "em",
//     errorPlacement: function (error, element) {
//       error.addClass("help-block");
//     },

//     sucess: function (label, element) {
       
//     },

//     highlight: function (element, errorClass, validClass) {
//       $(element).addClass("has-error border-danger").removeClass("has-sucess border-success");
//       $(element).next().addClass("text-danger");
      

//     },
//     unhighlight: function (element, errorClass, validClass) {
//       $(element).addClass("has-sucess border-success").removeClass("has-error border-danger");
//       $(element).next().removeClass("text-danger");
    
     
     
//     },
//   });


//   //fill inputs for testing
// //   $("#name").val("Adrian");
// //   $("#last_name").val("Rivas");
// //   $("#second_last_name").val("Escarcega");
// //   $("#genre").val("man");
// //   $("#date_birth").val("2003-01-08");
  



// });




// function setBarPercentage(barPercentage) {
//   $(".progress-bar").css("width", barPercentage + "%");
//   $(".progress-percentage").animate({ opacity: 0 }, 150, function () {
//     $(this)
//       .html(barPercentage + "%")
//       .animate({ opacity: 1 }, 300);
//   });
// }

// function setSteps(indexOfCurrentField) {
//   let numberSteps = formFields.length;
//   let currentStep = indexOfCurrentField;
//   $(".step-counter").html("Paso " + (currentStep + 1) + " de " + numberSteps);
// }



// function getCurpFromInputs(){
//     let first_name = $("#first_name").val();
//     last_name = $("#last_name").val();
//     second_last_name = $("#second_last_name").val();
//     genre = $("#genre").val();

//     birth = new Date($("#date_birth").val());
//     birth.setDate(birth.getDate() + 1);
   
//     const dayOfBirth = ("0" + birth.getDate()).slice(-2);
//     const monthOfBirth = ("0" + (birth.getMonth() + 1)).slice(-2);
//     const yearOfBirth = birth.getFullYear().toString().slice(-2);
//     //console.log(first_name + last_name + second_last_name + "birth: " + birth);
//     curp = last_name[0].toUpperCase();
//     curp += last_name.match(/[aeiouáéíóúAEIOUÁÉÍÓÚ]/i).toString().toUpperCase();
//     curp += second_last_name[0].toUpperCase();
//     curp += first_name[0].toUpperCase();
//     curp += yearOfBirth;
//     curp += monthOfBirth;
//     curp += dayOfBirth;
//     if (genre === "man") {
//       curp += "H";
//     } else if(genre ==="woman") {
//       curp += "M";
//     }
//     else{
//       curp+="X"
//     }
    

//     console.log(curp);
// }

// $("#personal_document_file ").change(function () {
//   console.log("File selected");
//   $("#personal-document .previous, #personal-document .next").prop(
//     "disabled",
//     true
//   );
//   $("#loader-section").css("display", "flex");

//   let curpPromise = new Promise((resolve, reject) => {
//     //call the curp api
//     setTimeout(function () {
        
//       getCurpFromInputs()

//       resolve(curp);
//     }, 1500);
//   });

//   curpPromise
//     .then((curp) => {
//       $("#personal-document .previous, #personal-document .next").prop(
//         "disabled",
//         false
//       );
//       $("#loader-section").css("display", "none");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// $(".previous").click(function () {
//   indexOfCurrentField = currentField(formFields);
//   setSteps(indexOfCurrentField - 1);

//   let currentFormField = formFields[indexOfCurrentField];
//   let previousFormField = formFields[indexOfCurrentField - 1];

//   $(currentFormField).animate(
//     {
//       opacity: 0,
//       position: "relative",
//       left: "50px",
//     },
//     250,
//     function () {
//       $(currentFormField).removeClass("active");
//       $(previousFormField).addClass("active");
//       $(currentFormField).css({ opacity: 1, left: 0 });
//     }
//   );
// });

// $(".next").click(function () {
//   if (form.valid()) {
//     indexOfCurrentField = currentField(formFields);
//     setSteps(indexOfCurrentField + 1);

//     let currentFormField = formFields[indexOfCurrentField];

//     let nextFormField = formFields[indexOfCurrentField + 1];

//     $(currentFormField).animate(
//       {
//         opacity: 0,
//         position: "relative",
//         left: "50px",
//       },
//       250,
//       function () {
//         $(currentFormField).removeClass("active");
//         $(nextFormField).addClass("active");
//         $(currentFormField).css({ opacity: 1, left: 0 });
//       }
//     );
//   }
// });
