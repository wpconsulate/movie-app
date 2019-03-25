import { database } from 'firebase'
class Database {
  database: firebase.database.Database
  constructor() {
    this.database = database()
  }

  public getCollection(collection: string) {
    return this.database.ref(collection)
  }

  public write(collection: string, data: object) {
    return this.database.ref(collection).set(data)
  }

  public writePush(collection: string, data: object) {
    return this.database.ref(collection).push(data)
  }

  public read(collection: string): Promise<database.DataSnapshot | null> {
    return new Promise((resolve, reject) => {
      this.database.ref(collection).on('value', snapshot => {
        if (!snapshot) {
          return reject('Snapshot is undefined.')
        }
        return resolve(snapshot)
      })
    })
  }
}
export default Database
