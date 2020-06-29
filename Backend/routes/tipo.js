const express = require('express');
//importando nuestros servicios
const TiposService = require('../services/tipo');

function tiposApi(app) {
    const router = express.Router();
    app.use("/api/tipos", router);

    //instanciando un nuevo servicio
    const tiposService = new TiposService();

    //Obteniendo toda la lista de usuarios
    router.get("/", async function (req, res, next) {
        //los tags vienen del query de la url
        const { tags } = req.query;
        try {
            //filtramos las usuarios que queremos ver por unos tags
            const tipos = await tiposService.getTipos({ tags });

            res.status(200).json({
                data: tipos,
                message: 'tipos listed'
            })
        } catch (err) {
            next(err);
        }
    });
    //Obteniendo un usuario en particular
    router.get("/:tipoId", async function (req, res, next) {
        //en este caso el id viene como parámetro en la URL
        const { tipoId } = req.params;
        try {
            const tipo = await tiposService.getTipo({ tipoId });

            res.status(200).json({
                data: tipo,
                message: 'tipo retrieved'
            })
        } catch (err) {
            next(err);
        }
    });
    //Creando las usuarios
    router.post("/", async function (req, res, next) {
        //sacamos del cuerpo (body) de la petición la película.
        const { body: tipo } = req;
        try {
            const createdTipoId = await tiposService.createTipo({ tipo });

            res.status(201).json({
                data: createdTipoId,
                message: 'tipos created'
            })
        } catch (err) {
            next(err);
        }
    });
    //Actualizando una película
    router.put("/:tipoId", async function (req, res, next) {
        //con el put recibo dos aspectos, el cuerpo y el parametro (id de tipo a actualizar)
        const { body: tipo } = req;
        const { tipoId } = req.params;

        try {
            const updatedTipoId = await tiposService.udpateTipo({ tipoId, tipo });
            res.status(200).json({
                data: updatedTipoId,
                message: 'tipo updated'
            })
        } catch (err) {
            next(err);
        }
    });
    //Eliminar usuarios
    router.delete("/:tipoId", async function (req, res, next) {
        const { tipoId } = req.params;
        try {
            const deletedTipoId = await tiposService.deleteTipo({ tipoId });

            res.status(200).json({
                data: deletedTipoId,
                message: 'tipo deleted'
            })
        } catch (err) {
            next(err);
        }
    });
}

module.exports = tiposApi;