import Config from '../../Config'
import {
  IMovie,
  IGenre,
  IImage,
  IBackdrop,
  IPoster,
} from './Interfaces'
import { default as sortArray } from '../../lib/sort'
import Cast from './../Cast/Cast'
import Database from '../Database';

interface IParams {
  type?: 'backdrops' | 'posters'
}
class Movie extends Database implements IMovie {
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

  constructor(movie: any) {
    super();
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

  public getRuntime(accessible?: boolean): string {
    const minutes = this.runtime % 60
    const hours = Math.floor(this.runtime / 60)
    if (accessible)
      `${hours} hours and ${minutes} minutes`
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
  }

  public async getPosters() {
    let images = new Array<IPoster>()

    const url = `${Config.BASE_URL}${
      Movie.ENTITY
      }/${this.getId()}/images?api_key=${Config.API_KEY}`
    const response = await fetch(url)
    const responseJson = await response.json()
    const posters = responseJson.posters

    posters.forEach((item: any) => {
      if (item.file_path) images.push({ url: item.file_path })
    })

    return images
  }

  public async getImages(
    limit?: number,
    params?: IParams
  ): Promise<Array<IImage>> {
    let images = new Array<IImage>()
    limit = limit ? limit : 15
    const backdrops = await this.getBackdrops()
    const posters = await this.getPosters()

    for (let i = 0; i < backdrops.length && limit; i++) {
      const backdropUrl = `${Config.IMAGE_URL}original${backdrops[i].url}`
      const posterUrl = `${Config.IMAGE_URL}original${posters[i].url}`
      switch (params.type.toLowerCase()) {
        case 'backdrops':
          images.push({ url: backdropUrl })
          break
        case 'posters':
          images.push({ url: posterUrl })
          break
        default:
          images.push({ url: backdropUrl })
          images.push({ url: posterUrl })
      }
    }

    return images
  }

  public async getCasts(): Promise<Array<Cast> | null> {
    try {
      let setOfCasts = new Array<Cast>()
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
      return null
    }
  }

  public async AddToWatchlist(userId: string, type: String) {
    let planned = await this.searchForCopy(userId, "planned");
    let completed = await this.searchForCopy(userId, "completed");
    let watching = await this.searchForCopy(userId, "watching");
    let dropped = await this.searchForCopy(userId, "dropped");

    if(!planned && !completed && !watching && !dropped)
    {
      await this.database.ref("users/" + userId + "/watchlist/" + type).push(this.getData());
    } 
  }

  public async searchForCopy(userId: string, type : string)
    {
      let id = this.id;
      let returnVal = false;
      await this.database.ref(`users/${userId}/watchlist/${type}`).once('value', function(snap) {
        snap.forEach( function (value) {
          let obj = value.val();
          if(obj.id === id) {
            returnVal = true;
            console.log("A repeat is here");
          }
        })
      })
      return returnVal;
    }

  public getData(): any {
    const { backdrop_path, title, popularity, poster_path, id, runtime  } = this
    //  console.log(this);
    return { backdrop_path, title, popularity, poster_path, id, runtime }
    // return null
  }

  public async addReview(reviewContent: String, movieId: number, userId: string, username: string){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {dd = 0 + dd;}
    if (mm < 10) {mm = 0 + mm;}
    let currentDate = mm + '/' + dd + '/' + yyyy;

    let data = { author: username, content: reviewContent,  date: currentDate}
    await this.write('review/' + movieId + "/" + userId, data)
    await this.write("users/" + userId + "/reviews/" + movieId +"/", data)
    
  }

  public async getMMDBReview(): Promise<any> {
    interface reviewObject {
      id: String
      author: String,
      content: String,
      date: String,
    }
    let reviewList = new Array<reviewObject>()
    await this.database.ref("review/" + this.id).once(
      'value',
      element => {
        element.forEach((review: any) => {
          let reviewID = review.key
          let element = review.toJSON()
          reviewList.push({ id: reviewID, author: element.author, content: element.content, date: element.date })
        })
    },
      (error: any) => {
        console.error(error)
      }
    )
    return reviewList
  }

  public async getReview(): Promise<any> {
    let reviewURL = Config.BASE_URL + "movie/" + this.id + "/reviews?api_key=" + Config.API_KEY;
    let content = await fetch(reviewURL)
    let parsedContent = await content.json();
    interface reviewObject {
      id: String
      author: String,
      content: String,
    }
    let reviewList = new Array<reviewObject>()
    
    parsedContent.results.forEach((element: any) => {
      reviewList.push({ id: element.id, author: element.author, content: element.content })
    })

    return reviewList;
  }

  public async setLike() {
    let count = 0;
    await this.database.ref(`liked/${this.id}`).on(
      'value',
      element => {if(element) {count = element.val().liked}});

      count++;

    await this.database.ref(`liked/${this.id}`).set({"liked" : count});
  }

}


export default Movie