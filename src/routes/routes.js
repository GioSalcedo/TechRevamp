const { Router } = require('express');
const fs = require("fs")
const router = Router();

router.get("/", (req, res) => {
  res.render('index');
});

// routes.js
router.get('/productos', (req, res) => {
  const file = fs.readFileSync('api/products.json', 'UTF-8');
  const json = JSON.parse(file);
  const productos = json.productos;

  const page = parseInt(req.query.page) || 1;
  const perPage = 4;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const paginatedProducts = productos.slice(start, end);

  const totalPages = Math.ceil(productos.length / perPage);

  res.render('products', { productos: paginatedProducts, page, totalPages });
});

router.get('/productos-parcial', (req, res) => {
  const file = fs.readFileSync('api/products.json', 'UTF-8');
  const json = JSON.parse(file);
  const productos = json.productos;

  const page = parseInt(req.query.page) || 1;
  const perPage = 4;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const paginatedProducts = productos.slice(start, end);

  res.render('partials/container-products', { productos: paginatedProducts });
});

router.get('/productos/:id', (req, res) => {
  const file = fs.readFileSync('api/products.json', 'UTF-8');
  const json = JSON.parse(file);
  const productos = json.productos;

  const productId = req.params.id;
  const product = productos.find(p => p.id == productId);

  if (product) {
    res.render('product-detail', { producto: product });
  } else {
    res.status(404).send('Producto no encontrado');
  }
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

//Tarea 7 - eliminar luego de evaluar
router.get("/agregar-elementos", (req, res) => {
  res.render('tarea-7-console');
});

// Manejo de rutas no encontradas (404)
router.use((req, res) => {
  res.status(404).send('No se encontró esta página');
});

module.exports = router;
