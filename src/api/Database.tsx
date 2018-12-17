import * as firebase from 'firebase'

class Database {
  private database: firebase.database.Database
  constructor() {
    this.database = firebase.app().database()
  }

  public write(collection: string, data: object) {
    this.database.ref(collection).set(data)
  }
}
export default Database
