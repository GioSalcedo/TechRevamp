const { Router } = require('express');
const path = require('path');
const fs = require('fs');
const router = Router();
// const authentication = require('./controllers/userControllers');

// Ruta Inicial
router.get("/", (req, res) => {
  res.render('index');
});


// Rutas
router.get("/productos", (req, res) => {
  res.render('products');
});

router.get("/acerca-de-nosotros", (req, res) => {
  res.render('about-us');
});

router.get("/contactanos", (req, res) => {
  res.render('contact-form');
});

router.get("/ayuda", (req, res) => {
  res.render('help');
});

router.get("/cuenta", (req, res) => {
  res.render('account');
});

router.get("/servicio-reparacion", (req, res) => {
  res.render('repair-form');
});

router.get("/carrito", (req, res) => {
  res.render('cart');
});

router.get("/faqs", (req, res) => {
  res.render('faqs');
});

router.get("/admin/nuevos-productos", (req, res) => {
  res.render('form-new-products');
});

router.get("/registro", (req, res) => {
  res.render('registration');
});


router.get("/iniciar-sesion", (req, res) => {
  res.render('login');
});

router.post("/api/login");

//Tarea 7 - eliminar luego de evaluar
router.get("/agregar-elementos", (req, res) => {
  res.render('tarea-7-console');
});

router.post("/api/registrations", (req, res) => {
  const { fullname, email, password, phone, repeatPassword } = req.body;

  // Validate name
  if (!fullname || fullname.length < 4) {
      return res.status(400).json({ message: "El nombre debe tener al menos 4 caracteres." });
  }

  // Validate phone
  const phoneNumberRegex = /^\d+$/;
  if (!phoneNumberRegex.test(phone)) {
    return res.status(400).json({ message: 'Por favor, ingrese un número de teléfono válido que contenga solo números.' });
  } else if (phone.length !== 10) {
    return res.status(400).json({ message: 'Por favor, ingrese un número de teléfono de 10 dígitos.' });
  } else if (!phone.startsWith('3')) {
    return res.status(400).json({ message: 'Los números de teléfono deben iniciar con 3.' });
  }

  // Validate email
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
      return res.status(400).json({ message: "Por favor, ingrese un correo electrónico válido." });
  }

  // Validate password
  const passwordPattern = /^(?=.*[<>^&*@()\-_+={}])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
  if (!passwordPattern.test(password)) {
      return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres, incluyendo una mayúscula y un caracter especial !@#$%." });
  }

  // Validate repeat password
  if (password !== repeatPassword) {
      return res.status(400).json({ message: `Las contraseñas no coinciden en el server. 1 - ${password}, 2-${repeatPassword}` });
  }

  // Read existing data from JSON file
  const filePath = path.join(__dirname, "../../api/users.json");
  fs.readFile(filePath, (err, data) => {
    if (err && err.code !== 'ENOENT') {
      return res.status(500).json({ message: "Error del servidor al leer el archivo." });
    }

    let users = [];
    if (data && data.length > 0) {
      try {
        users = JSON.parse(data);
      } catch (parseError) {
        return res.status(500).json({ message: "Error del servidor al analizar el archivo." });
      }
    }

      // Add new user
      const newUser = { fullname, phone, email, password };
      users.push(newUser);

      // Save updated users list back to the file
      fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
          if (err) {
              return res.status(500).json({ message: "Error del servidor." });
          }
          res.status(201).json({ message: "Registro exitoso." });
      });
  });
});

// Manejo de rutas no encontradas (404)
router.use((req, res) => {
  res.status(404).send('No se encontró esta página');
});

module.exports = router;