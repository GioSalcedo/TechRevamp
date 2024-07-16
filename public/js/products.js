//Banner Productos
const videos = [
    'https://res.cloudinary.com/dk16s84va/video/upload/v1720927649/bannerProductos.mp4',
];

// Seleccionar todos los botones con la clase btn-add-product-cart
const addButtons = document.querySelectorAll('.btn-add-product-cart');
const btnInfoCardHeader = document.querySelector('.botton-info-card-product button');
const btnInfoCardProducts = document.querySelector('.info-card-product .botton-info-card-product .btn-add-product-cart');

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
        button.classList.toggle('added');

        const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><g clip-path="url(#clip0_1230_850)">
            <path d="M11.5504 8.23587L9.97888 6.66339H11.3343L13.4951 2.73219H6.05019L4.47871 1.15971H14.7915C15.0927 1.15971 15.3252 1.28747 15.4889 1.543C15.6526 1.79853 15.6558 2.07699 15.4987 2.37838L12.7093 7.41032C12.5653 7.6724 12.3787 7.87551 12.1495 8.01966C11.9203 8.1638 11.7206 8.23587 11.5504 8.23587ZM4.61622 15.312C4.18406 15.312 3.81411 15.1581 3.50636 14.8501C3.19861 14.5422 3.04474 14.172 3.04474 13.7396C3.04474 13.3071 3.19861 12.9369 3.50636 12.629C3.81411 12.321 4.18406 12.1671 4.61622 12.1671C5.04837 12.1671 5.41832 12.321 5.72607 12.629C6.03382 12.9369 6.18769 13.3071 6.18769 13.7396C6.18769 14.172 6.03382 14.5422 5.72607 14.8501C5.41832 15.1581 5.04837 15.312 4.61622 15.312ZM14.6737 15.7838L10.2342 11.3808H5.08766C4.51145 11.3808 4.07275 11.1351 3.77155 10.6437C3.47035 10.1523 3.4507 9.638 3.71262 9.10074L4.53764 7.41032L3.12331 4.22604L0.216078 1.31695C0.0720261 1.17281 0 0.989353 0 0.766585C0 0.543817 0.0720261 0.36036 0.216078 0.216216C0.36013 0.0720721 0.543469 0 0.766095 0C0.988721 0 1.17206 0.0720721 1.31611 0.216216L15.7737 14.683C15.9178 14.8272 15.9931 15.0074 15.9996 15.2236C16.0062 15.4398 15.9309 15.6265 15.7737 15.7838C15.6297 15.9279 15.4463 16 15.2237 16C15.0011 16 14.8177 15.9279 14.6737 15.7838ZM8.66277 9.80835L7.09129 8.23587H5.8734L5.08766 9.80835H8.66277ZM12.4736 15.312C12.0414 15.312 11.6715 15.1581 11.3637 14.8501C11.056 14.5422 10.9021 14.172 10.9021 13.7396C10.9021 13.3071 11.056 12.9369 11.3637 12.629C11.6715 12.321 12.0414 12.1671 12.4736 12.1671C12.9058 12.1671 13.2757 12.321 13.5835 12.629C13.8912 12.9369 14.0451 13.3071 14.0451 13.7396C14.0451 14.172 13.8912 14.5422 13.5835 14.8501C13.2757 15.1581 12.9058 15.312 12.4736 15.312Z" fill="#E93828"/></g><defs>
            <clipPath id="clip0_1230_850"><rect width="16" height="16" fill="white"/>
            </clipPath></defs>
        </svg>`

        const defaultAddIcon = `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"><path d="M6.60541 16C5.48609 16 4.58045 16.9 4.58045 18C4.58045 19.1 5.48609 20 6.60541 20C7.72474 20 8.64055 19.1 8.64055 18C8.64055 16.9 7.72474 16 6.60541 16ZM16.7811 16C15.6618 16 14.7561 16.9 14.7561 18C14.7561 19.1 15.6618 20 16.7811 20C17.9004 20 18.8162 19.1 18.8162 18C18.8162 16.9 17.9004 16 16.7811 16ZM18.8162 14C18.8162 13.45 18.3583 13 17.7987 13H6.60541L7.72474 11H15.3056C16.0688 11 16.7404 10.59 17.0864 9.97L20.3833 3.83C20.6377 3.35 20.4647 2.75 19.9763 2.49C19.4777 2.22 18.8569 2.41 18.5924 2.9L15.3056 9H8.16229L4.10219 0.57C3.93938 0.22 3.57306 0 3.18638 0H1.51757C0.957906 0 0.5 0.45 0.5 1C0.5 1.55 0.957906 2 1.51757 2H2.53514L6.19838 9.59L4.82467 12.03C4.08184 13.37 5.05871 15 6.60541 15H17.7987C18.3583 15 18.8162 14.55 18.8162 14ZM10.9708 0.71C11.3676 0.32 12.0087 0.32 12.4056 0.71L15.0411 3.3C15.4379 3.69 15.4379 4.32 15.0411 4.71L12.4056 7.3C12.0087 7.69 11.3676 7.69 10.9708 7.3C10.5739 6.91 10.5739 6.28 10.9708 5.89L11.8662 5H8.64055C8.08089 5 7.62298 4.55 7.62298 4C7.62298 3.45 8.08089 3 8.64055 3H11.8662L10.9708 2.12C10.5739 1.73 10.5739 1.1 10.9708 0.71Z" fill="#FAFEFE"/></svg>`

        

        if(btnInfoCardHeader.classList.contains('added')){
            btnInfoCardHeader.innerHTML = `${deleteIcon} Remover del carrito`;
        }else{
            btnInfoCardHeader.innerHTML = `${defaultAddIcon} Añadir al carrito`;
        }

        if(btnInfoCardProducts.classList.contains('added')){
            btnInfoCardProducts.innerHTML = `${deleteIcon}`;
        }else{
            btnInfoCardProducts.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8.95461 6.09524C9.40234 6.09524 9.76866 5.75238 9.76866 5.33333V3.80952H11.3968C11.8445 3.80952 12.2108 3.46667 12.2108 3.04762C12.2108 2.62857 11.8445 2.28571 11.3968 2.28571H9.76866V0.761905C9.76866 0.342857 9.40234 0 8.95461 0C8.50688 0 8.14055 0.342857 8.14055 0.761905V2.28571H6.51244C6.06471 2.28571 5.69839 2.62857 5.69839 3.04762C5.69839 3.46667 6.06471 3.80952 6.51244 3.80952H8.14055V5.33333C8.14055 5.75238 8.50688 6.09524 8.95461 6.09524ZM4.88433 12.9524C3.98887 12.9524 3.26436 13.6381 3.26436 14.4762C3.26436 15.3143 3.98887 16 4.88433 16C5.77979 16 6.51244 15.3143 6.51244 14.4762C6.51244 13.6381 5.77979 12.9524 4.88433 12.9524ZM13.0249 12.9524C12.1294 12.9524 11.4049 13.6381 11.4049 14.4762C11.4049 15.3143 12.1294 16 13.0249 16C13.9203 16 14.653 15.3143 14.653 14.4762C14.653 13.6381 13.9203 12.9524 13.0249 12.9524ZM5.77979 9.14286H11.8445C12.455 9.14286 12.9923 8.83048 13.2691 8.3581L15.9066 3.68C16.1101 3.31429 15.9718 2.85714 15.581 2.65905C15.1821 2.45333 14.6856 2.5981 14.4739 2.97143L11.8445 7.61905H6.12983L2.66196 0.761905H0.814055C0.366325 0.761905 0 1.10476 0 1.52381C0 1.94286 0.366325 2.28571 0.814055 2.28571H1.62811L4.55871 8.06857L3.45973 9.92762C2.86547 10.9486 3.64697 12.1905 4.88433 12.1905H13.8389C14.2867 12.1905 14.653 11.8476 14.653 11.4286C14.653 11.0095 14.2867 10.6667 13.8389 10.6667H4.88433L5.77979 9.14286Z" fill="#11485A"/></svg>`;
        }


        

        // Mostrar mensaje emergente (popup) de éxito
        alert(`Producto añadido exitosamente: ${data.message}`); // Aquí puedes personalizar el mensaje

        // } catch (error) {
            console.error('Error al añadir producto al carrito:', error);
            // Manejar errores, mostrar mensaje al usuario, etc.
            alert('Error al añadir el producto al carrito. Inténtalo de nuevo más tarde.');
        // }
    });
});