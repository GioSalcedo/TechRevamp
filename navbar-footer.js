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
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('active');
}

// Move the products link to the right when the menu is toggled
function moveProductsLink() {
  const productsLink = document.querySelector('.navbar-products');
  const navbarRight = document.querySelector('.navbar-right');
  const navbarLeft = document.querySelector('.navbar-left');

  if (window.innerWidth <= 768) {
    if (!navbarRight.contains(productsLink)) {
      navbarRight.appendChild(productsLink);
    }
  // } else {
  //   if (!navbarLeft.contains(productsLink)) {
  //     navbarLeft.appendChild(productsLink);
  //   }
  }
}

// Call the function on page load
moveProductsLink();

// Add an event listener for window resize
window.addEventListener('resize', moveProductsLink);

