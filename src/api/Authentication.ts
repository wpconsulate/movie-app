import * as firebase from 'firebase'
import Database from './Database'
import IRegisterParams from './User/IRegisterParams'
class Authentication {
  auth: firebase.auth.Auth
  database: Database
  constructor() {
    this.auth = firebase.app().auth()
    this.database = new Database()
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
    const user = await this.auth.createUserWithEmailAndPassword(email, password)
    const userId = this.auth.currentUser.uid
    this.database.write('users/' + userId, data)
    return user
  }
}
export default Authentication
