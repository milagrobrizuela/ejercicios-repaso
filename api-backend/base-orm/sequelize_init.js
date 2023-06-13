const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite:' + './data/database.sqlite');

const Articulos = sequelize.define(
    'Articulos',

    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        Nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'El nombre del articulo no puede ser nulo.'
                },
                max: {
                    args: 50,
                    msg: 'El nombre del articulo no puede superar los 50 caracteres.'
                }
            }
        },

        Precio: {
            type: DataTypes.REAL,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'El precio del articulo no puede ser nulo.'
                }
            }
        },

        CodigoDeBarra: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'El codigo de barras del articulo no puede ser nulo.'
                }
            }
        },

        IdArticuloFamilia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'El id de la familia del articulo no puede ser nulo.'
                }
            }
        },

        Stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'El stock del articulo no puede ser nulo.'
                }
            }
        },

        FechaAlta: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'La fecha de alta del articulo no puede ser nula.'
                }
            }
        },

        Activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
              notNull: {
                args: true,
                msg: 'El campo activo del articulo no puede ser nulo.',
              }
            }
        }
    },

    {
        timestamps: false
    }
);

const Vendedores = sequelize.define(
    'Vendedores',

    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        Nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                args: true,
                msg: 'El nombre del vendedor ya existe.'
            },
            validate: {
                notNull: {
                    args: false,
                    msg: 'El atributo nombre del vendedor no puede ser nulo.'
                },
                max: {
                    args: 50,
                    msg: 'El nombre del vendedor no puede superar los 50 caracteres.'
                }
            }
        },

        Apellido: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                args: true,
                msg: 'El apellido del vendedor ya existe.'
            },
            validate: {
                notNull: {
                    args: false,
                    msg: 'El atributo apellido del vendedor no puede ser nulo.'
                },
                max: {
                    args: 50,
                    msg: 'El apellido del vendedor no puede superar los 50 caracteres.'
                }
            }
        },

        FechaNacimiento: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: {
                    notNull: {
                        args: false,
                        msg: 'El atributo fecha de nacimiento del vendedor no puede ser nulo.'
                    }
                }
            }
        },

        Usuario: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                args: true,
                msg: 'El usuario del vendedor ya existe.'
            },
            validate: {
                notNull: {
                    args: false,
                    msg: 'El atributo usuario del vendedor no puede ser nulo.'
                },
                max: {
                    args: 50,
                    msg: 'El usuario del vendedor no puede superar los 50 caracteres.'
                }
            }
        },

        Contrasenia: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    args: false,
                    msg: 'El atributo contraseña del vendedor no puede ser nulo.'
                },
                len: {
                    args: [9 ,9],
                    msg: 'La constraseña del vendedor debe tener 9 caracteres.'
                }
            }
        },

        IdSucursal: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: false,
                    msg: 'El atributo id de sucursal del vendedor no puede ser nulo.'
                }
            }
        }
    },

    {
        timestamps: false
    }
);

const Sucursales = sequelize.define(
    'Sucursales',

    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: {
                args: true,
                msg: 'El id de sucursal ya existe.'
            }
        },

        Nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                max: {
                    args: 50,
                    msg: 'El nombre de la sucursal no puede superar los 50 caracteres.'
                }
            }
        },

        NombreCalle: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                args: true,
                msg: 'El nombre de la calle de la sucursal ya existe.'
            },
            validate: {
                max: {
                    args: 50,
                    msg: 'El nombre de la sucursal no puede superar los 50 caracteres.'
                }
            }
        },

        NumeroCalle: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                args: true,
                msg: 'El numero de la calle de la sucursal ya existe.'
            },
            validate: {
                max: {
                    args: 50,
                    msg: 'El numero de la sucursal no puede superar los 50 caracteres.'
                }
            }
        },

        Pais: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                max: {
                    args: 50,
                    msg: 'El pais de la sucursal no puede superar los 50 caracteres.'
                }
            }
        },
        
        AbreviaturaSucursal: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                args: true,
                msg: 'La abreviatura de la sucursal ya existe.'
            },
            validate: {
                max: {
                    args: 50,
                    msg: 'La abreviatura de la sucursal no puede superar los 50 caracteres.'
                }
            }
        },

        Logo: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                max: {
                    args: 200,
                    msg: 'El logo de la sucursal no puede superar los 200 caracteres.'
                }
            }
        }
    },

    {
        timestamps: false
    }
);

module.exports = {
    sequelize,
    Articulos,
    Vendedores,
    Sucursales
};
