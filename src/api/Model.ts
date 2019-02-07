import Database from './Database'

abstract class Model extends Database {
    ENTITY :string;
    async create(data : object){
        this.database.ref(this.ENTITY).set(data)
    }
    async delete(data : object){
        var results = this.database.ref(this.ENTITY);          
        results.child(data.toString()).remove();  
    };
    async update(data : object){
        this.database.ref(this.ENTITY).set(data)
    };
    async updateLabel(data : object){
        this.database.ref(this.ENTITY).set(data)
    };
}

export default Model;