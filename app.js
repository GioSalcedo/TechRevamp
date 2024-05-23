// start of modularization mode
function loadHTML(elementID, url) {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        document.getElementById(elementID).innerHTML = data;
      })
      .catch(error => console.error('Error cargando el HTML:', error));
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    loadHTML('navbar', 'navbar/navbar.html');
    // loadHTML('footer', 'footer/footer.html');
  });
  