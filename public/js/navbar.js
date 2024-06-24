// Toggle the active state of the menu when the toggle button is clicked
function toggleMenu() {
  const navbar = document.querySelector('.menu');
  const search = document.querySelector('.searchbar');

  navbar.classList.toggle('active');
  search.classList.toggle('hidden');
}

//Cerrar sesión
document.getElementById('logout').addEventListener('click', function(event) {
  event.preventDefault(); 
  // localStorage.removeItem('userData');
  window.location.href = '/iniciar-sesion';
});