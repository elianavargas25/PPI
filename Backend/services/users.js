const MongoLib = require('../libs/mongo');

class UsersService  {
    
    constructor(){
        this.collection = 'users';
        this.mongoDB = new MongoLib();

    }

    async getUsers ( { tags }){
        const query = tags && {$in : {tags}}  
        const users = await this.mongoDB.getAll(this.collection,query)
        return users || []
    }
    async getUser( { userId }){
        const user = await this.mongoDB.get(this.collection, userId);
        return user || {};
    }

    async createUser( { user }){
        const createdUserId = await this.mongoDB.create(this.collection, user);
        return createdUserId;
    }

    async udpateUser({ userId, user } = { }){
        const updatedUserId = await this.mongoDB.update(this.collection, userId, user);
        return updatedUserId;
    }

    async deleteUser({ userId }){
        const deletedUserId = await this.mongoDB.delete(this.collection, userId);
        return deletedUserId;
    }

    async getInicio(data){
        const inicio = await this.mongoDB.inicio(this.collection, data.username, data.password);
        return inicio || {};
    }

}

module.exports = UsersService;