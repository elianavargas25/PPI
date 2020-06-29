const MongoLib = require('../libs/mongo');

class tipoService {

    constructor() {
        this.collection = 'tipos';
        this.mongoDB = new MongoLib();

    }

    async getTipos ( { tags }){
        const query = tags && {$in : {tags}}  
        const tipos = await this.mongoDB.getAll(this.collection,query)
        return tipos || []
    }
    async getTipo( { tipoId }){
        const tipo = await this.mongoDB.get(this.collection, tipoId);
        return tipo || {};
    }

    async createTipo( { tipo }){
        const createdTipoId = await this.mongoDB.create(this.collection, tipo);
        return createdTipoId;
    }

    async udpateTipo({ tipoId, tipo } = { }){
        const updatedTipoId = await this.mongoDB.update(this.collection, tipoId, tipo);
        return updatedTipoId;
    }

    async deleteTipo({ tipoId }){
        const deletedTipoId = await this.mongoDB.delete(this.collection, tipoId);
        return deletedTipoId;
    }

}

module.exports = tipoService;