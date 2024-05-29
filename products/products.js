const productos = [
    {
        id: 1,
        nombre: "Laptop Dell Inspiron",
        precio: 1000,
        descripcion: "Laptop Dell Inspiron con 16GB RAM y 512GB SSD"
    },
    {
        id: 2,
        nombre: "Smartphone Samsung Galaxy S21",
        precio: 800,
        descripcion: "Smartphone Samsung Galaxy S21 con 128GB de almacenamiento"
    },
    {
        id: 3,
        nombre: "Tablet Apple iPad Pro",
        precio: 1200,
        descripcion: "Apple iPad Pro de 12.9 pulgadas, 256GB"
    },
    {
        id: 4,
        nombre: "Monitor LG UltraWide",
        precio: 300,
        descripcion: "Monitor LG UltraWide de 34 pulgadas, 2560x1080"
    },
    {
        id: 5,
        nombre: "Auriculares Sony WH-1000XM4",
        precio: 350,
        descripcion: "Auriculares inalámbricos con cancelación de ruido"
    },
    {
        id: 6,
        nombre: "Reloj Inteligente Apple Watch Series 6",
        precio: 500,
        descripcion: "Apple Watch Series 6 con GPS, 44mm"
    },
    {
        id: 7,
        nombre: "Cámara Canon EOS R",
        precio: 1800,
        descripcion: "Cámara sin espejo de fotograma completo, 30.3MP"
    },
    {
        id: 8,
        nombre: "Impresora HP LaserJet Pro",
        precio: 250,
        descripcion: "Impresora láser monocromática inalámbrica"
    },
    {
        id: 9,
        nombre: "Router Asus RT-AC86U",
        precio: 200,
        descripcion: "Router Wi-Fi de doble banda con tecnología MU-MIMO"
    },
    {
        id: 10,
        nombre: "Teclado Mecánico Corsair K95",
        precio: 200,
        descripcion: "Teclado mecánico RGB con interruptores Cherry MX Speed"
    }
];

const publicaciones = [
    {
        id: 1,
        titulo: "Laptop Dell Inspiron - 2 meses de uso",
        autor: "Juan Pérez",
        fecha: "2024-05-01",
        contenido: "Laptop Dell Inspiron con 2 meses de uso, en perfecto estado."
    },
    {
        id: 2,
        titulo: "Smartphone Samsung Galaxy S21 - 6 meses de uso",
        autor: "María Gómez",
        fecha: "2024-05-02",
        contenido: "Samsung Galaxy S21 con 6 meses de uso, sin rasguños."
    },
    {
        id: 3,
        titulo: "Tablet Apple iPad Pro - 1 año de uso",
        autor: "Carlos López",
        fecha: "2024-05-03",
        contenido: "iPad Pro con 1 año de uso, incluye Apple Pencil."
    },
    {
        id: 4,
        titulo: "Monitor LG UltraWide - 8 meses de uso",
        autor: "Ana Martínez",
        fecha: "2024-05-04",
        contenido: "Monitor UltraWide con 8 meses de uso, excelente para multitarea."
    },
    {
        id: 5,
        titulo: "Auriculares Sony WH-1000XM4 - 2 meses de uso",
        autor: "Luis Fernández",
        fecha: "2024-05-05",
        contenido: "Auriculares Sony con 2 meses de uso, calidad de sonido excepcional."
    },
    {
        id: 6,
        titulo: "Reloj Inteligente Apple Watch Series 6 - 1.5 años de uso",
        autor: "Laura Sánchez",
        fecha: "2024-05-06",
        contenido: "Apple Watch con 1.5 años de uso, en muy buen estado."
    },
    {
        id: 7,
        titulo: "Cámara Canon EOS R - 2 años de uso",
        autor: "Jorge Díaz",
        fecha: "2024-05-07",
        contenido: "Cámara Canon con 2 años de uso, incluye lente EF 24-105mm."
    },
    {
        id: 8,
        titulo: "Impresora HP LaserJet Pro - 3 meses de uso",
        autor: "Elena Ramírez",
        fecha: "2024-05-08",
        contenido: "Impresora HP con 3 meses de uso, ideal para oficina en casa."
    },
    {
        id: 9,
        titulo: "Router Asus RT-AC86U - 1 año de uso",
        autor: "Pablo Moreno",
        fecha: "2024-05-09",
        contenido: "Router Asus con 1 año de uso, excelente cobertura y velocidad."
    },
    {
        id: 10,
        titulo: "Teclado Mecánico Corsair K95 - 3 años de uso",
        autor: "Sofía Torres",
        fecha: "2024-05-10",
        contenido: "Teclado Corsair con 3 años de uso, teclas mecánicas en perfecto estado."
    }
];

function listarProductos() {
    return JSON.stringify(productos, null, 2);
}

function listarPublicaciones() {
    return JSON.stringify(publicaciones, null, 2);
}

function agregarProducto(nombre, precio, descripcion) {
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: nombre,
        precio: precio,
        descripcion: descripcion
    };
    productos.push(nuevoProducto);
    console.log("Producto agregado exitosamente:");
    console.log(JSON.stringify(nuevoProducto, null, 2));
}

// Ejemplo de uso
agregarProducto("Disco Duro Externo Seagate", 100, "Disco Duro Externo Seagate de 2TB, USB 3.0");

// console.log("Lista de productos actualizada:");
// console.log(listarProductos());

// console.log("Lista de publicaciones:");
// console.log(listarPublicaciones());