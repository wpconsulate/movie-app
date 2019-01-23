import Model from '../Model'
import Movie from './Movie'
import SetOfMovies from '../SetOfMovies'
// import IProperties from './Interfaces/Movie'
class MovieFactory extends Model{
    ENTITY = Movie.ENTITY;

    public async create(data: Movie) {
      return await this.database.ref(this.ENTITY).set(data);
    }

    public async createSet(data: SetOfMovies) {
      return await this.database.ref(this.ENTITY).set(data);
    }
  
    public async update(data: Movie) {
      var results = this.database.ref(this.ENTITY);          
      return await results.child(data.getId().toString()).update(data);  
    }
  
    public async delete(data: Movie) {
      var results = this.database.ref(this.ENTITY);          
      return await results.child(data.getId().toString()).remove();   
    }
}
export default MovieFactory