// Importa los módulos necesarios
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const morgan = require('morgan');

// Crea una instancia de la aplicación Express
const app = express();
const Routes = require('./routes/routes.js');

// Configuraciones del motor que usaremos
app.set('case sensitive routing', true);
app.set('appName', 'TechRevamp');
app.set('port', 4000); // Configura el puerto aquí
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configura la aplicación para servir archivos estáticos desde el directorio 'public'
// Middlewares
app.use(morgan('dev'));
app.use(express.static('public'));

app.use(Routes);

// Inicia el servidor en el puerto configurado y muestra un mensaje en la consola cuando el servidor está listo
const port = app.get('port');
app.listen(port, function () {
  console.log(`El servidor se está escuchando en: http://localhost:${port}`);
});
