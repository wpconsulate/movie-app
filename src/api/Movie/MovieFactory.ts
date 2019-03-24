import Model from '../Model'
import Movie from './Movie'
import { SetOfMovies } from '../Collection'
// import IProperties from './Interfaces/Movie'
class MovieFactory extends Model {
  ENTITY = Movie.ENTITY

  public async create(data: Movie) {
    return this.database.ref(this.ENTITY).set(data)
  }

  public async createSet(data: SetOfMovies) {
    return this.database.ref(this.ENTITY).set(data)
  }

  public async update(data: Movie) {
    const results = this.database.ref(this.ENTITY)
    return results.child(data.getId().toString()).update(data)
  }

  public async delete(data: Movie) {
    const results = this.database.ref(this.ENTITY)
    return results.child(data.getId().toString()).remove()
  }
}
export default MovieFactory
