const express = require('express');
//importando nuestros servicios
const updatePass = require('../services/users');

function cambioContra(app) {
    const router = express.Router();
    app.use("/api/cambio", router);

    //instanciando un nuevo servicio
    const updatePas = new updatePass();
    router.get("/:userId", async function(req, res, next) {
        //en este caso el id viene como parámetro en la URL
        const { userId } = req.params;
        try {
            const user = await updatePas.getUser({ userId });

            res.status(200).json({
                data: user,
                message: 'user retrieved'
            })
        } catch (err) {
            next(err);
        }
    });

    router.put("/:userId", async function(req, res, next) {
        //con el put recibo dos aspectos, el cuerpo y el parametro (id de ingreso a actualizar)
        const { body: user } = req;
        const { userId } = req.params;
        try {
            const updateContra = await updatePas.udpateUser({ userId, user });
            res.status(200).json({
                data: updateContra,
                message: 'Contra updated'
            })
        } catch (err) {
            next(err);
        }
    });

}

module.exports = cambioContra;