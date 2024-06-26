window.addEventListener('scroll', function() {
  const scrollToTopButton = document.getElementById('scrollToTopButton');
  if (window.scrollY > 200) {
    scrollToTopButton.classList.add('show-scroll-to-top');
  } else {
    scrollToTopButton.classList.remove('show-scroll-to-top');
  }
});