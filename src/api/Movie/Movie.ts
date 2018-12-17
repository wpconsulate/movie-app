import Config from '../../Config'
import {
  IMovie,
  IGenre,
  IProperties,
  IImage,
  IBackdrop,
  IPoster,
} from './Interfaces'
import { default as sortArray } from '../../lib/sort'

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

  constructor(movie: IProperties) {
    this.id = movie.id
    this.title = movie.title
    this.poster_path = movie.poster_path
    this.popularity = movie.popularity
    this.release_date = movie.release_date
    this.revenue = movie.revenue
    this.genres = movie.genres
    this.runtime = movie.runtime
    this.backdrop_path = movie.backdrop_path
    this.overview = movie.overview
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

  public async getBackdrops() {
    let images = new Array<IBackdrop>()

    const url = `${Config.BASE_URL}${
      Movie.ENTITY
    }/${this.getId()}/images?api_key=${Config.API_KEY}`

    try {
      const response = await fetch(url)
      const responseJson = await response.json()
      const backdrops = responseJson.backdrops

      if (backdrops.length < 100) {
        backdrops.forEach((item: any) => {
          if (item.file_path) images.push({ url: item.file_path })
        })
      } else {
        backdrops.forEach((item: any) => {
          item.forEach((value: any) => {
            if (value.file_path) images.push({ url: value.file_path })
          })
        })
      }

      return images
    } catch (error) {
      console.log('getBackdrops', error)
      return null
    }
  }

  public async getPosters() {
    let images = new Array<IPoster>()

    const url = `${Config.BASE_URL}${
      Movie.ENTITY
    }/${this.getId()}/images?api_key=${Config.API_KEY}`

    try {
      const response = await fetch(url)
      const responseJson = await response.json()
      const posters = responseJson.posters

      posters.forEach((item: any) => {
        if (item.file_path) images.push({ url: item.file_path })
      })

      return images
    } catch (error) {
      console.log('getPosters', error)
      return null
    }
  }

  public async getImages(limit?: number): Promise<Array<IImage>> | null {
    let images = new Array<IImage>()
    limit = limit ? limit : 15
    try {
      const backdrops = await this.getBackdrops()
      const posters = await this.getPosters()

      for (let i = 0; i <= limit; i++) {
        const backdropUrl = `${Config.IMAGE_URL}original${backdrops[i].url}`
        const posterUrl = `${Config.IMAGE_URL}original${posters[i].url}`

        images.push({ url: backdropUrl })
        images.push({ url: posterUrl })
      }
      return images
    } catch (error) {
      console.log('Movie::getImages()', error)
      return null
    }
  }
}

export default Movie
