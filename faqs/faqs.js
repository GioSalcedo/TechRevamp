// click event for every question

const faqs = document.querySelectorAll(".faq");

faqs.forEach(faq => {
  faq.addEventListener("click", () =>{
    faq.classList.toggle("show")
  })
});
