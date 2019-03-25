import * as React from 'react'
import { View, ActivityIndicator } from 'react-native'
import Authentication from '../api/Authentication'
import SetOfUsers from '../api/Collection/SetOfUsers'
import { Container, Grid, Row, Col, Text, Content } from 'native-base'
import Review from '../components/ReviewTab'

interface IState {
  userID: string
  username: string
  userData: any
  isLoading: boolean
  reviewList: []
}

export default class ReviewsList extends React.Component<any, IState> {
  private users = new SetOfUsers()
  constructor(props: any) {
    super(props)
    this.state = {
      isLoading: true,
      reviewList: [],
      userData: undefined,
      userID: '',
      username: ''
    }
  }
  async componentWillMount() {
    const currUser = new Authentication()
    const userID = currUser.getCurrentUser().uid
    // let userID = "4ZmT7I7oZYdBy2YYaw5BS0keAhu1"
    const CurrUSerDetails = await this.users.getById(userID)
    // let CurrUSerDetails = await new SetOfUsers().getById("4ZmT7I7oZYdBy2YYaw5BS0keAhu1") //uncomment this if you dont want to login everytime to see the profile page
    const userReviews = await this.users.getUserReviewsById(userID)

    this.setState({
      isLoading: false,
      reviewList: userReviews,
      userData: CurrUSerDetails,
      userID: userID,
      username: CurrUSerDetails.name
    })
  }

  render() {
    const { isLoading, reviewList, userID } = this.state

    if (isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <Container style={{ backgroundColor: '#12152D' }} >
        <Content>
          <Grid>
            <Row>
              <Col>
              {reviewList.map((element: any) => {
                return (
                  <Review
                    key={element.movieId}
                    review={element.content}
                    date={element.createdAt}
                    rating={element.rating}
                    userId={userID}
                    movieId={element.movieId}
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
