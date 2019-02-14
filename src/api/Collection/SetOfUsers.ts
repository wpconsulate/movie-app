import { User } from '../User'

class SetOfUsers extends Array<User> {

  constructor() {
    super()

  }

  public getById(id: string) {
    // implement method for this...
    return id
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
