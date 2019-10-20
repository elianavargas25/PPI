const express = require('express');
//importando nuestros servicios
const IngresosService = require('../services/ingresos');

function ingresosApi(app) {
    const router = express.Router();
    app.use("/api/ingresos", router);

    //instanciando un nuevo servicio
    const ingresosService = new IngresosService();

    //Obteniendo toda la lista de usuarios
    router.get("/", async function (req, res, next){
        //los tags vienen del query de la url
        const { tags } = req.query;
        try{
            //filtramos las usuarios que queremos ver por unos tags
            const ingresos = await ingresosService.getIngresos({ tags });

            res.status(200).json({
                data: ingresos,
                message: 'ingresos listed'
            })
        }catch(err){
            next(err);
        }
    });
    //Obteniendo un usuario en particular
    router.get("/:ingresoId", async function (req, res, next){
        //en este caso el id viene como parámetro en la URL
        const { ingresoId } = req.params;
        try{
            const ingreso = await ingresosService.getIngreso( { ingresoId });

            res.status(200).json({
                data: ingreso,
                message: 'ingreso retrieved'
            })
        }catch(err){
            next(err);
        }
    });
    //Creando las usuarios
    router.post("/", async function (req, res, next){
        //sacamos del cuerpo (body) de la petición la película.
        const { body : ingreso } = req;
        try{
            const createdIngresoId = await ingresosService.createIngreso( { ingreso});

            res.status(201).json({
                data: createdIngresoId,
                message: 'ingresos created'
            })
        }catch(err){
            next(err);
        }
    });
    //Actualizando una película
    router.put("/:ingresoId", async function (req, res, next){
        //con el put recibo dos aspectos, el cuerpo y el parametro (id de ingreso a actualizar)
        const { body : ingreso } = req;
        const { ingresoId } = req.params;

        try{
            const updatedIngresoId = await ingresosService.udpateIngreso({ ingresoId , ingreso });
            res.status(200).json({
                data: updatedIngresoId,
                message: 'ingreso updated'
            })
        }catch(err){
            next(err);
        }
    });
    //Eliminar usuarios
    router.delete("/:ingresoId", async function (req, res, next){
        const { ingresoId } = req.params;
        try{
            const deletedIngresoId = await ingresosService.deleteIngreso({ ingresoId });

            res.status(200).json({
                data: deletedIngresoId,
                message: 'ingreso deleted'
            })
        }catch(err){
            next(err);
        }
    });
}

module.exports = ingresosApi;