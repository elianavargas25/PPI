const MongoLib = require('../lib/mongo');

class IngresosService  {
    
    constructor(){
        this.collection = 'ingresos';
        this.mongoDB = new MongoLib();

    }

    async getIngresos ( { tags }){
        const query = tags && {$in : {tags}}  
        const ingresos = await this.mongoDB.getAll(this.collection,query)
        return ingresos || []
    }
    async getIngreso( { ingresoId }){
        const ingreso = await this.mongoDB.get(this.collection, ingresoId);
        return ingreso || {};
    }

    async createIngresos( { ingreso }){
        const createdIngresoId = await this.mongoDB.create(this.collection, ingreso);
        return createdIngresoId;
    }

    async udpateIngreso({ ingresoId, ingreso } = { }){
        const updatedIngresoId = await this.mongoDB.update(this.collection, ingresoId, ingreso);
        return updatedIngresoId;
    }

    async deleteIngreso({ ingresoId }){
        const deletedIngresoId = await this.mongoDB.delete(this.collection, ingresoId);
        return deletedIngresoId;
    }

}

module.exports = IngresosService;