const btnNext = document.querySelector('btn-next');

// btnNext.addEventListener("click",()  => {
//  alert("Hola")
// }) 

function loadProducts() {
  fetch('/products', { method: "GET"})
  .then(res => res.json())
  .then(data =>{
    const products = document.getElementById("container-products");
    let html = " ";
    data.products.forEach(product => {
      html += `
      <%- include('partials/card-product', { producto: producto }); %> 
      `;
    });
    products.innerHTML = html;
  });
}

loadProducts();