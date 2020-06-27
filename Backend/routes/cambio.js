const express = require('express');
//importando nuestros servicios
const updatePass = require('../services/cambio');
const { verificaToken } = require('../middlewares/authentication');

function cambioContra(app) {
    const router = express.Router();
    app.use("/api/cambio", router);
    const updateCon = new updatePass();
    router.put("/:userId", verificaToken, async function(req, res, next) {
        const { body: user } = req;
        const { userId } = req.params;
        try {
            const usuario = await updateCon.updateContra({ userId, user });
            res.status(200).json({
                Usuario: usuario,
                message: 'Usuario actualizado'
            });
        } catch (err) {
            next(err);
        }
    });

}

module.exports = cambioContra;