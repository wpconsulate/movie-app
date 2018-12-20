import { ICast } from '../Movie/Interfaces'
import Config from '../../Config'

interface CastProperties {
  character: string
  name: string
  profile_path: string
  id: number
  cast_id: number
}
class Cast implements ICast {
  private character: string
  private name: string
  private image: string
  private id: number
  private castId: number

  constructor(cast: CastProperties) {
    this.character = cast.character
    this.name = cast.name
    this.image = cast.profile_path
    this.id = cast.id
    this.castId = cast.cast_id
  }

  public getId(): number {
    return this.id
  }

  public getName(): string {
    return this.name
  }

  public getCastId(): number {
    return this.castId
  }

  public getCharacter(): string {
    return this.character
  }

  public getImage(width?: number | string): string {
    width = width ? width : 'original'
    return `${Config.IMAGE_URL}${width}/${this.image}?api_key${Config.API_KEY}`
  }
}
export default Cast
