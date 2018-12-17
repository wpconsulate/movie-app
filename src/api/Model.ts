import Database from './Database'

abstract class Model extends Database {
    ENTITY :string;
    create(data : object){
        this.database.ref(this.ENTITY).set(data)
    }
    delete(key : string){
        var results = this.database.ref(this.ENTITY);          
        results.child(key).remove();  
    };
    update(data : object){
        this.database.ref(this.ENTITY).set(data)
    };
}

export default Model;