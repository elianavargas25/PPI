const express = require('express');
//importando nuestros servicios
const InicioService = require('../services/users');

function sesionApi(app) {
    const router = express.Router();
    app.use("/api/sesion", router);

    //instanciando un nuevo servicio
    const inicioService = new InicioService();

    router.get("/", async function (req, res, next){
        //los tags vienen del query de la url
        const  tags  = req.query;
        try{
            //filtramos las usuarios que queremos ver por unos tags
            const users = await inicioService.getInicio( tags );
            if(users["_id"]) {
                res.status(200).json({
                    data: users,
                    message: 'user alredy exist',
                    status: 200
                })
            } else {
                res.status(500).json({
                    err: 'user or password incorrect',
                    status: 500
                })
            }

            
        }catch(err){
            next(err);
        }
    });





}

module.exports = sesionApi;