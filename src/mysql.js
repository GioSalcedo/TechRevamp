// importar pool de conexiones bd
const pool = require ("./database/connection-database.js")
const variables = require("./routes/routes.js")
const userLogin = variables.user;
// Conexión a la db
const getProducts = async () => {
  try{
      const [result] = await pool.query('SELECT * FROM `Products`');
      console.log(result);
      console.log("usuario logueado ", userLogin);
  }
  catch(error){
      console.log(error);
  }
}

getProducts();