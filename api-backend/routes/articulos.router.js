const express = require('express');
const db = require('../base-orm/sequelize_init.js');
const { Op } = require('sequelize');

const ArticulosRouter = express.Router();

// 1. Crea un endpoint GET que obtenga todos los artículos.

ArticulosRouter.get('/articulos/getAll', async function(req, res) {
    try {
        const data = await db.Articulos.findAll();

        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: 'No existen articulos.' });
        }
    } catch (error) { 
        res.status(500).json({ error: error.message });
    }
});

// 2. Crea un endpoint GET que obtenga un artículo en particular a partir de su id. 

ArticulosRouter.get('/articulos/getById/:Id', async function(req, res) {
    try {
        const { Id } = req.params;

        const data = await db.Articulos.findByPk(Id);

        if (data) {
          res.status(200).json(data); // El código de respuesta 200 se utiliza para indicar éxito en la solicitud.
        } else {
          res.status(404).json({ error: `No existe un articulo con el id "${Id}".` }); // El código de respuesta 404 indica que el recurso solicitado no se encontro.
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // El código de repuesta 500 indica un error interno del servidor.
    } 
});

// 3. Crea un endpoint GET para obtener de articulos las filas de la tabla teniendo en cuenta el atributo filtro 
//    y el atributo orden, el atributo filtro contiene un texto que debe ser usado para filtrar como raíz de 
//    texto en las columnas Nombre, CodigoDeBarras y FechAlta, y el atributo orden contiene uno de tres posibles 
//    nombres de columna (Nombre, CodigoDeBarras y FechAlt) y debe ser usado para ordenar el resultado.

ArticulosRouter.get('/articulos/getByFiltro/:Filtro', async function(req, res) {
    try {
        const { Filtro } = req.params;
        const { orden } = req.query;

        const orderColumn = ['Nombre', 'CodigoDeBarra', 'FechaAlta'].includes(orden) ? orden: 'Nombre';

        const data = await db.Articulos.findAll({
            where: {[Op.or]: [
                    { Nombre: { [Op.startsWith]: Filtro } },
                    { CodigoDeBarra: { [Op.startsWith]: Filtro } },
                    { FechaAlta: { [Op.startsWith]: Filtro } }
            ]},
            order: [[orderColumn, 'ASC']]
        });

        if (data.length > 0) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: `No existen articulos que coincidan con el filtro "${Filtro}".` });
        }
    } catch (error) { 
        res.status(500).json({ error: error.message });
    }
});

// 4. Crea un endpoint GET que obtenga todos los artículos con un precio mayor que cierto valor ingresado
//    como parámetro.

ArticulosRouter.get('/articulos/getByPrecioMayor/:Precio', async function(req, res) {
    try {
        const { Precio } = req.params;

        const data = await db.Articulos.findAll({
            where: { Precio: { [Op.gt]: Precio }} // Operador de sequelize greater than.
        });

        if (data.length > 0) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: `No existen articulos con precio mayor a ${Precio}.`});
        }
    } catch (error) { 
        res.status(500).json({ error: error.message });
    }
});

// 5. Crea un endpoint GET que obtenga todos los artículos que contengan cierto texto en el nombre y el 
//    código de barras el cual es ingredado como parámetro.

ArticulosRouter.get('/articulos/getByTextoAndCodigo/:Texto/:CodigoBarras', async function(req, res) {
    try {
        const { Texto, CodigoBarras } = req.params;

        const data = await db.Articulos.findAll({
            where: {
                [Op.and]: [
                    { Nombre: { [Op.like]: `%${Texto}%` } },
                    { CodigoDeBarra: { [Op.like]: `%${CodigoBarras}%` } }
                ]
            }
        });

        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: `No existen articulos que coincidan con el texto "${Texto}".` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 6. Crea un endpoint GET que obtenga todos los artículos que tengan una fecha de alta posterior a cierta fecha.

ArticulosRouter.get('/articulos/getByFechaPosterior/:FechaAlta', async function(req, res) {
    try {
        const { FechaAlta } = req.params;

        const data = await db.Articulos.findAll({
            where: { FechaAlta: { [Op.gt]: FechaAlta }}
        });

        if (data.length > 0) {
            res.status(200).json(data);
        } else {
           res.status(404).json({ message: `No existen articulos con fecha de alta posterior a ${FechaAlta}.` }); 
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 7. Crea un endpoint POST que agregue un nuevo artículo. Los datos del artículo deben pasarse en el cuerpo de 
//    la solicitud. Asegúrate de manejar los errores de validación y devolver el registro agregado en caso de 
//    éxito.

ArticulosRouter.post('/articulos/postNuevoArticulo', async function(req, res) {
    try {
        const data = await db.Articulos.create({
            Nombre: req.body.Nombre,
            Precio: req.body.Precio,
            CodigoDeBarra: req.body.CodigoDeBarra,
            IdArticuloFamilia: req.body.IdArticuloFamilia,
            Stock: req.body.Stock,
            FechaAlta: req.body.FechaAlta,
            Activo: req.body.Activo
        });

        if (data) {
            res.status(201).json(data.dataValues);
        } else {
            res.status(404).json({ message: 'No se pudo crear un nuevo articulo.'});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 8. Crea un endpoint PUT que actualice un artículo existente. El identificador del artículo debe pasarse como 
//    parámetro en la URL, y los datos actualizados del artículo deben pasarse en el cuerpo de la solicitud. 
//    Asegúrate de manejar los errores de validación y devolver un código de estado 204 en caso de éxito.

ArticulosRouter.put('/articulos/postModificarArticulo/:Id', async function(req, res) {
    try {
        const { Id } = req.params;

        const [rowsUpdated] = await db.Articulos.update(req.body, { where: { Id: Id }});

        if (rowsUpdated > 0) {
            const updatedArticulo = await db.Articulos.findByPk(Id);

            res.status(200).json(updatedArticulo);
        } else {
            res.status(404).json({ message: `No existe un artículo con ID "${Id}".` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 9. Crea un endpoint DELETE que elimine un artículo cuyo id es ingresado como parámetro.

ArticulosRouter.delete('/articulos/deleteArticuloExistente/:Id', async function (req, res) {
    try {
        const { Id } = req.params;

        const data = await db.Articulos.destroy({where: {Id : Id}});

        if (data) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: `No existe un artículo con ID "${Id}".` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = ArticulosRouter;
