import IUser from './UserInterface'
import Model from '../Model'
import Watchlist from '../Collection/Watchlist'
import { Movie } from '..'
import Cast from '../Cast/Cast';
import { IImage } from '../Movie/Interfaces';

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

  public async addFollowToList(
    followId: number,
    followName: string,
    initial: string,
    avatarColour: string
  ) {
    // logged in user adds passed in user ID as following
    await this.database.ref(User.ENTITY + '/' + this.id + '/following/').push({
      followId: followId,
      followName: followName,
      userInitials: initial,
      userAvatarColour: avatarColour
    })

    // add followers
    await this.database
      .ref(User.ENTITY + '/' + followId + '/followers/')
      .push({ followId: this.id, followName: this.getName() })
  }

  public async unFollow(followingUserId: string) {
    //UNFOLLOW passed in id from logged in user
    let delFollowingKey
    let thidUser: any = await this.database
      .ref(User.ENTITY + '/' + this.id + '/following/')
      .once('value', async function(snap) {
        thidUser = snap.val()
        for (let key in thidUser) {
          for (let res in thidUser[key]) {
            if (thidUser[key][res] == followingUserId) {
              delFollowingKey = key
              break
            }
          }
        }
      })
    if (delFollowingKey) {
      await this.database
        .ref(User.ENTITY + '/' + this.id + '/following/' + delFollowingKey)
        .remove()
    }

    //seach db for
    let delFollowerKey
    let loggedinUSer = this.id
    let value: any = await this.database
      .ref(User.ENTITY + '/' + followingUserId + '/followers/')
      .once('value', async function(snap) {
        value = snap.val()
        console.log('unfollow values now now now')
        for (let key in value) {
          for (let res in value[key]) {
            if (value[key][res] == loggedinUSer) {
              delFollowerKey = key
              break
            }
          }
        }
      })

    if (delFollowerKey) {
      await this.database
        .ref(
          User.ENTITY + '/' + followingUserId + '/followers/' + delFollowerKey
        )
        .remove()
    }
  }

  public getFollowersCount() {
    return new Promise((resolve, reject) => {
      this.database
        .ref(User.ENTITY)
        .child(this.id.toString())
        .child('followers')
        .on('value', snapshot => {
          if (snapshot) {
            if (snapshot.exists()) {
              const followers: Array<any> = []
              snapshot.forEach(snap => {
                followers.push({
                  id: snap.key,
                  followId: snap.val().followId,
                  followName: snap.val().followName
                })
              })
              return resolve(followers)
            }
            return reject(`Snapshot doesn't exist.`)
          }
          return reject(`Snapshot undefined`)
        })
    })
  }

  public async addFavActor(actorPic: string, uid: string) {
    await this.writePush(`users/${uid}/actors/`, {
      actorPic
    })
  }

  public async getActors(uid: string) {
    const setOfCasts = new Array<IImage>()
    
    const snap = await this.read(`users/${uid}/actors`);
    if(snap !== null)
    {
      snap.forEach((cast: any) => {
        setOfCasts.push({url : cast.val().actorPic})
      })
    }
    return setOfCasts;
  }

  
}

export default User
