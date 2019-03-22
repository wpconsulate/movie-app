import Movie from '../Movie/Movie'
import Config from '../../Config'
import axios from 'axios'

class SetOfMovies extends Array<Movie> {
  constructor() {
    super()
  }

  public addMovie(movie: any) {
    super.push(new Movie(movie))
  }

  public removeMovie(aNum: number): void | string {
    const movie = this.findMovieById(aNum)
    if (movie) {
      super.slice(aNum)
    } else {
      return 'No movie was found' // Potentially create a error class to return that instead.
    }
  }

  public async getUpcoming(): Promise<SetOfMovies> | null {
    const upcomingResponse = await axios.get(
      `${Config.BASE_URL + Movie.ENTITY}/upcoming?api_key=${
        Config.API_KEY
      }&language=en-US&page=1`
    )
    const upcomingMovies = upcomingResponse.data.results
    for (const upcomingMovie of upcomingMovies) {
      const movieResponse = await axios.get(
        `${Config.BASE_URL}movie/${upcomingMovie.id}?api_key=${Config.API_KEY}`
      )
      this.addMovie(movieResponse.data)
    }
    return this
  }

  public async getTopRated(page?: number): Promise<SetOfMovies> | null {
    let pageNumber = page ? page : 1
    const url = `${Config.BASE_URL + Movie.ENTITY}/top_rated?api_key=${
      Config.API_KEY
    }&language=en-US&page=${pageNumber}`
    try {
      const response = await fetch(url)
      const responseJson = await response.json()
      // console.log(url);
      responseJson.results.forEach((movie: Movie) => {
        this.addMovie(movie)
      })
      return this
    } catch (error) {
      console.log(error)
    }
    return null
  }

  public async getTrending(): Promise<SetOfMovies> | null {
    const url = `${Config.BASE_URL}trending/movie/day?api_key=${Config.API_KEY}`
    try {
      const response = await fetch(url)
      const responseJson = await response.json()
      responseJson.results.forEach((movie: Movie) => {
        this.addMovie(movie)
      })
      return this
    } catch (error) {
      console.log(error)
    }
    return null
  }

  public showMovies() {
    let list = 'Users: '

    this.forEach(element => {
      list = list += ' '
      list = list += element.getTitle()
      list = list += ' -'
    })

    return list
  }

  public async findMovieById(id: number): Promise<Movie | null> {
    const url = `${Config.BASE_URL}movie/${id}?api_key=${Config.API_KEY}`

    try {
      const response = await fetch(url)
      const responseJson = await response.json()
      return new Movie(responseJson)
    } catch (error) {
      console.error(error)
    }
    return null
  }
}

export default SetOfMovies
