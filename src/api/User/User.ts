import IUser from './UserInterface'
import Model from '../Model'
import Watchlist from '../Collection/Watchlist'
import { Movie } from '..'

interface UserProperties {
  email: string
  name: string
  password: string
}
class User extends Model implements IUser {
  private static ENTITY = 'users'
  private id!: number
  private email!: string
  private name!: string
  private watchlist!: Watchlist
  private isOnline!: boolean

  constructor(properties: any) {
    super()
    Object.assign(this, properties)
    // this.watchlist = new Watchlist(this.id.toString())
  }

  public async create(data: UserProperties) {
    return this.database.ref(User.ENTITY).set(data)
  }

  public async addMovieToList(data: Movie) {
    return this.database.ref(User.ENTITY).set(data)
  }

  public async update(data: UserProperties) {
    const results = this.database.ref(User.ENTITY)
    return results.child(this.id.toString()).update(data)
  }

  public async delete() {
    const results = this.database.ref(User.ENTITY)
    results.child(this.id.toString()).remove()
  }

  public getId(): number {
    return this.id
  }

  public getWatchlist(): Watchlist {
    return this.watchlist
  }

  public getIsOnline(): boolean {
    return this.isOnline
  }

  public async getDetails(): Promise<User> {
    const value = await this.database.ref('users/' + this.id)
    const jsonVar = JSON.stringify(value)
    const User = JSON.parse(jsonVar)

    this.setName = User.name
    this.setEmail = User.email
    this.isOnline = User.isOnline
    return this
  }

  public setEmail(newEmail: string): void {
    this.email = newEmail
  }

  public getEmail(): string {
    return this.email
  }

  public setName(newName: string) {
    this.name = newName
  }

  public getName(): string {
    return this.name
  }

  public getSnapshot() {
    return new Promise((resolve, reject) => {
      this.database
        .ref('users')
        .equalTo(this.email)
        .on('value', value => {
          if (!value) {
            return reject()
          }
          return resolve(value as firebase.database.DataSnapshot)
        })
    })
  }

  public async addFollowToList(followId: number, followName: string) {
    await this.database.ref(User.ENTITY + '/' + this.id).set({
      followers: { followId: followId, followName: followName }
    })
    return this.database.ref(User.ENTITY + '/' + followId).set({
      follows: { followId: this.id, followName: this.getName }
    })
  }

  public async addFavActor(actorID: number, actorPic: string) {
    return this.database.ref(User.ENTITY).set({
      actors: { actorID: actorID, actorPic: actorPic }
    })
  }
}

export default User
