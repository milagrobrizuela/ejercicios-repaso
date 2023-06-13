const express = require('express');
const { Op } = require('sequelize');
const db = require('../base-orm/sequelize_init.js')

const SucursalesRouter = express.Router();

// 1. Crea un endpoint GET para obtener todas las sucursales cuyo país sea un nombre ingresado como parámetro.

SucursalesRouter.get('/sucursales/getByPais/:PaisIngresado', async function(req, res) {
    try {
        const { PaisIngresado } = req.params;
        const data = await db.Sucursales.findAll({
            where: {Pais:{[Op.lte]: PaisIngresado}}
        });

        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: `No se encontraron sucursales con sede en ${ PaisIngresado }.` })
        }
    } catch (error) {
        res.status(500).json({ error: error. message })
    }
});

// 2. Crea un endpoint GET para obtener todas las sucursales cuyo nombre de calle empiece con "Calle".

SucursalesRouter.get('/sucursales/getByCalle', async function(req, res) {
    try {
        const data = await db.Sucursales.findAll({
            where: {NombreCalle: {[Op.startsWith]: 'Calle%'}}  
        })

        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: 'No se ecnontraron sucursales cuyo nombre de calle empiece con "Calle".'})
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

// 3. Crea un endpoint GET para obtener todas las sucursales cuyo número de calle sea mayor o igual a 500.

SucursalesRouter.get('/sucursales/getByMayorNumeroCalle/:NumeroCalleIngresado', async function(req, res) {
    try {
        const { NumeroCalleIngresado } = req.params;
        const data = await db.Sucursales.findAll({
            where: {NumeroCalle: {[Op.gte]: NumeroCalleIngresado}}
        });

        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: `No se encontraron sucursales cuyo numero de calle sea mayor o igual a ${ NumeroCalleIngresado }.`})
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

// 4. Crea un endpoint GET para obtener todas las sucursales cuyo país sea "Chile" y cuyo número de calle sea 
//    menor o igual a 130.

SucursalesRouter.get('/sucursales/getByMayorPaisAndNumeroCalle', async function(req, res) {
    try {
        const data = await db.Sucursales.findAll({
            where: {[Op.and]: [
                        {NumeroCalle: {[Op.lte]: 130}},
                        {Pais: {[Op.like]: 'Chile'}}
                    ]
                }
        });

        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: 'No se encontraron sucursales cuyo país sea Chile y cuyo número de calle sea menor o igual a 130.'})
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

// 5. Crea un endpoint GET para obtener todas las sucursales cuyo nombre, nombre de calle o abreviatura contengan 
//    una cadena ingresada como parametro. Ordenar según el atributo usado de forma descendente. 

SucursalesRouter.get('/sucursales/getByCadena/:CadenaIngresada', async function(req, res) {
    try {
        const { CadenaIngresada } = req.params;
        const { orden } = req.query;

        let order = [];
        if (orden !== undefined && orden !== '' && (orden === 'Nombre' || orden === 'NombreCalle' || orden === 'AbreviaturaSucursal')) {
            order = [[orden, 'DES']]
        };

        const data = await db.Sucursales.findAll({
            where: {[Op.or]: [
                        {Nombre: {[Op.like]: `%${ CadenaIngresada }%`}},
                        {NombreCalle: {[Op.like]: `%${ CadenaIngresada }%`}},
                        {AbreviaturaSucursal: {[Op.like]: `%${ CadenaIngresada }%`}}
                    ]
                },
            order,
        });

        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: `No se encontraron sucursales que contengan la cadena "${ CadenaIngresada }" en sus atributos.` })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

// 6. Crea un endpoint GET para obtener todas las sucursales cuyo país sea coincidan con una abreviatura
//    ingresada como parámetro y ordenar los resultados por el nombre de forma ascendente.

SucursalesRouter.get('/sucursales/getByAbreviatura/:AbreviaturaIngresada', async function(req, res) {
    try {
        const { AbreviaturaIngresada } = req.params;

        const data = await db.Sucursales.findAll({
            where: {AbreviaturaSucursal: {[Op.like]: `%${AbreviaturaIngresada}%`}},
            order: [['Nombre', 'ASC']]
        });

        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: `No se encontraron sucursales que contengan la cadena "${ AbreviaturaIngresada }" en sus atributos.` })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

// 7. Crea un endpoint GET para obtener todas las sucursales cuyo nombre de calle termine con "2" o "4" y cuyo 
//    país no sea "Brasil".

SucursalesRouter.get('/sucursales/getByNombreCallePais', async function(req, res) {
    try {
        const data = await db.Sucursales.findAll({
            where: {[Op.and]: [
                {Pais: {[Op.not]: 'Brasil'}},
                {NombreCalle: {[Op.or]: [
                                    {[Op.like]: '%2'},
                                    {[Op.like]: '%4'}
                              ]}
                }
            ]}
        });

        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: 'No se encontraron sucursales cuyo nombre de calle termine con "2" o "4" y cuyo país no sea "Brasil' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

// 8. 

SucursalesRouter.get('/api/sucursales', async (req, res) => {
    try {
        const { filtro, orden } = req.query;
    
        let where = {};
        if (filtro !== undefined && filtro !== '') {
            where = {
                [Op.or]: [
                    { AbreviaturaSucursal: { [Op.startsWith]: filtro }},
                    { Nombre: { [Op.startsWith]: filtro }},
                    { Id: { [Op.startsWith]: filtro }}
                ]
            }
        };
    
        let order = [];
        if (orden !== undefined && orden !== '' && (orden === 'Nombre' || orden === 'AbreviaturaSucursal' || orden === 'Id')) {
            order = [[orden, 'ASC']]
        };
    
        const data = await db.Sucursales.findAll({
            where,
            order
        });
    
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: 'No se encontraron sucursales.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = SucursalesRouter;