const productos = {
    productos: [
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
    ]
};

function listarProductos() {
    return JSON.stringify(productos, null, 2);
}

function agregarProducto(nombre, precio, categoria, descripcion, imagen) {
    const nuevoProducto = {
        id: productos.productos.length + 1,
        nombre: nombre,
        precio: precio,
        categoria: categoria,
        descripcion: descripcion,
        imagen: imagen
    };
    productos.productos.push(nuevoProducto);
    // console.log(`Listado de productos completo: \n${listarProductos()}`);
    // console.log("Producto agregado exitosamente:");
    // console.log(JSON.stringify(nuevoProducto, null, 2));
}

// Ejemplo de uso
agregarProducto("Disco Duro Externo Seagate", 600, "Laptops", "Disco Duro Externo Seagate de 2TB, USB 3.0", "https://exitocol.vteximg.com.br/arquivos/ids/22241706/Celular-XIAOMI-Redmi-Note-13-PRO-256-GB-8-GB-RAM-LILA-3497841_a.jpg");
