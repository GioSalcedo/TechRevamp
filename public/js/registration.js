document.getElementById("registration-Form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:4000/api/registrations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: document.getElementById("fullname").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    });
})