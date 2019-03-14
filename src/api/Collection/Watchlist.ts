// import SetOfMovies from "./SetOfMovies";
import { Database, SetOfMovies } from '..'
import User from '../User/User'
import SetOfUsers from './SetOfUsers'
// import Movie from "./Movie/Movie";

class Watchlist extends SetOfMovies {
  //Currently Working on Profile Screen continue from there
  public SetOfMovie = new SetOfMovies()
  static ENTITY = 'movie'
  private database = new Database()
  // private id: number
  private userId: string
  private setOfUsers = new SetOfUsers()
  private title: string

  constructor(userId: string) {
    super()
    this.userId = userId
  }

  public async getList(userId : string, type : String): Promise<Watchlist> {
    // let movie;
    let value
    let list = new Watchlist(userId)
    let idForUser = "4ZmT7I7oZYdBy2YYaw5BS0keAhu1"
    value = await this.database.database
      .ref("users/" + idForUser + "/watchlist/" + type)
      .once('value', function(snap) {
        //change the above to users/movie to make it the folders under the correct location -- this will work
        return (value = snap.val())
        //console.log(snap);
      })
    let jsonVar = JSON.stringify(value)
    let arrayOfMovies = JSON.parse(jsonVar)

    for (var key in arrayOfMovies) {
      // console.log(arrayOfMovies[key]);
      list.addMovie(arrayOfMovies[key])  //do not do this.setofMovie do a new instance of it and return that
    }
    // return null
    return list
  }

  public getUser(): User {
    return this.setOfUsers.getById(this.userId) as any // Remove any once method is implemented
  }

  public getTitle(): String {
    return this.title
  }
}
export default Watchlist
