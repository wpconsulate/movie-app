import Config from '../../Config'
import { IMovie, IGenre, IImage, IBackdrop, IPoster } from './Interfaces'
import { default as sortArray } from '../../lib/sort'
import Cast from './../Cast/Cast'
import Database from '../Database'
import axios from 'axios'

interface IParams {
  type?: 'backdrops' | 'posters'
}

interface IAddToReview {
  review: {
    rating: number
    content: string
  }
  user: {
    id: string
    name: string
  }
}
class Movie extends Database implements IMovie {
  static ENTITY = 'movie'
  private id!: number
  private overview!: string
  private poster_path!: string
  private title!: string
  private popularity!: number
  private release_date!: string
  private revenue!: number
  private genres!: Array<IGenre>
  private runtime!: number
  private backdrop_path!: string
  private vote_average!: number
  // private genre_ids: Array<number>

  constructor(movie: any) {
    super()
    Object.assign(this, movie)
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
    const posterWidth = width ? `w${width}` : 'original'
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

  public async getGenreList(type = 'movie') {
    try {
      const res = await axios.get(
        `${Config.BASE_URL}genre/${type}/list?api_key=${Config.API_KEY}`
      )
      return res.data
    } catch (err) {
      console.error(err)
    }
  }

  public async getTrailer(item?: number) {
    const res = await axios.get(
      `${Config.BASE_URL}movie/${this.getId()}/videos?api_key=${Config.API_KEY}`
    )
    if (item && item >= 0) {
      return res.data.results[item]
    }
    return res.data.results
  }

  public getGenres(sort?: boolean, max?: number) {
    if (sort) {
      this.genres = sortArray(this.genres, 'name') as Array<IGenre>
    }
    if (max) {
      this.genres = this.genres.splice(0, max)
    }

    return this.genres
  }

  public getRuntime(accessible?: boolean): string {
    const minutes = this.runtime % 60
    const hours = Math.floor(this.runtime / 60)
    if (accessible) {
      return `${hours} hours and ${minutes} minutes`
    }
    return `${hours}h ${minutes}min`
  }

  public getBackdrop(width?: string | number): string {
    const posterWidth = width ? `w${width}` : 'original'
    return Config.IMAGE_URL + posterWidth + this.backdrop_path
  }

  public async getBackdrops() {
    const images = new Array<IBackdrop>()

    const url = `${Config.BASE_URL}${
      Movie.ENTITY
    }/${this.getId()}/images?api_key=${Config.API_KEY}`

    const response = await fetch(url)
    const responseJson = await response.json()
    const backdrops = responseJson.backdrops

    if (backdrops.length < 100) {
      backdrops.forEach((item: any) => {
        if (item.file_path) {
          images.push({ url: item.file_path })
        }
      })
    } else {
      backdrops.forEach((item: any) => {
        item.forEach((value: any) => {
          if (value.file_path) {
            images.push({ url: value.file_path })
          }
        })
      })
    }

    return images
  }

  public async getPosters() {
    const images = new Array<IPoster>()

    const url = `${Config.BASE_URL}${
      Movie.ENTITY
    }/${this.getId()}/images?api_key=${Config.API_KEY}`
    const response = await fetch(url)
    const responseJson = await response.json()
    const posters = responseJson.posters

    posters.forEach((item: any) => {
      if (item.file_path) {
        images.push({ url: item.file_path })
      }
    })

    return images
  }

  public getRating() {
    return this.vote_average / 2
  }

  public async getImages(
    limit?: number,
    params?: IParams
  ): Promise<Array<IImage>> {
    const images = new Array<IImage>()
    limit = limit ? limit : 15
    const backdrops = await this.getBackdrops()
    const posters = await this.getPosters()
    if ((params as IParams).type === 'backdrops') {
      const backdropImages = new Array<IImage>()
      for (let i = 0; i < backdrops.length && limit; i++) {
        const backdropUrl = `${Config.IMAGE_URL}original${backdrops[i].url}`
        backdropImages.push({ url: backdropUrl })
      }
      return backdropImages
    } else if ((params as IParams).type === 'posters') {
      const posterImages = new Array<IImage>()
      for (let i = 0; i < posters.length && limit; i++) {
        const posterUrl = `${Config.IMAGE_URL}original${posters[i].url}`
        posterImages.push({ url: posterUrl })
      }
      return posterImages
    } else {
      for (let i = 0; i < backdrops.length && limit; i++) {
        const backdropUrl = `${Config.IMAGE_URL}original${backdrops[i].url}`
        images.push({ url: backdropUrl })
      }
      for (let i = 0; i < posters.length && limit; i++) {
        const posterUrl = `${Config.IMAGE_URL}original${posters[i].url}`
        images.push({ url: posterUrl })
      }
      return images
    }
  }

  public async getCasts() {
    try {
      const setOfCasts = new Array<Cast>()
      const url = `${Config.BASE_URL}movie/${this.id}/credits?api_key=${
        Config.API_KEY
      }`
      const response = await fetch(url)
      const responseJson = await response.json()
      responseJson.cast.forEach((cast: any) => {
        setOfCasts.push(new Cast(cast))
      })
      return setOfCasts
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  public async AddToWatchlist(userId: string, type: string) {
    const planned = await this.searchForCopy(userId, 'planned')
    const completed = await this.searchForCopy(userId, 'completed')
    const watching = await this.searchForCopy(userId, 'watching')
    const dropped = await this.searchForCopy(userId, 'dropped')

    if (!planned && !completed && !watching && !dropped) {
      await this.database
        .ref('users/' + userId + '/watchlist/' + type)
        .push(this.getData())
    }
  }

  public async searchForCopy(userId: string, type: string) {
    const id = this.id
    let returnVal = false
    await this.database
      .ref(`users/${userId}/watchlist/${type}`)
      .once('value', snap => {
        snap.forEach(value => {
          const obj = value.val()
          if (obj.id === id) {
            returnVal = true
            console.log('A repeat is here')
          }
        })
      })
    return returnVal
  }

  public getData(): any {
    // tslint:disable-next-line: no-this-assignment
    const { backdrop_path, title, popularity, poster_path, id, runtime } = this
    return { backdrop_path, title, popularity, poster_path, id, runtime }
  }

  public async addReview(data: IAddToReview) {
    const date = new Date().getTime()
    await this.write(`review/${this.getId()}/${data.user.id}`, {
      author: data.user.name,
      createdAt: date,
      content: data.review.content,
      rating: data.review.rating
    })
    await this.write(`users/${data.user.id}/reviews/${this.getId()}`, {
      rating: data.review.rating,
      content: data.review.content,
      createdAt: date
    })
  }

  public getMMDBRating(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.database
        .ref('review')
        .child(this.getId().toString())
        .once('value', snapshot => {
          const ratings: Array<number> = []
          let total = 0
          if (!snapshot) {
            return reject('Snapshot undefined.')
          }
          if (!snapshot.exists()) {
            return resolve(0)
          }
          snapshot.forEach(snap => {
            const rating = parseInt(snap.val().rating, undefined)
            total += rating
            ratings.push(rating)
          })
          const average = total / ratings.length
          return resolve(average)
        })
    })
  }

  public async getMMDBReview(): Promise<any> {
    interface ReviewObject {
      id: string
      author: string
      content: string
      date: string
      rating: number
      likes: Array<any>
      // userId: string
    }
    const reviewList = new Array<ReviewObject>()
    await this.database.ref('review/' + this.id).once(
      'value',
      element => {
        element.forEach(review => {
          const reviewID = review.key
          const element = review.val()
          const likes = Object.keys(element.likes).map(key => {
            return element.likes[key]
          })
          reviewList.push({
            author: element.author,
            content: element.content,
            date: element.date,
            id: reviewID as string,
            rating: element.rating,
            likes
          })
        })
      },
      (error: any) => {
        console.error(error)
      }
    )
    return reviewList
  }

  public async getReview(): Promise<any> {
    const reviewURL =
      Config.BASE_URL +
      'movie/' +
      this.id +
      '/reviews?api_key=' +
      Config.API_KEY
    const content = await fetch(reviewURL)
    const parsedContent = await content.json()
    interface ReviewObject {
      id: string
      author: string
      content: string
    }
    const reviewList = new Array<ReviewObject>()

    parsedContent.results.forEach((element: any) => {
      reviewList.push({
        author: element.author,
        content: element.content,
        id: element.id
      })
    })

    return reviewList
  }
}

export default Movie
