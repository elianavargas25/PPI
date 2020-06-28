const MongoLib = require('../libs/mongo');

class cambioService {

    constructor() {
        this.collection = 'users';
        this.mongoDB = new MongoLib();

    }

    async updateContra({ userId, user } = {}) {
        const cambio = await this.mongoDB.update(this.collection, userId, user);
        return cambio;
    }

}

module.exports = cambioService;