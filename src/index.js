const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const Routes = require('./routes/routes.js');

// Configuraciones del motor de vistas
app.set('case sensitive routing', true);
app.set('appName', 'TechRevamp');
app.set('port', 4000); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public'))); // Ruta correcta para archivos estáticos
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use(Routes);
app.use('/api', Routes);

// Inicia el servidor
const port = app.get('port');
app.listen(port, function () {
    console.log(`El servidor se está escuchando en: http://localhost:${port}`);
});
