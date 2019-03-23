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
    return this.database.ref(collection).set(data)
  }


 
  public read(collection: string) {
    const items: Array<database.DataSnapshot> = []
    this.database.ref(collection).on(
      'value',
      snapshot => {
        items.push((snapshot as database.DataSnapshot).val())
      },
      (error: any) => {
        console.error(error)
      }
    )
    return items
  }
}
export default Database
