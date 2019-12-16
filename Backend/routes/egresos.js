const express = require('express');
//importando nuestros servicios
const EgresosService = require('../services/egresos');

function egresosApi(app) {
    const router = express.Router();
    app.use("/api/egresos", router);

    //instanciando un nuevo servicio
    const egresosService = new EgresosService();

    //Obteniendo toda la lista de usuarios
    router.get("/", async function (req, res, next) {
        //los tags vienen del query de la url
        const { tags } = req.query;
        try {
            //filtramos las usuarios que queremos ver por unos tags
            const egresos = await egresosService.getEgresos({ tags });

            res.status(200).json({
                data: egresos,
                message: 'egresos listed'
            })
        } catch (err) {
            next(err);
        }
    });
    //Obteniendo un usuario en particular
    router.get("/:egresoId", async function (req, res, next) {
        //en este caso el id viene como parámetro en la URL
        const { egresoId } = req.params;
        try {
            const egreso = await egresosService.getEgreso({ egresoId });

            res.status(200).json({
                data: egreso,
                message: 'egreso retrieved'
            })
        } catch (err) {
            next(err);
        }
    });
    //Creando las usuarios
    router.post("/", async function (req, res, next) {
        //sacamos del cuerpo (body) de la petición la película.
        const { body: egreso } = req;
        try {
            const createdEgresoId = await egresosService.createEgreso({ egreso });

            res.status(201).json({
                data: createdEgresoId,
                message: 'egresos created'
            })
        } catch (err) {
            next(err);
        }
    });
    //Actualizando una película
    router.put("/:egresoId", async function (req, res, next) {
        //con el put recibo dos aspectos, el cuerpo y el parametro (id de egreso a actualizar)
        const { body: egreso } = req;
        const { egresoId } = req.params;

        try {
            const updatedEgresoId = await egresosService.udpateEgreso({ egresoId, egreso });
            res.status(200).json({
                data: updatedEgresoId,
                message: 'egreso updated'
            })
        } catch (err) {
            next(err);
        }
    });
    //Eliminar usuarios
    router.delete("/:egresoId", async function (req, res, next) {
        const { egresoId } = req.params;
        try {
            const deletedEgresoId = await egresosService.deleteEgreso({ egresoId });

            res.status(200).json({
                data: deletedEgresoId,
                message: 'egreso deleted'
            })
        } catch (err) {
            next(err);
        }
    });
}

module.exports = egresosApi;