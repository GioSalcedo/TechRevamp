//values start
let scrollContainer = document.getElementsByClassName('scroll-container');
//Cuando llamo por classname, los elementos se guardan en un arreglo, en este caso, arreglo de 1 solo elemento.

let scroll1 = document.getElementsByClassName('scroll-1');
let scroll2 = document.getElementsByClassName('scroll-2');

scrollContainer[0].addEventListener('mouseover', pauseAnimation)
scrollContainer[0].addEventListener('mouseout', resumeAnimation)

// Función para pausar la animación
function pauseAnimation() {
  scroll1[0].style.animationPlayState = 'paused';
  scroll2[0].style.animationPlayState = 'paused';
}

// Función para reanudar la animación
function resumeAnimation() {
  scroll1[0].style.animationPlayState = 'running';
  scroll2[0].style.animationPlayState = 'running';
}

let mainContents = document.getElementsByClassName('value-card-main-content');

// ciclo for para crear un evento para cada tarjeta
for (element of mainContents) {
  element.addEventListener('mouseover', function (e) {
    setTimeout(() => {
      e.target.parentElement.children[0].style.visibility = 'visible';
    }, 100)
  })
  element.addEventListener('mouseout', function (e) {
    e.target.parentElement.children[0].style.visibility = 'hidden';
  })
}

