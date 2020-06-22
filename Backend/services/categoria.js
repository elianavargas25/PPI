const MongoLib = require('../libs/mongo');

class categoriaService {

    constructor() {
        this.collection = 'categorias';
        this.mongoDB = new MongoLib();

    }

    async getCategorias ( { tags }){
        const query = tags && {$in : {tags}}  
        const categorias = await this.mongoDB.getAll(this.collection,query)
        return categorias || []
    }
    async getCategoria( { categoriaId }){
        const categoria = await this.mongoDB.get(this.collection, categoriaId);
        return categoria || {};
    }

    async createCategoria( { categoria }){
        const createdCategoriaId = await this.mongoDB.create(this.collection, categoria);
        return createdCategoriaId;
    }

    async udpateCategoria({ categoriaId, categoria } = { }){
        const updatedCategoriaId = await this.mongoDB.update(this.collection, categoriaId, categoria);
        return updatedCategoriaId;
    }

    async deleteCategoria({ categoriaId }){
        const deletedCategoriaId = await this.mongoDB.delete(this.collection, categoriaId);
        return deletedCategoriaId;
    }

}

module.exports = categoriaService;