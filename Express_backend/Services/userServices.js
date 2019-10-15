const {userMock } = require('../utils/mocks/movies');

class UserServices{
    async getUsers(){
        const users = await Promise.resolve(userMock);
        return users || [];
    }

   
    async getUser(){
        const user = await Promise.resolve(userMock[0]);
        return user || {};
    }

    async createUser(){
        const createUserId = await Promise.resolve(userMock[2].id);
        return createUserId;
    }
}

module.exports=MoviesServices;