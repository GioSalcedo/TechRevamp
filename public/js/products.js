//Banner Productos
const videos = [
    'https://res.cloudinary.com/dk16s84va/video/upload/v1720927649/bannerProductos.mp4',
];

// Seleccionar todos los botones con la clase btn-add-product-cart
const addButtons = document.querySelectorAll('.btn-add-product-cart');

addButtons.forEach(button => {
    button.addEventListener('click', async function(event) {
      // Evitar que se recargue la página al hacer clic en el botón
        event.preventDefault();

        // // Obtener el productId del botón
        // const productId = ????;

        // try {
        // // Realizar una solicitud POST para agregar el producto al carrito
        //     const response = await fetch(`${BASE_URL}/shopping-carts/add`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ productId: productId }),
        //         });

        // const data = await response.json();
        
        // // Manejar la respuesta (por ejemplo, actualizar la vista del carrito si es necesario)
        // console.log('Producto añadido al carrito:', data);

        // Cambiar el estilo del botón al añadirlo al carrito
        button.classList.add('added');

        // Mostrar mensaje emergente (popup) de éxito
        alert(`Producto añadido exitosamente: ${data.message}`); // Aquí puedes personalizar el mensaje

        // } catch (error) {
            console.error('Error al añadir producto al carrito:', error);
            // Manejar errores, mostrar mensaje al usuario, etc.
            alert('Error al añadir el producto al carrito. Inténtalo de nuevo más tarde.');
        // }
    });
});