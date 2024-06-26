const containerRecommendation = document.querySelector(".galery-recommendation");
const docks = document.querySelectorAll(".dock");

containerRecommendation.style.transform = 'translateX(0%)';
docks[0].classList.add('active');

let currentIndex = 0;

function updateActiveDock(index) {
  docks.forEach((dock, i) => {
    if (i === index) {
      dock.classList.add('active');
    } else {
      dock.classList.remove('active');
    }
  });
}

function updateContainerPosition() {
  let operation = currentIndex * -33.33; 
  containerRecommendation.style.transform = `translateX(${operation}%)`;
}

docks.forEach((dock, i) => {
  dock.addEventListener("click", () => {
    currentIndex = i;
    updateContainerPosition();
    updateActiveDock(currentIndex);
  });
});

// Descomenta si deseas la rotación automática del carrusel
// setInterval(() => {
//   currentIndex = (currentIndex + 1) % docks.length;
//   updateContainerPosition();
//   updateActiveDock(currentIndex);
// }, 6000);
