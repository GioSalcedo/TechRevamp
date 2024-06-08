const { Router } = require('express');

const router = Router();

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
  res.render('register');
});

router.get("/iniciar-sesion", (req, res) => {
  res.render('login');
});


//Tarea 7 - eliminar luego de evaluar
router.get("/agregar-elementos", (req, res) => {
  res.render('tarea-7-console');
});

// Manejo de rutas no encontradas (404)
router.use((req, res) => {
  res.status(404).send('No se encontró esta página');
});

module.exports = router;
