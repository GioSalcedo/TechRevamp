document.addEventListener('DOMContentLoaded', () => {
  // Encuentra todos los contenedores de productos
  const productContainers = document.querySelectorAll('.shopping-product');
  const subtotalElement = document.getElementById('subtotal');
  const totalElement = document.getElementById('total');
  const shippingCost = 25000;
  const colorSelects  = document.querySelectorAll('.color');
  const colorCircles  = document.querySelectorAll('.color-circle');
  const deleteButtons = document.querySelectorAll('.delete-product');
  const btnCarrito = document.getElementById('carroComprasLink');

  // Función para formatear números como moneda
  function formatCurrency(amount) {
    return `$ ${amount.toLocaleString('es-ES')},00`;
  }

  function updateCartTotals() {
    let subtotal = 0;
    document.querySelectorAll('.shopping-product').forEach(product => {
      const quantity = parseInt(product.querySelector('.quantity').textContent);
      const price = parseFloat(product.querySelector('.discount-price').textContent.replace(/\$|\./g, "").trim()) / quantity;
      subtotal += price * quantity;
    });
    const total = subtotal + shippingCost;
    subtotalElement.textContent = formatCurrency(subtotal);
    totalElement.textContent = formatCurrency(total);
  }

  productContainers.forEach(container => {
    const minusButton = container.querySelector('.minus');
    const plusButton = container.querySelector('.plus');
    const quantityDisplay = container.querySelector('.quantity');
    const originalPriceDisplay = container.querySelector('.original-price');
    const discountPriceDisplay = container.querySelector('.discount-price');

    let originalPrice = parseFloat(originalPriceDisplay.textContent.replace(/\$|\./g, "").trim());
    originalPrice = originalPrice / parseFloat(quantityDisplay.textContent.replace(/\$|\./g, "").trim())
    let discountPrice = parseFloat(discountPriceDisplay.textContent.replace(/\$|\./g, "").trim());
    discountPrice = discountPrice / parseFloat(quantityDisplay.textContent.replace(/\$|\./g, "").trim())

    function updatePrices() {
      const quantity = parseInt(quantityDisplay.textContent);
      originalPriceDisplay.textContent = formatCurrency(originalPrice * quantity);
      discountPriceDisplay.textContent = formatCurrency(discountPrice * quantity);
      updateCartTotals();
    }

    minusButton.addEventListener('click', function () {
      let quantity = parseInt(quantityDisplay.textContent);
      if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity.toString();
        updatePrices();
      }
      minusButton.disabled = quantity <= 1;
    });

    plusButton.addEventListener('click', function () {
      let quantity = parseInt(quantityDisplay.textContent);
      quantity++;
      quantityDisplay.textContent = quantity.toString();
      updatePrices();
      minusButton.disabled = false;
    });

    // Inicializar el estado del botón minus
    const initialQuantity = parseInt(quantityDisplay.textContent);
    minusButton.disabled = initialQuantity <= 1;
  });

  // Función para actualizar el color del círculo seleccionado
  function updateColorCircle(selectedColor, circle) {
    let circleColor;
    switch (selectedColor) {
      case 'gris':
        circleColor = 'grey';
        break;
      case 'negro':
        circleColor = 'black';
        break;
      case 'blanco':
        circleColor = 'white';
        break;
      default:
        circleColor = 'transparent';
        break;
    }
    circle.style.backgroundColor = circleColor;
  }

  // Event listener para cada select de color
  colorSelects.forEach((select, index) => {
    select.addEventListener('change', function () {
      const selectedColor = select.value;
      updateColorCircle(selectedColor, colorCircles[index]);
    });
  });

  // Funcionalidad eliminar del carrito 
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Encontrar el contenedor padre de la tarjeta de producto y eliminarlo
      const productCard = button.closest('.shopping-product');
      if (productCard) {
        productCard.remove(); // Eliminar el elemento del DOM
        updateCartTotals(); // Actualizar los totales del carrito si es necesario
      }
    });
  });

  //Funcionalidad carrito page
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (userData && userData.userId) {
    const link = document.getElementById('carroComprasLink');
    link.href = `/carro-compras/${userData.userId}`;
  }

});
