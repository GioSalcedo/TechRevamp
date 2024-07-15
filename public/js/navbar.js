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
    const email = JSON.parse(userData).email;
    
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
        localStorage.removeItem('userData'); // Limpiar localStorage después del logout
        window.location.href = '/iniciar-sesion'; // Redirigir después de completar fetch
        userName = '';
      } else {
        console.error('Error al cerrar sesión');
      }
    })
    .catch(error => console.error('Error de red:', error));
  } else {
    console.error('No hay datos de usuario en el almacenamiento local.');
  }
}

// function logout(){
//   fetch('/cerrar-sesion', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(response => {
//     if (response.ok) {
//       document.querySelector('.login-user').innerHTML = '<a href="/iniciar-sesion"><span class="login-user">Iniciar Sesión</span></a>';
//       document.querySelector('.modal-account').classList.add('toggle');
//     } else {
//       console.error('Error al cerrar sesión');
//     }
//   })
//   .catch(error => console.error('Error de red:', error));
// }