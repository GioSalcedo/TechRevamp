-- Creación de base de datos
CREATE DATABASE IF NOT EXISTS techrevamp;

-- Usando la base de datos creada
USE techrevamp;
-- Tabla Productos
CREATE TABLE Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255) NOT NULL
);

-- Tabla Usuarios
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_logged_in BOOLEAN DEFAULT FALSE
);

-- Tabla Pedidos
CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    order_code VARCHAR(255) UNIQUE NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Tabla Pedido_Productos (relación muchos a muchos entre Pedido y Producto)
CREATE TABLE Order_Products (
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Tabla Carrito de compras (relación 1 a 1 con Usuarios)
CREATE TABLE Shopping_Carts (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE, 
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Tabla Carrito_Producto (relación muchos a muchos entre Carrito y Producto)
CREATE TABLE Shopping_Cart_Products (
    cart_id INT,
    product_id INT,
    quantity INT NOT NULL,
    PRIMARY KEY (cart_id, product_id),
    FOREIGN KEY (cart_id) REFERENCES Shopping_Carts(cart_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Tabla Pago (relación 1 a 1 con Pedidos)
CREATE TABLE Payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT UNIQUE,  -- Un pedido solo puede tener un pago
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(255) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

-- Tabla Dirección de envío
CREATE TABLE Shipping_Addresses (
    address_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Tabla Reviews
CREATE TABLE Reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    user_id INT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Insertando datos en la tabla Users
INSERT INTO Users (user_id, first_name, last_name, phone, email, password)
VALUES
(1, 'Gabriela', 'Rojas', 3003003030, 'gabriela@example.com', 'password123'),
(2, 'Nicole', 'Rojas', 3003013131, 'nicole@example.com', 'securepass'),
(3, 'Arturo', 'Navas', 3003023232, 'arturo@example.com', 'contraseña123'),
(4, 'Giovanny', 'Salcedo', 3003033333, 'giovanny@example.com', 'password456'),
(5, 'usuarios', 'test', 3003043434, 'test@example.com', 'segur0');

-- Insertando datos en la tabla Products
INSERT INTO Products (product_id, name, description, price, category)
VALUES
(1, 'Laptop Dell Inspiron', 'Potente Laptop Dell Inspiron con 8GB de RAM y 512GB de almacenamiento SSD, ideal para tareas multitarea y almacenamiento rápido. Equipada con una pantalla Full HD de 15.6 pulgadas, procesador Intel Core i3 de octava generación y gráficos integrados, esta laptop es perfecta para profesionales y estudiantes que necesitan rendimiento y portabilidad.', 1765000, 'Laptops'),
(2, 'Smartphone Samsung Galaxy S21', 'Elegante Smartphone Samsung Galaxy S21 con 128GB de almacenamiento para capturar y guardar tus mejores momentos. Cuenta con una cámara triple de 64MP, una pantalla Dynamic AMOLED 2X de 6.2 pulgadas y un procesador Exynos 2100. Diseñado para ofrecer una experiencia móvil fluida y avanzada, es ideal para usuarios que buscan calidad y rendimiento en un dispositivo compacto.', 1259000, 'Smartphones'),
(3, 'Tablet Apple iPad Pro', 'Impresionante Apple iPad Pro de 12.9 pulgadas y 256GB de almacenamiento, perfecto para creatividad y productividad en cualquier lugar. Equipado con el chip M1 de Apple, una pantalla Liquid Retina XDR y compatibilidad con el Apple Pencil y el Magic Keyboard, este iPad es ideal para artistas, diseñadores y profesionales que buscan un rendimiento excepcional.', 1086000, 'Tablets'),
(4, 'Monitor LG UltraWide', 'Monitor LG UltraWide de 34 pulgadas con resolución 2560x1080, ideal para una experiencia de visualización amplia y envolvente. Perfecto para multitarea, gaming y edición de video, este monitor ofrece una calidad de imagen superior con colores vibrantes y negros profundos, además de múltiples opciones de conectividad para mayor flexibilidad.', 950000, 'Monitores'),
(5, 'Auriculares Sony WH-1000XM4', 'Auriculares inalámbricos Sony WH-1000XM4 con cancelación de ruido, ofreciendo una experiencia de audio inmersiva y sin interrupciones. Con tecnología de sonido de alta resolución, micrófonos integrados para llamadas claras y una batería de larga duración que ofrece hasta 30 horas de reproducción, estos auriculares son ideales para viajes y uso diario.', 1026000, 'Auriculares'),
(6, 'Reloj Inteligente Apple Watch Series 6', 'Apple Watch Series 6 con GPS y pantalla de 44mm, monitoriza tu salud y actividad física con estilo. Equipado con sensores avanzados que miden el oxígeno en sangre, electrocardiogramas y seguimiento del sueño, este reloj inteligente te ayuda a mantenerte en forma y saludable. Además, ofrece una amplia gama de aplicaciones y notificaciones directamente en tu muñeca.', 837000, 'Relojes Inteligentes'),
(7, 'Cámara Canon EOS R', 'Cámara Canon EOS R sin espejo de fotograma completo y 30.3MP, perfecta para fotógrafos profesionales y entusiastas. Con un sistema de enfoque automático Dual Pixel, capacidad de grabación 4K y una amplia gama de lentes intercambiables, esta cámara ofrece flexibilidad y calidad de imagen superior para capturar momentos únicos con precisión y detalle.', 3586000, 'Cámaras'),
(8, 'Impresora HP LaserJet Pro', 'Impresora HP LaserJet Pro, una solución eficiente y rápida para todas tus necesidades de impresión en blanco y negro. Con capacidad de impresión inalámbrica y una velocidad de impresión de hasta 30 páginas por minuto, esta impresora es ideal para oficinas pequeñas y medianas que buscan rendimiento y calidad en cada documento.', 450000, 'Impresoras'),
(9, 'Router Asus RT-AC86U', 'Router Asus RT-AC86U de doble banda con tecnología MU-MIMO, proporcionando una conexión Wi-Fi rápida y estable. Ideal para juegos en línea y streaming 4K, este router ofrece una cobertura amplia y una velocidad de hasta 2900 Mbps, además de opciones avanzadas de seguridad y configuración para una red doméstica optimizada.', 835000, 'Routers'),
(10, 'Teclado Mecánico Corsair K95', 'Teclado mecánico Corsair K95 con retroiluminación RGB y interruptores Cherry MX Speed, diseñado para los gamers más exigentes. Con teclas programables, memoria integrada para perfiles y un reposamuñecas desmontable, este teclado ofrece una experiencia de juego personalizada y cómoda, perfecta para largas sesiones de juego.', 365000, 'Teclados');

-- Insertando datos en la tabla Orders
INSERT INTO Orders (order_id, user_id, order_code, order_date)
VALUES
(1, 1, 'ORD001', '2024-01-01 10:00:00'),
(2, 2, 'ORD002', '2024-01-02 11:00:00'),
(3, 3, 'ORD003', '2024-01-03 12:00:00'),
(4, 4, 'ORD004', '2024-01-04 13:00:00'),
(5, 5, 'ORD005', '2024-01-05 14:00:00');

-- Insertando datos en la tabla Order_Products
INSERT INTO Order_Products (order_id, product_id, quantity)
VALUES
(1, 1, 2),
(1, 2, 1),
(2, 3, 1),
(2, 4, 1),
(3, 5, 3),
(4, 6, 1),
(5, 7, 1),
(5, 8, 2),
(5, 9, 1),
(5, 10, 2);

-- Insertando datos en la tabla Shopping_Carts
INSERT INTO Shopping_Carts (cart_id, user_id, creation_date)
VALUES
(1, 1, '2024-01-01 10:00:00'),
(2, 2, '2024-01-02 11:00:00'),
(3, 3, '2024-01-03 12:00:00'),
(4, 4, '2024-01-04 13:00:00'),
(5, 5, '2024-01-05 14:00:00');

-- Insertando datos en la tabla Shopping_Cart_Products
INSERT INTO Shopping_Cart_Products (cart_id, product_id, quantity)
VALUES
(1, 1, 1),
(1, 2, 1),
(2, 3, 2),
(2, 4, 1),
(3, 5, 1),
(4, 6, 1),
(5, 7, 1);

-- Insertando datos en la tabla Payments
INSERT INTO Payments (payment_id, order_id, amount, payment_method, payment_date)
VALUES
(1, 1, 3530000, 'Tarjeta de Crédito', '2024-01-01 10:30:00'),
(2, 2, 2171000, 'PayPal', '2024-01-02 11:30:00'),
(3, 3, 3078000, 'Tarjeta de Débito', '2024-01-03 12:30:00'),
(4, 4, 837000, 'Transferencia Bancaria', '2024-01-04 13:30:00'),
(5, 5, 5186000, 'Efectivo', '2024-01-05 14:30:00');

-- Insertando datos en la tabla Shipping_Addresses
INSERT INTO Shipping_Addresses (address_id, user_id, street, city, state, postal_code, country)
VALUES
(1, 1, 'Calle 123', 'Bogotá', 'Cundinamarca', '111111', 'Colombia'),
(2, 2, 'Avenida 45', 'Medellín', 'Antioquia', '222222', 'Colombia'),
(3, 3, 'Carrera 67', 'Cali', 'Valle del Cauca', '333333', 'Colombia'),
(4, 4, 'Transversal 89', 'Barranquilla', 'Atlántico', '444444', 'Colombia'),
(5, 5, 'Diagonal 101', 'Cartagena', 'Bolívar', '555555', 'Colombia');

-- Insertando datos en la tabla Reviews
INSERT INTO Reviews (review_id, product_id, user_id, rating, comment, review_date)
VALUES
(1, 1, 1, 5, 'Excelente laptop, muy rápida y eficiente.', '2024-02-01 15:00:00'),
(2, 2, 2, 4, 'Buen smartphone, aunque la batería podría durar más.', '2024-02-02 16:00:00'),
(3, 3, 3, 5, 'El iPad Pro es perfecto para mis necesidades de trabajo.', '2024-02-03 17:00:00'),
(4, 4, 4, 4, 'El monitor tiene una gran resolución, muy contento con la compra.', '2024-02-04 18:00:00'),
(5, 5, 5, 5, 'Auriculares con excelente cancelación de ruido.', '2024-02-05 19:00:00');
