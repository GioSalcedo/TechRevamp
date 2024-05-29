// Importa el módulo 'express' para crear una aplicación web
import express from "express";

// Crea una instancia de la aplicación Express
const app = express();

// Configuraciones del motor que usaremos
app.set("view engine", "ejs");

// Configura la aplicación para servir archivos estáticos desde el directorio "public"
app.use(express.static("public"));

// Inicia el servidor en el puerto 3000 y muestra un mensaje en la consola cuando el servidor está listo
app.listen(3000, function() {
  console.log("El servidor se está escuchando");
});
