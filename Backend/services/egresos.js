const MongoLib = require('../libs/mongo');

class EgresosService  {
    
    constructor(){
        this.collection = 'egresos';
        this.mongoDB = new MongoLib();

    }

    async getEgresos ( { tags }){
        const query = tags && {$in : {tags}}  
        const ingresos = await this.mongoDB.getAll(this.collection,query)
        return ingresos || []
    }
    async getEgreso( { ingresoId }){
        const ingreso = await this.mongoDB.get(this.collection, ingresoId);
        return ingreso || {};
    }

    async createEgreso( { ingreso }){
        const createdEgresoId = await this.mongoDB.create(this.collection, ingreso);
        return createdEgresoId;
    }

    async udpateEgreso({ ingresoId, ingreso } = { }){
        const updatedEgresoId = await this.mongoDB.update(this.collection, ingresoId, ingreso);
        return updatedEgresoId;
    }

    async deleteEgreso({ ingresoId }){
        const deletedEgresoId = await this.mongoDB.delete(this.collection, ingresoId);
        return deletedEgresoId;
    }

}

module.exports = EgresosService;