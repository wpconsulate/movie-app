import { auth } from 'firebase'
import Database from './Database'
import IRegisterParams from './User/IRegisterParams'
import { Algolia } from '.'

class Authentication {
  auth: firebase.auth.Auth
  database: Database
  algolia: Algolia
  constructor() {
    this.auth = auth()
    this.database = new Database()
    this.algolia = new Algolia('users')
  }

  public async login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  public async logout() {
    return this.auth.signOut()
  }

  public async register(
    email: string,
    password: string,
    data: IRegisterParams
  ) {
    // TODO: Check to see if username exists!
    const user = await this.auth.createUserWithEmailAndPassword(email, password)
    const userId = (this.auth.currentUser as firebase.User).uid
    await this.database.write('users/' + userId, {
      ...data,
      joined: new Date().getTime()
    })
    await this.algolia.add({
      id: userId,
      username: data.username,
      userInitials: data.userInitials,
      userAvatarColour: data.userAvatarColour
    })
    return user
  }
  public getCurrentUser() {
    return this.auth.currentUser as firebase.User
  }
  public getCurrentUserUid() {
    return this.getCurrentUser().uid
  }

  public isLoggedIn() {
    if (this.getCurrentUser()) {
      return true
    }
    return false
  }
}
export default Authentication
