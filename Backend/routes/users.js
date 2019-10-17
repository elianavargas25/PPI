const express = require('express');
const usersService = require('../services/users');

function usersApi (app){

    const router = express.Router();

    app.use('/api/users', router);

    const usersService = new UsersService();

    router.get('/', async (req, res, next)=>{
        try{

            const { tags } = req.query;

            const users = await usersService.getusers({tags});

            res.send({
                data: users,
                message: 'users listed'
            })
        }catch(err){
            next(err);
        }
        
    })

}

module.exports = usersApi;