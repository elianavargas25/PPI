const express = require('express');
const jwt = require('jsonwebtoken');
const { config } = require('../config/index');
//importando nuestros servicios
const InicioService = require('../services/users');

function sesionApi(app) {
    const router = express.Router();
    app.use("/api/sesion", router);

    //instanciando un nuevo servicio
    const inicioService = new InicioService();

    router.post("/", async function(req, res, next) {
        //los tags vienen del query de la url
        const tags = req.query;
        try {
            //filtramos las usuarios que queremos ver por unos tags
            const users = await inicioService.getInicio(tags);
            if (users["_id"]) {
                let token = jwt.sign({
                    usuario: users
                }, config.seed, { expiresIn: 60 * 60 * 24 * 1 });
                res.status(200).json({
                    data: users,
                    message: 'user alredy exist',
                    token,
                    status: 200
                })
            } else {
                res.status(500).json({
                    err: 'user or password incorrect',
                    status: 500
                })
            }
        } catch (err) {
            next(err);
        }
    });





}

module.exports = sesionApi;