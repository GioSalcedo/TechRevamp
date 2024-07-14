// Constantes express
const { Router } = require('express');
const router = Router();
const path = require('path');
const fs = require('fs');
let userName ='';

// Middleware para agregar userName al contexto de todas las vistas renderizadas
router.use((req, res, next) => {
  res.locals.userName = userName;
  next();
});

// Autenticación
const bcrypt = require('bcrypt');
const { data } = require('jquery');
const saltRounds = 10;
let state = 0;

const BASE_URL = 'http://localhost:8080/api/v1';

router.get("/", (req, res) => {
  const file = fs.readFileSync('api/products.json', 'UTF-8');
  const json = JSON.parse(file);
  const productos = json.home;

  const page = parseInt(req.query.page) || 1;
  const perPage = 8;
  const start = (page - 1) * perPage;
  const end = start + perPage;

  const paginatedProducts = productos.slice(start, end);
  const totalPages = Math.ceil(productos.length / perPage);

  // Render the main products page
  res.render('index', { productos: paginatedProducts, page, totalPages, userName });
});

router.get("/home-parcial", (req, res) => {
  const file = fs.readFileSync('api/products.json', 'UTF-8');
  const json = JSON.parse(file);
  const productos = json.home;

  const page = parseInt(req.query.page) || 1;
  const perPage = 8;
  const start = (page - 1) * perPage;
  const end = start + perPage;

  const paginatedProducts = productos.slice(start, end);
  const totalPages = Math.ceil(productos.length / perPage);

  
  res.render('partials/container-home-products', { productos: paginatedProducts });
});

router.get('/productos', async (req, res) => {
  try {
    const productosBackend = await fetch(`${BASE_URL}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const productos = await productosBackend.json();

    const page = parseInt(req.query.page) || 1;
    const perPage = 8;
    const start = (page - 1) * perPage;
    const end = start + perPage;

    const paginatedProducts = productos.slice(start, end);
    const totalPages = Math.ceil(productos.length / perPage);

    res.render('products', { productos: paginatedProducts, page, totalPages });
  } catch (error) {
      console.error("Error al traer los productos desde el backend", error);
      res.status(500).json({ success: false, message: `Error del servidor al intentar obtener productos.` });
  }
});

router.get('/productos-parcial', async (req, res) => {
  try {
    const productosBackend = await fetch(`${BASE_URL}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const productos = await productosBackend.json();

    const page = parseInt(req.query.page) || 1;
    const perPage = 8;
    const start = (page - 1) * perPage;
    const end = start + perPage;

    const paginatedProducts = productos.slice(start, end);

    res.render('partials/container-products', { productos: paginatedProducts });
  } catch (error) {
    console.error("Error al traer los productos desde el backend", error);
    res.status(500).json({ success: false, message: `Error del servidor al intentar obtener productos.` });
}
});

router.get('/productos/:id', (req, res) => {
  const file = fs.readFileSync('api/products.json', 'UTF-8');
  const json = JSON.parse(file);
  const productos = json.productos;
  const productId = req.params.id;
  const product = productos.find(p => p.productId == productId);

  if (product) {
    res.render('product-detail', { producto: product });
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

router.get("/carro-compras", (req, res) => {
  const file = fs.readFileSync('api/products.json', 'UTF-8');
  const json = JSON.parse(file);
  const productos = json.productos;

  const page = parseInt(req.query.page) || 1;
  const perPage = 4;
  const start = (page - 1) * perPage;
  const end = start + perPage;

  const paginatedProducts = productos.slice(start, end);

  res.render('shopping-cart', { productos: paginatedProducts});
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

router.get("/faqs", (req, res) => {
  res.render('faqs');
});

router.get("/admin/nuevos-productos", (req, res) => {
  res.render('form-new-products');
});

router.get("/registro", (req, res) => {
  res.render('registration');
});

//!LOGIN
router.post("/api/login", async (req, res) => {
  const { email, password, rememberMe } = req.body;
  try {
    const user = await fetch(`${BASE_URL}/users/email/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });  

    const data = await user.json();
    console.log('User:', data);

    // Validar que el usuario esté registrado
    if (user.ok) {

      bcrypt.compare(password, data.password, async (compareErr, compareResult) => {
      if (compareErr) {
        return res.status(500).json({ message: "Error del servidor al comparar la contraseña." });
      }

      if (compareResult) {
        if (rememberMe) {
          const firstName  = data.firstName;
          localStorage.setItem('userData', JSON.stringify({ firstName, email, password}));
        }
        try {
          // Actualizar el estado de logueo del usuario
          data.isLoggedIn = 1;
          const UpdateUser = await fetch(`${BASE_URL}/users/${data.userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });

          //asignar nombre logueado a userName impreso 
          userName = data.firstName;

          res.status(200).json({ success: true, message: "Inicio de sesión exitoso.", user });
        } catch (err) {
          res.status(500).json({success: false, message: `Error al actualizar el estado de logueo del usuario. desde routes, estado ${data.isLoggedIn}, error catch ${err}, ` });
        }

      } else {
        res.status(401).json({ success: false, message: `Contraseña incorrecta.`});
      }
    });
    }} 
    catch (error) {
        console.error("Error al intentar iniciar sesión:", error);
        res.status(500).json({ success: false, message: "Error del servidor al intentar iniciar sesión." });
    }
});  
// !LOGOUT
router.post("/api/logout", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await fetch(`${BASE_URL}/users/email/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await user.json();

    if (user.ok) {
      data.isLoggedIn = 0;
      const UpdateUser = await fetch(`${BASE_URL}/users/${data.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      res.status(200).json({ success: true, message: "Cierre de sesión exitoso." });
    } else {
      res.status(404).json({ success: false, message: "Usuario no encontrado." });
    }
  } catch (error) {
    console.error("Error al intentar cerrar sesión:", error);
    res.status(500).json({ success: false, message: "Error del servidor al intentar cerrar sesión." });
  }
});

router.get("/cerrar-sesion", (req, res) => {
  res.redirect('/iniciar-sesion');
});

router.get("/iniciar-sesion", (req, res) => {
  res.render('login');
});

//? Registro de usuarios
router.post("/api/registrations", async (req, res) => {
  const { firstName, lastName, email, password, phone, repeatPassword } = req.body;

  // Validate first name
  if (!firstName || firstName.length < 4) {
    return res.status(400).json({ message: "El nombre debe tener al menos 4 caracteres." });
  }
  // Validate last name
  if (!lastName || lastName.length < 4) {
    return res.status(400).json({ message: "El apellido debe tener al menos 4 caracteres." });
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
  const passwordPattern = /^(?=.*[%#$<>&^*@()\-_+={}])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
  if (!passwordPattern.test(password)) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula y un caracter especial: % # $ < > & ^ * @ ( ) - _ + = { }'});
  }

  // Validate repeat password
  if (password !== repeatPassword) {
    return res.status(400).json({ message: `Las contraseñas no coinciden en el server. 1 - ${password}, 2-${repeatPassword}` });
  }

  try{
    const user = await fetch(`${BASE_URL}/users/email/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Validar que el usuario no sea null ni undefined
    if (user.ok) {
      res.status(400).json({message: "El correo electrónico ya se encuentra registrado"})
    }else {
      // Add new user

    const hash = await bcrypt.hash(password, saltRounds);
    // Pendiente *modificar firstname y lastname en form registro. 
    const newUser = {
      firstName,
      lastName,
      email,
      password: hash,
      phone, 
      isLoggedIn: true
    };

    //REGISTRA USUARIO.
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser)
    });

    if(response.ok){
      userName = firstName;
      res.status(201).json({ success: true, message: "Registro exitoso." });
    } else{
      throw new Error('Error al registrar usuario en la API Spring Boot');
    }
  }} catch (error){
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ message: "Error del servidor al registrar el usuario." });
  }
});

// Manejo de rutas no encontradas (404)
router.use((req, res) => {
  res.status(404).send('No se encontró esta página');
});

module.exports = router;