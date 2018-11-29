import Movie from './Movie/Movie';
import Config from '../Config';

class SetOfMovies extends Array<Movie> {
    constructor() {
        super();
    }

    public addMovie(movie: any) {
        super.push(new Movie(movie));
    }

    public removeMovie(aNum: number): void|string {
        const movie = this.findMovieById(aNum);
        if(movie){
            super.slice(aNum);
        } else  {
            return 'No movie was found'; // Potentially create a error class to return that instead.
        }     
    }

    public async getUpcoming():Promise<SetOfMovies>|null {
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

    public async getTopRated(page?: number):Promise<SetOfMovies>|null {
        let pageNumber = (page) ? page : 1;
        const url = `${Config.BASE_URL+Movie.ENTITY}/top_rated?api_key=${Config.API_KEY}&language=en-US&page=${pageNumber}`;
        try {
            const response = await fetch(url);
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

    public async getTrending():Promise<SetOfMovies>|null {
        const url = `${Config.BASE_URL}trending/movie/day?api_key=${Config.API_KEY}`;
        
        try {
            const response = await fetch(url);
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