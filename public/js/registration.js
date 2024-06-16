document.getElementById("registration-Form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeat-password").value;

    // Validate name
    if (fullname.length < 4) {
        alert("El nombre debe tener al menos 4 caracteres.");
        return;
    }

    // Validate email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return;
    }

    // Validate password
    const passwordPattern = /^(?=.*[!@#$%])(?=.*[A-Z]).{6,}$/;
    if (!passwordPattern.test(password)) {
        alert("La contraseña debe tener al menos 6 caracteres, incluyendo una mayúscula y un caracter especial !@#$%.");
        return;
    }

    // Validate repeat password
    if (password !== repeatPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    const res = await fetch("http://localhost:4000/api/registrations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fullname,
            email,
            password
        })
    });

    const data = await res.json();
    if (res.ok) {
        alert("¡Registro exitoso!");
    } else {
        alert(`Error en el registro: ${data.message}`);
    }
});