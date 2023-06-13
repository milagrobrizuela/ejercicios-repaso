CREATE TABLE IF NOT EXISTS `Articulos`( 
    `Id` INTEGER PRIMARY KEY AUTOINCREMENT, 
    `Nombre` VARCHAR(50) NOT NULL, 
    `Precio` REAL NOT NULL, 
    `CodigoDeBarra` VARCHAR(50) NOT NULL, 
    `IdArticuloFamilia` INTEGER NOT NULL, 
    `Stock` INTEGER NOT NULL, 
    `FechaAlta` VARCHAR(50) NOT NULL, 
    `Activo` BOOLEAN NOT NULL
);

INSERT INTO Articulos (Nombre, Precio, CodigoDeBarra, IdArticuloFamilia, Stock, FechaAlta, Activo) VALUES
    ('Artículo 1', 10.99, '1234567890', 1, 100, '2023-01-01', 1),
    ('Artículo 2', 15.99, '2345678901', 2, 50, '2023-01-02', 1),
    ('Artículo 3', 20.99, '3456789012', 1, 75, '2023-01-03', 1),
    ('Artículo 4', 8.99, '4567890123', 3, 200, '2023-01-04', 1),
    ('Artículo 5', 12.99, '5678901234', 2, 80, '2023-01-05', 1),
    ('Artículo 6', 9.99, '6789012345', 3, 150, '2023-01-06', 1),
    ('Artículo 7', 14.99, '7890123456', 1, 60, '2023-01-07', 1),
    ('Artículo 8', 18.99, '8901234567', 2, 90, '2023-01-08', 1),
    ('Artículo 9', 11.99, '9012345678', 3, 120, '2023-01-09', 1),
    ('Artículo 10', 16.99, '0123456789', 1, 70, '2023-01-10', 1),
    ('Artículo 11', 22.99, '9876543210', 2, 110, '2023-01-11', 1),
    ('Artículo 12', 7.99, '8765432109', 3, 180, '2023-01-12', 1),
    ('Artículo 13', 13.99, '7654321098', 1, 40, '2023-01-13', 1),
    ('Artículo 14', 19.99, '6543210987', 2, 100, '2023-01-14', 1),
    ('Artículo 15', 10.49, '5432109876', 3, 130, '2023-01-15', 1);

CREATE TABLE IF NOT EXISTS `Vendedores`( 
    `Id` INTEGER PRIMARY KEY AUTOINCREMENT, 
    `Nombre` VARCHAR(50) NOT NULL UNIQUE, 
    `Apellido` VARCHAR(50) NOT NULL UNIQUE,
    `FechaNacimiento` DATEONLY NULL, 
    `Usuario` VARCHAR(50) NOT NULL UNIQUE,
    `Contrasenia` VARCHAR(50) NOT NULL, 
    `IdSucursal` INTEGER NOT NULL
);

INSERT INTO Vendedores (Nombre, Apellido, FechaNacimiento, Usuario, Contrasenia, IdSucursal) VALUES 
    ('Juan', 'Pérez', '1990-01-01', 'juanperez', 'password01', 1),
    ('María', 'González', '1985-05-10', 'mariagonzalez', 'password02', 1),
    ('Pedro', 'López', '1992-03-15', 'pedrolopez', 'password03', 2),
    ('Ana', 'Martínez', '1988-09-20', 'anamartinez', 'password04', 2),
    ('Luis', 'Ramírez', '1991-07-25', 'luisramirez', 'password05', 3),
    ('Laura', 'Sánchez', '1987-04-30', 'laurasanchez', 'password06', 3),
    ('Carlos', 'Hernández', '1993-02-05', 'carloshernandez', 'password07', 1),
    ('Sofía', 'Torres', '1989-10-10', 'sofiatorres', 'password08', 2),
    ('Jorge', 'Vargas', '1994-08-15', 'jorgevargas', 'password09', 3),
    ('Fernanda', 'García', '1990-06-20', 'fernandagarcia', 'password10', 1),
    ('Ricardo', 'Rojas', '1986-03-25', 'ricardorojas', 'password11', 2),
    ('Gabriela', 'Reyes', '1991-01-30', 'gabrielareyes', 'password12', 3),
    ('Mario', 'Cruz', '1987-11-04', 'mariocruz', 'password13', 1),
    ('Paula', 'Luna', '1992-09-09', 'paulaluna', 'password14', 2),
    ('Daniel', 'Gómez', '1988-07-15', 'danielgomez', 'password15', 3);

CREATE TABLE IF NOT EXISTS `Sucursales` (
    `Id` INTEGER PRIMARY KEY UNIQUE,
    `Nombre` VARCHAR(50) NOT NULL,
    `NombreCalle` VARCHAR(50) NOT NULL UNIQUE,
    `NumeroCalle` VARCHAR(50) NOT NULL UNIQUE,
    `Pais` VARCHAR(50) NOT NULL,
    `AbreviaturaSucursal` VARCHAR(50) NOT NULL UNIQUE,
    `Logo` VARCHAR(200) NOT NULL
);

INSERT INTO Sucursales (Id, Nombre, NombreCalle, NumeroCalle, Pais, AbreviaturaSucursal, Logo) VALUES
    (1, 'Sucursal A', 'Calle Principal 1', '123', 'Argentina', 'AR001', 'C:/Users/Usuario/repaso-parcial/ejercicios-mili/api-frontend-em/public/logos/logoargentina.png'),
    (2, 'Sucursal B', 'Avenida Central 1', '456', 'Argentina', 'AR002', 'C:/Users/Usuario/repaso-parcial/ejercicios-mili/api-frontend-em/public/logos/logoargentina.png'),
    (3, 'Sucursal C', 'Calle Comercial 1', '789', 'Argentina', 'AR003', 'C:/Users/Usuario/repaso-parcial/ejercicios-mili/api-frontend-em/public/logos/logoargentina.png'),
    (4, 'Sucursal D', 'Rua Principal 1', '124', 'Brasil', 'BR001', 'C:/Users/Usuario/repaso-parcial/ejercicios-mili/api-frontend-em/public/logos/logobrasil.png'),
    (5, 'Sucursal E', 'Avenida Central 2', '457', 'Brasil', 'BR002', 'C:/Users/Usuario/repaso-parcial/ejercicios-mili/api-frontend-em/public/logos/logobrasil.png'),
    (6, 'Sucursal F', 'Rua Comercial 1', '790', 'Brasil', 'BR003', 'C:/Users/Usuario/repaso-parcial/ejercicios-mili/api-frontend-em/public/logos/logobrasil.png'),
    (7, 'Sucursal G', 'Calle Principal 2', '125', 'Chile', 'CL001', 'C:/Users/Usuario/repaso-parcial/ejercicios-mili/api-frontend-em/public/logos/logochile.png'),
    (8, 'Sucursal H', 'Avenida Central 3', '458', 'Chile', 'CL002', 'C:/Users/Usuario/repaso-parcial/ejercicios-mili/api-frontend-em/public/logos/logochile.png'),
    (9, 'Sucursal I', 'Calle Comercial 2', '791', 'Chile', 'CL003', 'C:/Users/Usuario/repaso-parcial/ejercicios-mili/api-frontend-em/public/logos/logochile.png'),
    (10, 'Sucursal J', 'Calle Principal 3', '126', 'México', 'MX001', 'C:/Users/Usuario/repaso-parcial/ejercicios-mili/api-frontend-em/public/logos/logomexico.png'),
    (11, 'Sucursal K', 'Avenida Central 4', '459', 'México', 'MX002', 'C:/Users/Usuario/repaso-parcial/ejercicios-mili/api-frontend-em/public/logos/logomexico.png'),
    (12, 'Sucursal L', 'Calle Comercial 3', '792', 'México', 'MX003', 'C:/Users/Usuario/repaso-parcial/ejercicios-mili/api-frontend-em/public/logos/logomexico.png'),
    (13, 'Sucursal M', 'Calle Principal 4', '127', 'Colombia', 'CO001', 'C:/Users/Usuario/repaso-parcial/ejercicios-mili/api-frontend-em/public/logos/logocolombia.png'),
    (14, 'Sucursal N', 'Avenida Central 5', '460', 'Colombia', 'CO002', 'C:/Users/Usuario/repaso-parcial/ejercicios-mili/api-frontend-em/public/logos/logocolombia.png'),
    (15, 'Sucursal O', 'Calle Comercial 4', '793', 'Colombia', 'CO003', 'C:/Users/Usuario/repaso-parcial/ejercicios-mili/api-frontend-em/public/logos/logocolombia.png');
