const express = require('express');
//importando nuestros servicios
const UsersService = require('../services/users');
const { verificaToken } = require('../middlewares/authentication');

function usersApi(app) {
    const router = express.Router();
    app.use("/api/users", router);

    //instanciando un nuevo servicio
    const usersService = new UsersService();
    router.get("/", async function(req, res, next) {
        const { tags } = req.query;
        try {
            const users = await usersService.getUsers({ tags });
            res.status(200).json({
                data: users,
                message: 'users listed'
            })
        } catch (err) {
            next(err);
        }
    });
    router.get("/:userId", async function(req, res, next) {
        const { userId } = req.params;
        try {
            const user = await usersService.getUser({ userId });

            res.status(200).json({
                data: user,
                message: 'user retrieved'
            })
        } catch (err) {
            next(err);
        }
    });
    //Creando las usuarios
    router.post("/", async function(req, res, next) {
        //sacamos del cuerpo (body) de la petición la película.
        const { body: user } = req;
        try {
            const createdUserId = await usersService.createUser({ user });

            res.status(201).json({
                data: createdUserId,
                message: 'users created'
            })
        } catch (err) {
            next(err);
        }
    });
    router.put("/:userId", async function(req, res, next) {
        const { body: user } = req;
        const { userId } = req.params;
        //console.log("==================> " + userId);
        try {
            const updatedUserId = await usersService.udpateUser({ userId, user });
            res.status(200).json({
                data: updatedUserId,
                message: 'user updated'
            })
        } catch (err) {
            next(err);
        }
    });
    //Eliminar usuarios
    router.delete("/:userId", async function(req, res, next) {
        const { userId } = req.params;
        try {
            const deletedUserId = await usersService.deleteUser({ userId });

            res.status(200).json({
                data: deletedUserId,
                message: 'user deleted'
            })
        } catch (err) {
            next(err);
        }
    });





}

module.exports = usersApi;