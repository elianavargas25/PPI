const express = require('express');
//importando nuestros servicios
const UsersService = require('../services/users');

function usersApi(app) {
    const router = express.Router();
    app.use("/api/users", router);

    //instanciando un nuevo servicio
    const usersService = new UsersService();

    //Obteniendo toda la lista de usuarios
    router.get("/", async function(req, res, next) {
        //los tags vienen del query de la url
        const { tags } = req.query;
        try {
            //filtramos las usuarios que queremos ver por unos tags
            const users = await usersService.getUsers({ tags });

            res.status(200).json({
                data: users,
                message: 'users listed'
            })
        } catch (err) {
            next(err);
        }
    });
    //Obteniendo un usuario en particular
    router.get("/:userId", async function(req, res, next) {
        //en este caso el id viene como parámetro en la URL
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
    //Actualizando una película
    router.put("/:userId", async function(req, res, next) {
        //con el put recibo dos aspectos, el cuerpo y el parametro (id de user a actualizar)
        const { body: user } = req;
        const { userId } = req.params;

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