import { User } from '../User'
import { Database } from '..'

class SetOfUsers extends Array<User> {
  private database = new Database()

  public getById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.database
        .ref('users')
        .child(id)
        .once('value', snap => {
          if (!snap) {
            return reject('Snapshot is undefined.')
          }
          return resolve(snap.val())
        })
        .catch(err => {
          return resolve(err)
        })
    })
  }

  public addUser(aUser: User) {
    super.push(aUser)
  }

  public showUsers() {
    let list = 'Users: '

    this.forEach(element => {
      list = list += ' '
      list = list += element.getName()
      list = list += ' -'
    })

    return list
  }
}
export default SetOfUsers
