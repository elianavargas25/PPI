const MongoLib = require('../lib/mongo');

class UsersService  {
    
    constructor(){
        this.collection = 'user';
        this.mongoDB = new MongoLib();

    }

    async getUsers ( { tags }){
        const query = tags && {$in : {tags}}  
        const users = await this.mongoDB.getAll(this.collection,query)
        return users || []
    }

}

module.exports = ProductsService;
