import Config from '../../Config'
import { IMovie, IGenre } from './Interfaces'
import { default as sortArray } from '../../lib/sort'

interface MovieProperties {
  id: number
  title: string
  poster_path: string
  popularity: number
  release_date: string
  revenue: number
  genres: Array<IGenre>
  runtime: number
  backdrop_path: string
}

class Movie implements IMovie {
  static ENTITY = 'movie'

  private id: number
  private overview: string
  private poster_path: string
  private title: string
  private popularity: number
  private release_date: string
  private revenue: number
  private genres: Array<IGenre>
  private runtime: number
  private backdrop_path: string

  constructor(movie: MovieProperties) {
    this.id = movie.id
    this.title = movie.title

    if(movie.poster_path == undefined)
    {
      this.poster_path = null
    }
    else{
      this.poster_path = movie.poster_path
    }

    if(movie.popularity === undefined)
    {
      this.popularity = null
    }
    else{
      this.popularity = movie.popularity
    }

    if(movie.release_date == undefined)
    {
      this.release_date = null
    }
    else{
      this.release_date = movie.release_date
    }

    if(movie.revenue == undefined)
    {
      this.revenue = null
    }
    else{
      this.revenue = movie.revenue
    }

    if(movie.genres == undefined)
    {
      this.genres = null
    }
    else{
      this.genres = movie.genres
    }

    if(movie.runtime == undefined)
    {
      this.runtime = null
    }
    else{
      this.runtime = movie.runtime
    }

    if(movie.backdrop_path == undefined)
    {
      this.backdrop_path = null
    }
    else{
      this.backdrop_path = movie.backdrop_path
    }
    
    
  }

  


  public getId(): number {
    return this.id
  }

  public setOverview(newOverview: string): void {
    this.overview = newOverview
  }

  public getOverview(): string {
    return this.overview
  }

  public setPoster(newPoster: string): void {
    this.poster_path = newPoster
  }

  public getPoster(width?: string | number): string {
    let posterWidth = width ? `w${width}` : 'original'
    return Config.IMAGE_URL + posterWidth + this.poster_path
  }

  public setTitle(newTitle: string) {
    this.title = newTitle
  }

  public getTitle(excerpt?: number): string {
    if (excerpt) {
      return this.title.substr(0, excerpt) + '...'
    }
    return this.title
  }

  public getPopularity(): number {
    return this.popularity
  }

  public getReleaseDate(): Date {
    return new Date(this.release_date)
  }

  public getRevenue(): number {
    return this.revenue
  }

  public getGenres(sort?: boolean, max?: number): Array<IGenre> {
    let genres = this.genres
    if (sort) genres = sortArray(genres, 'name')
    if (max) genres = genres.splice(0, max)

    return genres
  }

  public getRuntime(): string {
    const minutes = this.runtime % 60
    const hours = Math.floor(this.runtime / 60)
    return `${hours}h ${minutes}min`
  }

  public getBackdrop(width?: string | number): string {
    let posterWidth = width ? `w${width}` : 'original'
    return Config.IMAGE_URL + posterWidth + this.backdrop_path
  }
}

export default Movie
