const express = require('express');
const ejs = require('ejs');
const path = require('path');
const morgan = require('morgan');

const app = express();
const Routes = require('./routes/routes.js');

app.set('case sensitive routing', true);
app.set('appName', 'TechRevamp');
app.set('port', 4000); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configura la aplicación para servir archivos estáticos desde el directorio 'public'
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.use(Routes);

const port = app.get('port');
app.listen(port, function () {
  console.log(`El servidor se está escuchando en: http://localhost:${port}`);
});
