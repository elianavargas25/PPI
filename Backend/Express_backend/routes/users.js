const express = require('express');
const UsersService = require('../services/userServices');

function usersApi (app){

    const router = express.Router();

    app.use('/api/users', router);

    const userService = new UsersService();

    router.get('/', async function (req, res, next){
        try{

            const { tags } = req.query;

            const users = await userService.getProducts({tags});

            res.send({
                data: users,
                message: 'Users listed'
            })
        }catch(err){
            next(err);
        }
        
    })

}

module.exports = usersApi;