// start of modularization mode
function loadHTML(elementID, url) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementID).innerHTML = data;
    })
    .catch(error => console.error('Error cargando el HTML:', error));
}

document.addEventListener('DOMContentLoaded', function () {
  loadHTML('navbar', 'navbar/navbar.html');
  loadHTML('footer', 'footer/footer.html');
});

// navbar
// Toggle the active state of the menu when the toggle button is clicked
function toggleMenu() {
  const navbar = document.querySelector('.menu');
  const search = document.querySelector('.searchbar');

  navbar.classList.toggle('active');
  search.classList.toggle('hidden');
}

// Call the function on page load
// moveProductsLink();

// Add an event listener for window resize
window.addEventListener('resize', moveProductsLink);

