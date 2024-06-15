// Slider arrows functionality

let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let seeMoreButtons = document.querySelectorAll(".seeMore")
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.list');

nextButton.addEventListener('click', () =>{
  showSlider("next")
});
prevButton.addEventListener('click', () =>{
  showSlider("prev")
});

const showSlider = (type) => {
  carousel.classList.remove("prev", "next");
  let items = document.querySelectorAll(".item")  
  if(type ==="next"){
    listHTML.appendChild(items[0]);
    //mueve el primer elemento (items[0]) al final del contenedor listHTML
    carousel.classList.add("next");
    //agrega la clase "next" al elemento carousel
  }
  else{
    let positionLast = items.length - 1;
    //Se calcula la posición del último elemento en la lista
    listHTML.prepend(items[positionLast]);
    //agrega el ultimo elemento al principio de la lista
    carousel.classList.add("prev");
 }
 
}