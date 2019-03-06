// import SetOfMovies from "./SetOfMovies";
import { Database, SetOfMovies } from "..";
import User from "../User/User";
import SetOfUsers from "./SetOfUsers";
// import Movie from "./Movie/Movie";

class Watchlist extends SetOfMovies {           //Currently Working on Profile Screen continue from there
    public SetOfMovie = new SetOfMovies()
    static ENTITY = 'user'
    private database = new Database()
    // private id: number
    private userId: string
    private setOfUsers = new SetOfUsers()
    private title : string
    
    constructor(userId: string) {
        super()
        this.userId = userId 
    }

    public async getList(userId : number, type : String) : Promise<SetOfMovies> {      
        // let movie;  
        let value;
        value = await this.database.database.ref("users/" + userId + "/watchlist/" + type).orderByChild('title').once('value', function(snap){
            //change the above to users/movie to make it the folders under the correct location -- this will work
            return value = snap.val()
        });
        let jsonVar = JSON.stringify(value);
        let arrayOfMovies = JSON.parse(jsonVar);

        for(var key in arrayOfMovies)
        {
            console.log(arrayOfMovies[key]);
            this.SetOfMovie.addMovie(arrayOfMovies[key]);
        }
        // return null
        return this.SetOfMovie
    }

    public getUser(): User {
        return this.setOfUsers.findUserById(parseInt(this.userId))
    }

    public getTitle() : String {
        return this.title
    }
 }
export default Watchlist