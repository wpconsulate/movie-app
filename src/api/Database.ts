import { database } from 'firebase'
class Database {
  database: firebase.database.Database
  constructor() {
    this.database = database()
  }

  public getCollection(collection: string) {
    return this.database.ref(collection)
  }

  public async write(collection: string, data: object) {
    return await this.database.ref(collection).set(data)
  }


 
  public read(collection: string) {
    return new Promise((resolve, reject) => {
      this.database.ref(collection)
        .on('value', snap => {
          if (!snap.val()) return reject()
          return resolve(snap.val())
        })
    })
  }
}
export default Database
