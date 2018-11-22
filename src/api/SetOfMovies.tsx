import Movie from './Movie/Movie';

class SetOfMovies extends Array<Movie> {
    constructor() {
        super();
    }

    public addMovie(aMovie: Movie) {
        super.push(aMovie);
    }

    public removeMovie(aNum: number): void|string {
        const movie = this.findMovieById(aNum);
        if(movie){
            super.slice(aNum);
        } else  {
            return 'No movie was found'; // Potentially create a error class to return that instead.
        }     
    }

    public showMovies(){
        let list = 'Users: '

        this.forEach((element) => {
            list = list += " "
            list = list += element.getTitle();
            list = list += " -";
        });

        return list;
    }

    public findMovieById(id: number): Movie|null {
        for (let i = 0; i < this.length; i++) {
            if (this[i].getId() === id) {
                return this[i];
            }
        }

        return null;
    }

}

export default SetOfMovies;