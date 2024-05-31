// start of modularization mode

// Waiting for all DOM content to be fully loaded. Error handling is done in the Console.
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('navbar')) {
    loadHTML('navbar', '../components/navbar.html');
  } else {
    console.log('Elemento navbar no encontrado. Se omitió la carga del navbar.');
  }
  if (document.getElementById('footer')) {
    loadHTML('footer', '../components/footer.html');
  } else {
    console.log('Elemento footer no encontrado. Se omitió la carga del footer.');
  }
});

//Function that loads the contents of HTML files from a URL and inserts it into a DOM element with a specific ID
function loadHTML(elementID, url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      const element = document.getElementById(elementID);
      if (element) {
        element.innerHTML = data;
      } else {
        console.error(`Elemento con ID ${elementID} no encontrado`);
      }
    })
    .catch(error => console.error('Error cargando el HTML:', error));
}

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
// window.addEventListener('resize', moveProductsLink);



