const express = require('express');
//importando nuestros servicios
const CategoriasService = require('../services/categorias');

function categoriasApi(app) {
    const router = express.Router();
    app.use("/api/categorias", router);

    //instanciando un nuevo servicio
    const categoriasService = new CategoriasService();

    //Obteniendo toda la lista de usuarios
    router.get("/", async function (req, res, next) {
        //los tags vienen del query de la url
        const { tags } = req.query;
        try {
            //filtramos las usuarios que queremos ver por unos tags
            const categorias = await categoriasService.getCategorias({ tags });

            res.status(200).json({
                data: categorias,
                message: 'categorias listed'
            })
        } catch (err) {
            next(err);
        }
    });
    //Obteniendo un usuario en particular
    router.get("/:categoriaId", async function (req, res, next) {
        //en este caso el id viene como parámetro en la URL
        const { categoriaId } = req.params;
        try {
            const categoria = await categoriasService.getCategoria({ categoriaId });

            res.status(200).json({
                data: categoria,
                message: 'categoria retrieved'
            })
        } catch (err) {
            next(err);
        }
    });
    //Creando las usuarios
    router.post("/", async function (req, res, next) {
        //sacamos del cuerpo (body) de la petición la película.
        const { body: categoria } = req;
        try {
            const createdCategoriaId = await categoriasService.createCategoria({ categoria });

            res.status(201).json({
                data: createdCategoriaId,
                message: 'categorias created'
            })
        } catch (err) {
            next(err);
        }
    });
    //Actualizando una película
    router.put("/:categoriaId", async function (req, res, next) {
        //con el put recibo dos aspectos, el cuerpo y el parametro (id de categoria a actualizar)
        const { body: categoria } = req;
        const { categoriaId } = req.params;

        try {
            const updatedCategoriaId = await categoriasService.udpateCategoria({ categoriaId, categoria });
            res.status(200).json({
                data: updatedCategoriaId,
                message: 'categoria updated'
            })
        } catch (err) {
            next(err);
        }
    });
    //Eliminar usuarios
    router.delete("/:categoriaId", async function (req, res, next) {
        const { categoriaId } = req.params;
        try {
            const deletedCategoriaId = await categoriasService.deleteCategoria({ categoriaId });

            res.status(200).json({
                data: deletedCategoriaId,
                message: 'categoria deleted'
            })
        } catch (err) {
            next(err);
        }
    });
}

module.exports = categoriasApi;