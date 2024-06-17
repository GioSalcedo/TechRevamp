const { Router } = require('express');
const { productos } = require('../../public/js/products.js');

const router = Router();
const productosPorPagina = 4;

// Ruta Inicial
router.get("/", (req, res) => {
  res.render('index');
});

// Rutas
router.get("/productos", (req, res) => {
  const pagina = parseInt(req.query.pagina) || 1;
  const productosPorPagina = parseInt(req.query.productosPorPagina) || 4;
  const totalProductos = productos.productos.length;
  const totalPaginas = Math.ceil(totalProductos / productosPorPagina);

  const inicio = (pagina - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;

  const productosPaginados = productos.productos.slice(inicio, fin);

  if (req.xhr) { // Si la solicitud es AJAX
    res.json({
      productos: productosPaginados,
      pagina: pagina,
      totalPaginas: totalPaginas
    });
  } else { // Si es una solicitud normal
    res.render("products", {
      productos: productosPaginados,
      pagina: pagina,
      totalPaginas: totalPaginas,
      productosPorPagina: productosPorPagina
    });
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
