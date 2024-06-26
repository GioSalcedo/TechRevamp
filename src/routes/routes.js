const { Router } = require('express');
const path = require('path');
const fs = require('fs');

const router = Router();
// const authentication = require('./controllers/userControllers');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

  // Obtener usuario sesión iniciada
  const fileUser = fs.readFileSync('api/userLogged.json', 'UTF-8');
  const userData = JSON.parse(fileUser);
  const userName = userData.fullname;
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


// routes.js
router.get('/productos', (req, res) => {
  const file = fs.readFileSync('api/products.json', 'UTF-8');
  const json = JSON.parse(file);
  const productos = json.productos;

  const page = parseInt(req.query.page) || 1;
  const perPage = 8;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const paginatedProducts = productos.slice(start, end);

  const totalPages = Math.ceil(productos.length / perPage);

  // Obtener usuario sesión iniciada
  const fileUser = fs.readFileSync('api/userLogged.json', 'UTF-8');
  const userData = JSON.parse(fileUser);
  const userName = userData.fullname;

  // Render the main products page
  res.render('products', { productos: paginatedProducts, page, totalPages, userName });
});

router.get('/productos-parcial', (req, res) => {
  const file = fs.readFileSync('api/products.json', 'UTF-8');
  const json = JSON.parse(file);
  const productos = json.productos;

  const page = parseInt(req.query.page) || 1;
  const perPage = 8;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const paginatedProducts = productos.slice(start, end);

  res.render('partials/container-products', { productos: paginatedProducts });
});

router.get('/productos/:id', (req, res) => {
  const productId = req.params.id;
  const product = productos.find(p => p.id == productId);

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

router.post("/api/login", (req, res) => {
  const { email, password, rememberMe } = req.body;
  const filePath = path.join(__dirname, "../../api/users.json");
  const fileUserLogged = path.join(__dirname, "../../api/userLogged.json");

  fs.readFile(filePath, (err, data) => {
    if (err) {
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

    const user = users.find(user => user.email === email);
    if (user) {
      // Comparar la contraseña ingresada con el hash almacenado
      bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
          return res.status(500).json({ message: "Error del servidor al comparar la contraseña." });
        } else if (result) {
          if(rememberMe){
            // Si se marcó "Recuérdame", guardar los datos en localStorage
            localStorage.setItem('userData', JSON.stringify({ email, password }));
          }
          // Contraseña correcta
          //Escribe un archivo temporal con usuario logueado
          fs.writeFile(fileUserLogged, JSON.stringify(user, null, 2), (err) => {
            if (err) {
              return res.status(500).json({ message: "Error del servidor al guardar el usuario logueado" });
            }
            res.status(200).json({ success: true, message: "Inicio de sesión exitoso." });
          })
        } else {
          // Contraseña incorrecta
          return res.status(401).json({ success: false, message: "Contraseña incorrecta." });
        }
      });
    } else {
      // Usuario no encontrado
      return res.status(401).json({ success: false, message: "Correo electrónico inválido." });
    }
  });
});

router.get("/cerrar-sesion", (req, res) => {
  res.redirect('/iniciar-sesion');
});
router.get("/iniciar-sesion", (req, res) => {
  res.render('login');
});

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
  const passwordPattern = /^(?=.*[%#$<>&^*@()\-_+={}])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
  if (!passwordPattern.test(password)) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula y un caracter especial: % # $ < > & ^ * @ ( ) - _ + = { }'});
  }

  // Validate repeat password
  if (password !== repeatPassword) {
    return res.status(400).json({ message: `Las contraseñas no coinciden en el server. 1 - ${password}, 2-${repeatPassword}` });
  }

  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
      return res.status(500).json({ message: "Error al encriptar la contraseña." });
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

      const user = users.find(user => user.email === email);

      if(user){
        res.status(400).json({message: "El correo electrónico ya se encuentra registrado"})
      }else{
        // Add new user
        const newUser = { fullname, phone, email, password: hash };
        users.push(newUser);

        // Save updated users list back to the file
        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
          if (err) {
            return res.status(500).json({ message: "Error del servidor." });
          }
          res.status(201).json({ success: true, message: "Registro exitoso." });
        });
      } 
    });
  });  
});

// Manejo de rutas no encontradas (404)
router.use((req, res) => {
  res.status(404).send('No se encontró esta página');
});

module.exports = router;