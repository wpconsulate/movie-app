import * as firebase from 'firebase'

class Database {
  private database: firebase.database.Database

  constructor() {
    this.database = firebase.database()
  }

  write(collection: string, data: any) {
    const usersRef = this.database.ref().child(collection)
    usersRef.set(data)
  }
}
export default Database
