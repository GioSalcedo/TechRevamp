// start of modularization mode for FAQs
function loadHTML(elementID, url) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementID).innerHTML = data;
    })
    .catch(error => console.error('Error cargando el HTML:', error));
}

document.addEventListener('DOMContentLoaded', function () {
  loadHTML('faqs', 'faqs/faqs.html');
});