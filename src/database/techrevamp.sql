-- Creación de base de datos
CREATE DATABASE techrevamp;

-- Table Products
CREATE TABLE
  Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255) NOT NULL
  );

-- Table Users
CREATE TABLE
  Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  );

-- Table Orders
CREATE TABLE
  Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    order_code VARCHAR(255) UNIQUE NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
  );

-- Table Order_Products (many-to-many relationship between Orders and Products)
CREATE TABLE
  Order_Products (
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES Orders (order_id),
    FOREIGN KEY (product_id) REFERENCES Products (product_id)
  );

-- Table Shopping_Carts
CREATE TABLE
  Shopping_Carts (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
  );

-- Table Shopping_Cart_Products (many-to-many relationship between Shopping Carts and Products)
CREATE TABLE
  Shopping_Cart_Products (
    cart_id INT,
    product_id INT,
    quantity INT NOT NULL,
    PRIMARY KEY (cart_id, product_id),
    FOREIGN KEY (cart_id) REFERENCES Shopping_Carts (cart_id),
    FOREIGN KEY (product_id) REFERENCES Products (product_id)
  );

-- Table Payments
CREATE TABLE
  Payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(255) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders (order_id)
  );

-- Table Shipping_Addresses
CREATE TABLE
  Shipping_Addresses (
    address_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
  );

-- Table Reviews
CREATE TABLE
  Reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    user_id INT,
    rating INT CHECK (
      rating >= 1
      AND rating <= 5
    ),
    comment TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products (product_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
  );

-- Insertando datos en la tabla Products
INSERT INTO
  Products (product_id, name, price, description, category)
VALUES
  (
    1,
    'Laptop Dell Inspiron',
    1765000,
    'Potente Laptop Dell Inspiron con 8GB de RAM y 512GB de almacenamiento SSD, ideal para tareas multitarea y almacenamiento rápido. Equipada con una pantalla Full HD de 15.6 pulgadas, procesador Intel Core i3 de octava generación y gráficos integrados, esta laptop es perfecta para profesionales y estudiantes que necesitan rendimiento y portabilidad.',
    'Laptops'
  ),
  (
    2,
    'Smartphone Samsung Galaxy S21',
    1259000,
    'Elegante Smartphone Samsung Galaxy S21 con 128GB de almacenamiento para capturar y guardar tus mejores momentos. Cuenta con una cámara triple de 64MP, una pantalla Dynamic AMOLED 2X de 6.2 pulgadas y un procesador Exynos 2100. Diseñado para ofrecer una experiencia móvil fluida y avanzada, es ideal para usuarios que buscan calidad y rendimiento en un dispositivo compacto.',
    'Smartphones'
  ),
  (
    3,
    'Tablet Apple iPad Pro',
    1086000,
    'Impresionante Apple iPad Pro de 12.9 pulgadas y 256GB de almacenamiento, perfecto para creatividad y productividad en cualquier lugar. Equipado con el chip M1 de Apple, una pantalla Liquid Retina XDR y compatibilidad con el Apple Pencil y el Magic Keyboard, este iPad es ideal para artistas, diseñadores y profesionales que buscan un rendimiento excepcional.',
    'Tablets'
  ),
  (
    4,
    'Monitor LG UltraWide',
    950000,
    'Monitor LG UltraWide de 34 pulgadas con resolución 2560x1080, ideal para una experiencia de visualización amplia y envolvente. Perfecto para multitarea, gaming y edición de video, este monitor ofrece una calidad de imagen superior con colores vibrantes y negros profundos, además de múltiples opciones de conectividad para mayor flexibilidad.',
    'Monitores'
  ),
  (
    5,
    'Auriculares Sony WH-1000XM4',
    1026000,
    'Auriculares inalámbricos Sony WH-1000XM4 con cancelación de ruido, ofreciendo una experiencia de audio inmersiva y sin interrupciones. Con tecnología de sonido de alta resolución, micrófonos integrados para llamadas claras y una batería de larga duración que ofrece hasta 30 horas de reproducción, estos auriculares son ideales para viajes y uso diario.',
    'Auriculares'
  ),
  (
    6,
    'Reloj Inteligente Apple Watch Series 6',
    837000,
    'Apple Watch Series 6 con GPS y pantalla de 44mm, monitoriza tu salud y actividad física con estilo. Equipado con sensores avanzados que miden el oxígeno en sangre, electrocardiogramas y seguimiento del sueño, este reloj inteligente te ayuda a mantenerte en forma y saludable. Además, ofrece una amplia gama de aplicaciones y notificaciones directamente en tu muñeca.',
    'Relojes Inteligentes'
  ),
  (
    7,
    'Cámara Canon EOS R',
    3586000,
    'Cámara Canon EOS R sin espejo de fotograma completo y 30.3MP, perfecta para fotógrafos profesionales y entusiastas. Con un sistema de enfoque automático Dual Pixel, capacidad de grabación 4K y una amplia gama de lentes intercambiables, esta cámara ofrece flexibilidad y calidad de imagen superior para capturar momentos únicos con precisión y detalle.',
    'Cámaras'
  ),
  (
    8,
    'Impresora HP LaserJet Pro',
    450000,
    'Impresora HP LaserJet Pro, una solución eficiente y rápida para todas tus necesidades de impresión en blanco y negro. Con capacidad de impresión inalámbrica y una velocidad de impresión de hasta 30 páginas por minuto, esta impresora es ideal para oficinas pequeñas y medianas que buscan rendimiento y calidad en cada documento.',
    'Impresoras'
  ),
  (
    9,
    'Router Asus RT-AC86U',
    835000,
    'Router Asus RT-AC86U de doble banda con tecnología MU-MIMO, proporcionando una conexión Wi-Fi rápida y estable. Ideal para juegos en línea y streaming 4K, este router ofrece una cobertura amplia y una velocidad de hasta 2900 Mbps, además de opciones avanzadas de seguridad y configuración para una red doméstica optimizada.',
    'Routers'
  ),
  (
    10,
    'Teclado Mecánico Corsair K95',
    365000,
    'Teclado mecánico Corsair K95 con retroiluminación RGB e interruptores Cherry MX Speed, diseñado para los gamers más exigentes. Con teclas programables, memoria integrada para perfiles y un reposamuñecas desmontable, este teclado ofrece una experiencia de juego personalizada y cómoda, perfecta para largas sesiones de juego.',
    'Keyboards'
  );

-- Insertando datos adaptados en la tabla Users
INSERT INTO Users (user_id, first_name, last_name, email, password)
VALUES
(1, 'Gabriela', 'Rojas', 'gabriela@example.com', 'password123'),
(2, 'Nicole', 'Rojas', 'nicole@example.com', 'securepass'),
(3, 'Arturo', 'Navas', 'arturo@example.com', 'contraseña123'),
(4, 'Giovanny', 'Salcedo', 'giovanny@example.com', 'password456'),
(5, 'usuarios', 'test', 'test@example.com', 'segur0');


-- Insertando datos en la tabla Orders
INSERT INTO Orders (order_id, user_id, order_code)
VALUES
(1, 1, 'ORD12345'),
(2, 2, 'ORD67890'),
(3, 3, 'ORD54321'),
(4, 4, 'ORD98765'),
(5, 5, 'ORD24680');

-- Insertando datos en la tabla Order_Products
INSERT INTO Order_Products (order_id, product_id, quantity)
VALUES
(1, 1, 2),
(1, 3, 1),
(2, 2, 1),
(3, 5, 3),
(4, 7, 1);

-- Insertando datos en la tabla Shopping_Carts
INSERT INTO Shopping_Carts (cart_id, user_id)
VALUES
(1, 1),
(2, 3),
(3, 5),
(4, 2),
(5, 4);

-- Insertando datos en la tabla Shopping_Cart_Products
INSERT INTO Shopping_Cart_Products (cart_id, product_id, quantity)
VALUES
(1, 4, 1),
(1, 6, 2),
(2, 8, 1),
(3, 10, 1),
(4, 9, 1);

-- Insertando datos en la tabla Reviews
INSERT INTO Reviews (review_id, product_id, user_id, rating, comment)
VALUES
(1, 1, 1, 4, 'Excelente laptop para trabajo y estudios.'),
(2, 2, 2, 5, 'Me encanta este smartphone, muy rápido y buenas cámaras.'),
(3, 5, 3, 5, 'Los mejores auriculares que he tenido, cancelación de ruido espectacular.'),
(4, 7, 4, 5, 'Cámara excepcional, calidad de imagen impresionante.'),
(5, 10, 5, 4, 'Gran teclado para gaming, muy cómodo y las luces son geniales.');
