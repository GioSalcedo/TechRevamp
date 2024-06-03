// eventosTarjetas.js

export function setupCardEvents() {
  let mainContents = document.getElementsByClassName('value-card-main-content');

  for (let element of mainContents) {
    element.addEventListener('mouseover', function (e) {
      setTimeout(() => {
        e.target.parentElement.children[0].style.visibility = 'visible';
      }, 100);
    });
    element.addEventListener('mouseout', function (e) {
      e.target.parentElement.children[0].style.visibility = 'hidden';
    });
  }
}
