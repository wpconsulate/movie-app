import { User } from '../User'
import { Database } from '..'

class SetOfUsers extends Array<User> {
  private database = new Database()

  public async getById(id: string) {
    let value
    value = await this.database.database
      .ref('users/' + id)
      .once('value', function (snap) {
        //change the above to users/movie to make it the folders under the correct location -- this will work
        return (value = snap.val())
        //console.log(snap);
      })
    let jsonVar = JSON.stringify(value)
    let returnVar = JSON.parse(jsonVar)
    return returnVar
  }

  public async getUserReviewsById(userId: string): Promise<any> {
    interface reviewObject {
      id: String
      author: String,
      content: String,
      date: String,
      movieName: String,
    }
    let reviewList = new Array<reviewObject>()
    await this.database.database.ref("users/" + userId + "/reviews/").once(
      'value',
      element => {
        element.forEach((review: any) => {
          let reviewID = review.key
          let element = review.toJSON()
          reviewList.push({ id: reviewID, author: element.author, content: element.content, date: element.date, movieName: element.movieName })    
        })
    },
      (error: any) => {
        console.error(error)
      }
    )
    return reviewList
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
