// Importa el módulo 'express' para crear una aplicación web
const express = require("express")
require('ejs ')

// Crea una instancia de la aplicación Express
const app = express();
const Routes = require("./src/routes/routes.js")

// Configuraciones del motor que usaremos
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))

app.use(Routes)
// Configura la aplicación para servir archivos estáticos desde el directorio "public"
//middleaware
app.use(express.static("public"));

// Inicia el servidor en el puerto 3000 y muestra un mensaje en la consola cuando el servidor está listo
app.listen(3000, function () {
  console.log("El servidor se está escuchando es: http://localhost:3000");
});
