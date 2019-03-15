import { auth } from 'firebase'
import Database from './Database'
import IRegisterParams from './User/IRegisterParams'
import { Algolia } from '.';
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
    return await this.auth.signInWithEmailAndPassword(email, password)
  }

  public async logout() {
    return await this.auth.signOut()
  }

  public async register(
    email: string,
    password: string,
    data: IRegisterParams
  ) {
    //TODO: Check to see if username exists!
    const user = await this.auth.createUserWithEmailAndPassword(email, password)
    const userId = this.auth.currentUser.uid
    await this.database.write('users/' + userId, data)
    await this.algolia.add({
      id: userId,
      username: data.username,
    })
    return user
  }
  public getCurrentUser() {
    const user = this.auth.currentUser
    return user
  }
  public getCurrentUserUid() {
    const user = this.auth.currentUser.uid
    return user
  }

  public isLoggedIn() {
    // console.log('user', this.getCurrentUser())
    if (this.getCurrentUser()) {
      return true
    }
    return false
  }
}
export default Authentication
