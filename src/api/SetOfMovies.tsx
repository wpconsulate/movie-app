import Movie from './Movie/Movie';
import Config from 'react-native-config';

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

    public async getUpcomingMovies() {
        try {
            const response = await fetch(`${Config.BASE_URL+Movie.ENTITY}/upcoming?api_key=${Config.API_KEY}&language=en-US&page=1`);
            const responseJson = await response.json();
            responseJson.results.forEach((movie: Movie) => {
                this.addMovie(movie);
            });
            return this;
        } catch (error) {
            console.log(error);
        }
        return null;
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