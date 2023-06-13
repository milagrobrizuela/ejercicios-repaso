const express = require('express');
const db = require('../base-orm/sequelize_init.js');
const { Op } = require('sequelize');

const VendedoresRouter = express.Router();

// 1. Crea un endpoint GET que obtenga todos los vendedores.

VendedoresRouter.get('/vendedores/getAll', async function(req, res) {
    try {
        const data = await db.Vendedores.findAll();

        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: 'No se encontraron vendedores.' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

// 2. Crea un endpoint GET que obtenga un vendedor por su id.

VendedoresRouter.get('/vendedores/getById/:IdIngresado', async function(req, res) {
    try {
        const { IdIngresado } = req.params;
        const data = await db.Vendedores.findByPk(IdIngresado);

        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: `No se encontro un vendedor con id ${IdIngresado}.` })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

// 3.  Crea un endpoint GET que obtenga todos los vendedores de una sucursal específica.

VendedoresRouter.get('/vendedores/getBySucursal/:IdSucursalIngresado', async function(req, res) {
    try {
        const { IdSucursalIngresado } = req.params;
        const data = await db.Vendedores.findAll({
            where: { IdSucursal: IdSucursalIngresado}
        });

        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: `No se encontraron vendedores con id de sucursal ${IdSucursalIngresado}.` })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

// 4. Crea un endpoint GET que obtenga todos los vendedores cuyo nombre contenga una cadena específica.

VendedoresRouter.get('/vendedores/getByCadena/:Cadena', async function(req, res) {
    try {
        const { Cadena } = req.params;
        const data = await db.Vendedores.findAll({
            where: { Nombre: {[Op.like]: `%${Cadena}%` }}
        });

        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: `No se encontro un vendedor cuyo nombre contenga la cadena "${Cadena}".` })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

// 5. Crea un endpoint GET que obtenga todos los vendedores mayores de una edad específica.

VendedoresRouter.get('/vendedores/getByEdad/:EdadIngresada', async function(req, res) {
    try {
        const { EdadIngresada } = req.params;
        const anioNacimiento = new Date().getFullYear() - EdadIngresada;
        const data = await db.Vendedores.findAll({
            where: { FechaNacimiento: { [Op.lte]: new Date(anioNacimiento, 11, 31) }}
            // Op.lte (menor o igual) compara las fechas de nacimiento de los trabajadores con un nuevo objeto Date...
            // - Primer argumento: El año de nacimiento.
            // - Segundo argumento: El mes de nacimiento (representando diciembre, ya que los meses en JavaScript son indexados desde 0).
            // - Tercer argumento: El día de nacimiento (representando el día 31). 
        });

        if (data && anioNacimiento) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: `No se encontraron vendedores cuya edad sea mayor a "${EdadIngresada}".` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 6. Crea un endpoint GET que obtenga todos los vendedores ordenados por apellido en orden ascendente.

VendedoresRouter.get('/vendedores/getAllOrdAsc', async function(req, res) {
    try {
        const data = await db.Vendedores.findAll({
            order: [['Apellido', 'ASC']] 
            // Al envolver ['Apellido', 'ASC'] en otro arreglo externo, estamos cumpliendo con el formato esperado por la opción order. 
        });

        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: 'No se econtraron vendedores.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 7. Crea un endpoint GET que obtenga el número total de vendedores

VendedoresRouter.get('/vendedores/getTotal', async function(req, res) {
    try {
        const data = await db.Vendedores.count();

        if (data) {
            res.status(200).json(`La cantidad total de vendedores es ${data}.`);
        } else {
            res.status(404).json({ message: 'No se econtraron vendedores.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 8. Crea un endpoint GET que obtenga todos los vendedores cuyo nombre contiene una cadena y trabajen en 
//    una sucursal específica.

VendedoresRouter.get('/vendedores/getByCadenaAndSucursal/:Cadena/:IdSucursalIngresada', async function(req, res) {
    try {
        const { Cadena, IdSucursalIngresada } = req.params;
        const data = await db.Vendedores.findAll({
            where: {[Op.and]: [
                {Nombre: {[Op.startsWith]: `%${Cadena}%`}},
                {IdSucursal : IdSucursalIngresada}
            ]}
        });

        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: `No se econtraron vendedores de la sucursal ${IdSucursalIngresada} cuyos nombres contengan la cadena "${Cadena}".` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 10. Crea un endpoint GET que obtenga todos los vendedores cuya fecha de nacimiento sea posterior a una fecha 
//     específica y trabajen en una sucursal específica.

VendedoresRouter.get('/vendedores/getByFechaNacimientoAndSucursal/:FechaNacimientoIngresada/:IdSucursalIngresada', async function(req, res) {
    try {
        const { FechaNacimientoIngresada, IdSucursalIngresada } = req.params;
        const data = await db.Vendedores.findAll({
            where: {[Op.and]: [
                {FechaNacimiento: {[Op.gt]: FechaNacimientoIngresada}},
                {IdSucursal : IdSucursalIngresada}
            ]}
        });

        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: `No se econtraron vendedores de la sucursal ${IdSucursalIngresada} cuyos nombres contengan la cadena "${Cadena}".` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = VendedoresRouter;