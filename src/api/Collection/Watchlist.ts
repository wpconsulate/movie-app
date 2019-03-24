// import SetOfMovies from "./SetOfMovies";
import { Database, SetOfMovies } from '..'
import User from '../User/User'
import SetOfUsers from './SetOfUsers'
// import Movie from "./Movie/Movie";

class Watchlist extends SetOfMovies {
  // Currently Working on Profile Screen continue from there
  public SetOfMovie = new SetOfMovies()
  static ENTITY = 'movie'
  private database = new Database()
  // private id: number
  private userId: string
  private setOfUsers = new SetOfUsers()
  private title!: string

  constructor(userId: string) {
    super()
    this.userId = userId
  }

  public async getList(userId: string, type: string): Promise<Watchlist> {
    // let movie;
    let value
    const list = new Watchlist(userId)
    const idForUser = userId
    value = await this.database.database
      .ref('users/' + idForUser + '/watchlist/' + type)
      .once('value', snap => {
        return (value = snap.val())
      })
    const jsonVar = JSON.stringify(value)
    const arrayOfMovies = JSON.parse(jsonVar)

    // tslint:disable-next-line: forin
    for (const key in arrayOfMovies) {
      list.addMovie(arrayOfMovies[key]) 
    }
    return list
  }

  public getUser(): User {
    return this.setOfUsers.getById(this.userId) as any // Remove any once method is implemented
  }

  public getTitle() {
    return this.title
  }
}
export default Watchlist
