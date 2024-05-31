const { Router } = require('express');

const router = Router()

// Ruta Inicial
router.get("/", (req, res) => {
  res.render('index.ejs', {
    root: __dirname
  })
})

// Rutas
router.get("/productos", (req, res) => {
  res.render('products', {
    root: __dirname
  });
})

router.use((req, res) => {
  res.send('No se encontro esta pagina')
})


module.exports = router;