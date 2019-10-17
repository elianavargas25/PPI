const MongoLib = require('../lib/mongo');

class UsersService  {
    
    constructor(){
        this.collection = 'users';
        this.mongoDB = new MongoLib();

    }

    async getusers ( { tags }){
        const query = tags && {$in : {tags}}  
        const users = await this.mongoDB.getAll(this.collection,query)
        return users || []
    }

}

module.exports = UsersService;