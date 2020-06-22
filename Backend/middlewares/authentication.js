const jwt = require('jsonwebtoken');
const { config } = require('../config/index');
let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, config.seed, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

module.exports = {
    verificaToken
};