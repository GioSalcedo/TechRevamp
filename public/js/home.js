//animated banner
const images = [
  '/img/home/banner 0 fixed.gif',
  '/img/home/banner 1 fixed.gif',
  '/img/home/banner 2 fixed.gif',
  '/img/home/banner 3 fixed.gif',
];

let currentImageIndex = 0;
const bannerImgElement = document.getElementById('bannerImg');

function changeBannerImage() {
  bannerImgElement.classList.add('fade-out');

  setTimeout(() => {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  bannerImgElement.src = images[currentImageIndex];
  bannerImgElement.classList.remove('fade-out');
  }, 1000);
}

// benner inicial
bannerImgElement.src = images[0];

setInterval(changeBannerImage, 5000);




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

//Scroll down B
downButton= document.querySelector('.downB')
downButton.addEventListener('click', function() {  
  const y = carousel.getBoundingClientRect().top + window.scrollY;
  window.scroll({
    top: y,
    behavior: 'smooth'
  });
});
