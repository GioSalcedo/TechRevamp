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

//Cerrar sesión
document.getElementById('logout').addEventListener('click', function(event) {
  event.preventDefault(); 
  // localStorage.removeItem('userData');
  window.location.href = '/iniciar-sesion';
});