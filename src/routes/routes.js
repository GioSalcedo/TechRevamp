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

// Manejo de rutas no encontradas (404)
router.use((req, res) => {
  res.status(404).send('No se encontró esta página');
});

module.exports = router;
