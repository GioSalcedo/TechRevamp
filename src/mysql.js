// importar pool de conexiones bd
//const pool = require ("./database/connection-database.js")
// encriptación
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Obtener lista productos
const getProducts = async () => {
  try{
      const [resultQuery] = await pool.query('SELECT * FROM `Products`');
      console.log(resultQuery);
  }
  catch(error){
      console.log(error);
  }
}

// Saber si un usuario está registrado
const getUsersRegistered = async (email) => {
  try{
    const [resultQuery] = await pool.query('SELECT * FROM users WHERE email = ?;', [email]);
    console.log("email del resultado", resultQuery[0]);
    // validar registros devueltos
    if (resultQuery.length > 0){
      return resultQuery[0]
    } else {
      return null;
    }}
  catch(error){
      console.log(error);
      throw new Error('Correo electrónico inválido.');
  }
};

// Actualizar estado login user
const updateLoginStateUser = async (state, email) => {
  const updateUsersQuery = "UPDATE `users` SET `is_logged_in`= ? WHERE email = ?;";
  try{
    await pool.query(updateUsersQuery, [state, email]);
  } catch(error){
      console.log('Error al actualizar el estado de logueo del usuario', error);
      throw new Error("Error al actualizar el estado de logueo del usuario desde mysql");
  }
}

// Registrar usuario nuevo
const registerUser = async (firstName, lastName, email, hash, phone, state) => {
  const insertUserQuery = "INSERT INTO `users` (first_name, last_name, email, password, phone, is_logged_in) VALUES (?, ?, ?, ?, ?, ?);";
  try {
    await pool.query(insertUserQuery, [firstName, lastName, email, hash, phone, state]);
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    throw new Error('Error al registrar el usuario.');
  }
}

// getProducts();
module.exports = {getUsersRegistered, updateLoginStateUser, registerUser};