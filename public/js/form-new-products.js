// Start of the form validation
//variables 
const form = document.querySelector('.add-product-form');
const nameInput = document.getElementById('product-name');
const priceInput = document.getElementById('price');
const categorySelect = document.getElementById('category');
const messageTextarea = document.getElementById('description');
const submitButton = form.querySelector('button[type="submit"]');
let imagesAttached = document.getElementById("input-images")
const preview = document.querySelector(".preview");
let curFiles = imagesAttached.files;
let contadorImages = 0;

const btnSubmit = document.getElementById('btn-add-product')

//Tipos de imágenes aceptados
const fileTypes = [
    "image/apng",
    "image/bmp",
    "image/gif",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/webp",
    "image/x-icon",
];

// imagesAttached.style.opacity = 0;

document.addEventListener('DOMContentLoaded', function () {
    //variables 
    const form = document.querySelector('.add-product-form');
    const nameInput = document.getElementById('product-name');
    const priceInput = document.getElementById('price');
    const categorySelect = document.getElementById('category');
    const messageTextarea = document.getElementById('description');
    const submitButton = form.querySelector('button[type="submit"]');

    const btnSubmit = document.getElementById('btn-add-product')
    const errorParagraph = document.createElement('p');
    const errorColor = 'var(--Colors-semantic-error, #e93828)';

    errorParagraph.style.color = 'var(--Colors-semantic-error, #e93828)';
    submitButton.insertAdjacentElement('afterend', errorParagraph);

    function clearErrorStyles() {
        nameInput.style.borderColor = '';
        priceInput.style.borderColor = '';
        categorySelect.style.borderColor = '';
        messageTextarea.style.borderColor = '';
        errorParagraph.innerHTML = '';
    }

    //start of the validation process
    function validateName() {
        if (nameInput.value.trim() === '' || nameInput.value.length < 4 || isNaN(nameInput.value) == false) {
            nameInput.style.borderColor = errorColor;
            return 'Por favor, ingrese un nombre de producto válido.';
        }
        return '';
    }

    function validatePrice() {
        const priceValue = priceInput.value.trim();
        if (priceInput.value.trim() === '' || priceValue.length < 0) {
            priceInput.style.borderColor = errorColor;
            return 'Por favor, ingrese un precio válido.';
        } else{
            return '';
        }
    }

    function validateCategory() {
        if (categorySelect.value === '') {
            categorySelect.style.borderColor = errorColor;
            return 'Por favor, seleccione una categoría.';
        }
        return '';
    }

    function validateMessage() {
        if (messageTextarea.value.trim().length < 30) {
            messageTextarea.style.borderColor = errorColor;
            return 'Por favor, ingrese un mensaje de al menos 30 caracteres.';
        }
        return '';
    }

    function validateImages() {
        curFiles = imagesAttached.files;
        if (curFiles.length === 0) {
            imagesAttached.style.borderColor = errorColor;
            return 'Por favor añada imágenes de su producto.';
        }
        return '';
    }

    function showError(message) {
        errorParagraph.innerHTML = message;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        clearErrorStyles();

        errorMessage = validateName();
        if (errorMessage) {
            showError(errorMessage);
            return;
        }

        errorMessage = validatePrice();
        if (errorMessage) {
            showError(errorMessage);
            return;
        }

        errorMessage = validateCategory();
        if (errorMessage) {
            showError(errorMessage);
            return;
        }

        errorMessage = validateMessage();
        if (errorMessage) {
            showError(errorMessage);
            return;
        }

        errorMessage = validateImages();
        if (errorMessage) {
            showError(errorMessage);
            return;
        }

        errorParagraph.innerHTML = '';
        agregarProducto();
        // form.submit(); --> Envía el form y recarga la página     
    });

    imagesAttached.addEventListener("change", updateImageDisplay);

    submitButton.addEventListener('click', function(event) {
        
    });
});

// End of the form add product validation

const productos = [
    {
        id: 1,
        nombre: "Laptop Dell Inspiron",
        precio: 1000,
        descripcion: "Laptop Dell Inspiron con 16GB RAM y 512GB SSD",
        categoria: "Laptops",
        imagen: "https://exitocol.vteximg.com.br/arquivos/ids/22241706/Celular-XIAOMI-Redmi-Note-13-PRO-256-GB-8-GB-RAM-LILA-3497841_a.jpg"
    },
    {
        id: 2,
        nombre: "Smartphone Samsung Galaxy S21",
        precio: 800,
        descripcion: "Smartphone Samsung Galaxy S21 con 128GB de almacenamiento",
        categoria: "Smartphones",
        imagen: "https://exitocol.vteximg.com.br/arquivos/ids/22241706/Celular-XIAOMI-Redmi-Note-13-PRO-256-GB-8-GB-RAM-LILA-3497841_a.jpg"
    },
    {
        id: 3,
        nombre: "Tablet Apple iPad Pro",
        precio: 1200,
        descripcion: "Apple iPad Pro de 12.9 pulgadas, 256GB",
        categoria: "Tablets",
        imagen: "https://exitocol.vteximg.com.br/arquivos/ids/22241706/Celular-XIAOMI-Redmi-Note-13-PRO-256-GB-8-GB-RAM-LILA-3497841_a.jpg"
    },
    {
        id: 4,
        nombre: "Monitor LG UltraWide",
        precio: 300,
        descripcion: "Monitor LG UltraWide de 34 pulgadas, 2560x1080",
        categoria: "Monitores",
        imagen: "https://exitocol.vteximg.com.br/arquivos/ids/22241706/Celular-XIAOMI-Redmi-Note-13-PRO-256-GB-8-GB-RAM-LILA-3497841_a.jpg"
    },
    {
        id: 5,
        nombre: "Auriculares Sony WH-1000XM4",
        precio: 350,
        descripcion: "Auriculares inalámbricos con cancelación de ruido",
        categoria: "Auriculares",
        imagen: "https://exitocol.vteximg.com.br/arquivos/ids/22241706/Celular-XIAOMI-Redmi-Note-13-PRO-256-GB-8-GB-RAM-LILA-3497841_a.jpg"
    },
    {
        id: 6,
        nombre: "Reloj Inteligente Apple Watch Series 6",
        precio: 500,
        descripcion: "Apple Watch Series 6 con GPS, 44mm",
        categoria: "Relojes Inteligentes",
        imagen: "https://exitocol.vteximg.com.br/arquivos/ids/22241706/Celular-XIAOMI-Redmi-Note-13-PRO-256-GB-8-GB-RAM-LILA-3497841_a.jpg"
    },
    {
        id: 7,
        nombre: "Cámara Canon EOS R",
        precio: 1800,
        descripcion: "Cámara sin espejo de fotograma completo, 30.3MP",
        categoria: "Cámaras",
        imagen: "https://exitocol.vteximg.com.br/arquivos/ids/22241706/Celular-XIAOMI-Redmi-Note-13-PRO-256-GB-8-GB-RAM-LILA-3497841_a.jpg"
    },
    {
        id: 8,
        nombre: "Impresora HP LaserJet Pro",
        precio: 250,
        descripcion: "Impresora láser monocromática inalámbrica",
        categoria: "Impresoras",
        imagen: "https://exitocol.vteximg.com.br/arquivos/ids/22241706/Celular-XIAOMI-Redmi-Note-13-PRO-256-GB-8-GB-RAM-LILA-3497841_a.jpg"
    },
    {
        id: 9,
        nombre: "Router Asus RT-AC86U",
        precio: 200,
        descripcion: "Router Wi-Fi de doble banda con tecnología MU-MIMO",
        categoria: "Routers",
        imagen: "https://exitocol.vteximg.com.br/arquivos/ids/22241706/Celular-XIAOMI-Redmi-Note-13-PRO-256-GB-8-GB-RAM-LILA-3497841_a.jpg"
    },
    {
        id: 10,
        nombre: "Teclado Mecánico Corsair K95",
        precio: 200,
        descripcion: "Teclado mecánico RGB con interruptores Cherry MX Speed",
        categoria: "Teclados",
        imagen: "https://exitocol.vteximg.com.br/arquivos/ids/22241706/Celular-XIAOMI-Redmi-Note-13-PRO-256-GB-8-GB-RAM-LILA-3497841_a.jpg"
    }
];

//Añadir productos al JSON 

function agregarProducto() {
    const nameValue = nameInput.value.trim()
    const priceValue = priceInput.value.trim();
    const categoryValue = categorySelect.value.trim();
    const descriptionValue = messageTextarea.value.trim();

    const nuevoProducto = {
        id: productos.length + 1,
        nombre: nameValue,
        precio: priceValue,
        descripcion: descriptionValue,
        categoria: categoryValue,
        imagen: imagesAttached.files[0].name
    };

    productos.push(nuevoProducto);

    console.log("Producto agregado exitosamente:");
    console.log(JSON.stringify(nuevoProducto, null, 2));

    localStorage.setItem('productos', JSON.stringify(productos));
    console.log(`Listado de productos completo: \n${JSON.stringify(productos, null, 2)}`);

    form.reset();
}

function updateImageDisplay(){
    contadorImages = contadorImages + imagesAttached.files.length
    curFiles = imagesAttached.files;

    if (contadorImages > 0) {
        const list = document.createElement("ol");
        preview.appendChild(list)
        preview.classList.add('active');
    
        for (const file of curFiles) {
            const listItem = document.createElement("li");
            const para = document.createElement("p");
            if (validFileType(file)) {
                para.textContent = `Nombre de archivo: ${file.name}, peso: ${returnFileSize(file.size,)}.`;
                const image = document.createElement("img");
                image.src = URL.createObjectURL(file);
                image.alt = image.title = file.name;
                image.className = "img-attached"
        
                listItem.appendChild(image);
                listItem.appendChild(para);
            } else {
                para.textContent = `El archivo ${file.name}: no tiene una extensión válida. Seleccione otra imagen.`;
                listItem.appendChild(para);
            }
        
            list.appendChild(listItem);
        }
    }
}

function validFileType(file) {
    return fileTypes.includes(file.type);
}

function returnFileSize(number) {
    if (number < 1024) {
        return `${number} bytes`;
    } else if (number >= 1024 && number < 1048576) {
        return `${(number / 1024).toFixed(1)} KB`;
    } else if (number >= 1048576) {
        return `${(number / 1048576).toFixed(1)} MB`;
    }
}