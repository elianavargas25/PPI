const MongoLib = require('../libs/mongo');

class EgresosService  {
    
    constructor(){
        this.collection = 'egresos';
        this.mongoDB = new MongoLib();

    }

    async getEgresos ( { tags }){
        const query = tags && {$in : {tags}}  
        const egresos = await this.mongoDB.getAll(this.collection,query)
        return egresos || []
    }
    async getEgreso( { egresoId }){
        const egreso = await this.mongoDB.get(this.collection, egresoId);
        return egreso || {};
    }

    async createEgreso( { egreso }){
        const createdEgresoId = await this.mongoDB.create(this.collection, egreso);
        return createdEgresoId;
    }

    async udpateEgreso({ egresoId, egreso } = { }){
        const updatedEgresoId = await this.mongoDB.update(this.collection, egresoId, egreso);
        return updatedEgresoId;
    }

    async deleteEgreso({ egresoId }){
        const deletedEgresoId = await this.mongoDB.delete(this.collection, egresoId);
        return deletedEgresoId;
    }

}

module.exports = EgresosService;