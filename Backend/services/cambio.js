const MongoLib = require('../libs/mongo');

class cambioService {

    constructor() {
        this.collection = 'users';
        this.mongoDB = new MongoLib();

    }

    async updateContra(userId, user, password) {
        const cambio = await this.mongoDB.getAll(this.collection, userId, password);
        return cambio || {};
    }

}

module.exports = cambioService;