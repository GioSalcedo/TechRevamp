// Toggle the active state of the menu when the toggle button is clicked
function toggleMenu() {
  const navbar = document.querySelector('.menu');
  const search = document.querySelector('.searchbar');
  const modalAccount = document.querySelector('.modal-account');

  navbar.classList.toggle('active');
  modalAccount.classList.toggle('active');
  search.classList.toggle('hidden');
}

// document.addEventListener('click', (e) => {
//   const modalAccount = document.querySelector('.modal-account');

//   const isClickInsideModalAccount = modalAccount.contains(e.target);

//   if(!isClickInsideModalAccount){
//     modalAccount.classList.remove('active');
//   }
// })

const btnLogout = document.getElementById('logoutOption');

btnLogout.addEventListener('click', logout);

function logout(e) {
  e.preventDefault();

  const userData = localStorage.getItem('userData');
  if (userData) {
    const { email, rememberMe } = JSON.parse(userData);
    
    fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    .then(response => {
      if (response.ok) {
        document.querySelector('.login-user').innerHTML = '<a href="/iniciar-sesion"><span class="login-user">Iniciar Sesión</span></a>';
        // Limpiar localStorage si el checkbox de remember me no está marcado
        if (rememberMe !== 'true') {
          localStorage.removeItem('userData');
        } else {
          // Solo actualizar el estado de isLoggedIn y el user id en localStorage
          const existingData = JSON.parse(localStorage.getItem('userData')) || {};
          existingData.isLoggedIn = false;
          existingData.userId = '';
          localStorage.setItem('userData', JSON.stringify(existingData));
        }
        // Resetear userName
        userName = ''; 
        window.location.href = '/iniciar-sesion';
      } else {
        console.error('Error al cerrar sesión');
      }
    })
    .catch(error => {
      console.error('Error de red:', error)
    });
  } else {
    window.location.href = '/iniciar-sesion';
    document.querySelector('.login-user').innerHTML = '<a href="/iniciar-sesion"><span class="login-user">Iniciar Sesión</span></a>';
    console.error('No hay datos de usuario en el almacenamiento local, así que no se pudo actualizar estado del usuario.');
  }
}