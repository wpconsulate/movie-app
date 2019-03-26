import * as React from 'react'
import { View, ActivityIndicator } from 'react-native'
import Authentication from '../api/Authentication'
import SetOfUsers from '../api/Collection/SetOfUsers'
import { Container, Grid, Row, Col, Text, Content } from 'native-base'
import Review from '../components/ReviewTab'
import { database } from 'firebase'
import _ from 'lodash'

interface IState {
  userID: string
  username: string
  userData: any
  isLoading: boolean
  userReviewList: Array<any>

}

export default class ReviewsList extends React.Component<any, IState> {
  private users = new SetOfUsers()

  constructor(props: any) {
    super(props)
    this.state = {
      isLoading: true,
      userData: undefined,
      userID: '',
      username: '',
      userReviewList: []

    }
  }
  async componentWillMount() {
    const currUser = new Authentication()
    const userID = currUser.getCurrentUser().uid
    // let userID = "4ZmT7I7oZYdBy2YYaw5BS0keAhu1"
    const CurrUSerDetails = await this.users.getById(userID)
    // let CurrUSerDetails = await new SetOfUsers().getById("4ZmT7I7oZYdBy2YYaw5BS0keAhu1") //uncomment this if you dont want to login everytime to see the profile page

    database()
    .ref('users/' + userID + '/reviews/')
    .on('value', snapshot => {
      if (snapshot) {
        const reviews: Array<any> = []
        snapshot.forEach(snap => {
          const reviewID = snap.key
          const element = snap.val()
          let likes = []
          if (element.likes) {
            likes = Object.keys(element.likes).map(key => {
              return element.likes[key]
            })
          }

          reviews.push({
            content: element.content,
            createdAt: element.createdAt,
            movieId: reviewID as string,
            rating: element.rating,
            likes
          })
        })
        this.setState({
          userReviewList: _.sortBy(reviews, 'createdAt').reverse()
        })
      }
    })

    this.setState({
      isLoading: false,
      userData: CurrUSerDetails,
      userID: userID,
      username: CurrUSerDetails.name
    })
  }

  render() {
    const { isLoading, userReviewList, userID } = this.state

    if (isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <Container style={{ backgroundColor: '#12152D' }} >
        <Content style={{ paddingHorizontal: 30 }} >
          <Grid>
            <Row>
              <Col>
              {userReviewList.map((element: any) => {
                return (
                  <Review
                    key={element.movieId}
                    review={element.content}
                    date={element.createdAt}
                    rating={element.rating}
                    userId={userID}
                    movieId={element.movieId}
                    likes={element.likes}
                  />
                )
              })}
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
}
