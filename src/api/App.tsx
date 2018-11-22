


class setOfUsers extends Array<User>{
		constructor() {
		super();
	}

	public addUser(aUser: User) {
        super.push(aUser);
    }
    public removeUser(aNum: number) {
		if(this.findUserByID(aNum) != 0){
 			super.slice(aNum);
		}       
	}
	public showUsers(){
		let list = 'Users: '

		this.forEach(element => {
			list = list += " "
			list = list += element.getNickname();
			list = list += " -";
		});
	
		return list;
	}
	
	public findUserByID(aNum: number) {
		let check = 0
		let userCheck = new setOfUsers;
        userCheck.forEach(element => {
			if(element.getUserID() === aNum){
				check = aNum;
			}
		});
		return check;
    }
}

class Movie {
	numberOfUsers: number = 0;
	MovieID: number;
	Overview: string;
	Poster: string;
	MovieTitle: string;
	
	constructor(newEmail: string, newNickname: string, newMovieTitle: string) {
		this.MovieID = (this.numberOfUsers + 1) ;
		this.Overview = newEmail;
		this.Poster = newNickname;
		this.MovieTitle = newMovieTitle;
	}
	public setMovieID(newMovieID: number) {this.MovieID = newMovieID;}
	public getMovieID() {return this.MovieID;}
	public setOverview(newOverview: string) {this.Overview = newOverview;}
	public getOverview() {return this.Overview;}
	public setPoster(newPoster: string) {this.Poster = newPoster;}
	public getPoster() {return this.Poster;}
	public setMovieTitle(newMovieTitle: string) {this.MovieTitle = newMovieTitle;}
	public getMovieTitle() {return this.MovieTitle;}
}

class SetOfMovies extends Array<Movie>{
		constructor() {
		super();
	}

	public addMovie(aMovie: Movie) {
        super.push(aMovie);
    }
    public removeMovie(aNum: number) {
		if(this.findMovieByID(aNum) != 0){
 			super.slice(aNum);
		}       
	}
	public showMovies(){
		let list = 'Users: '

		this.forEach(element => {
			list = list += " "
			list = list += element.getMovieTitle();
			list = list += " -";
		});
	
		return list;
	}
	
	public findMovieByID(aNum: number) {
		let check = 0
		let userCheck = new setOfUsers;
        userCheck.forEach(element => {
			if(element.getUserID() === aNum){
				check = aNum;
			}
		});
		return check;
    }
}


export default App;