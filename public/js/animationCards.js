// animacion.js

export function setupScrollAnimations() {
  let scrollContainer = document.getElementsByClassName('scroll-container');
  let scroll1 = document.getElementsByClassName('scroll-1');
  let scroll2 = document.getElementsByClassName('scroll-2');

  if (scrollContainer.length > 0) {
    scrollContainer[0].addEventListener('mouseover', pauseAnimation);
    scrollContainer[0].addEventListener('mouseout', resumeAnimation);
  }

  function pauseAnimation() {
    if (scroll1.length > 0) {
      scroll1[0].style.animationPlayState = 'paused';
    }
    if (scroll2.length > 0) {
      scroll2[0].style.animationPlayState = 'paused';
    }
  }

  function resumeAnimation() {
    if (scroll1.length > 0) {
      scroll1[0].style.animationPlayState = 'running';
    }
    if (scroll2.length > 0) {
      scroll2[0].style.animationPlayState = 'running';
    }
  }
}
