import React, { Component } from 'react'
import { Text, Col, Row } from 'native-base'
import { View, TouchableOpacity } from 'react-native'
import moment from 'moment'
import UserAvatar from './UserAvatar'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Authentication from '../api/Authentication'
import SetOfUsers from '../api/Collection/SetOfUsers'
import Movie from '../api/Movie/Movie'

interface IProps {
  review: string
  date?: number
  movieId: number
  userId?: string
  rating: number
}
interface IState {
  show: boolean
  isLoading: boolean
  username: string
  movieName: string
  userInitials: string
  avatarColour: string
}

export default class Review extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      avatarColour: '',
      isLoading: true,
      movieName: '',
      show: false,
      userInitials: '',
      username: ''
    }
  }

  async componentWillMount() {
    let userID = this.props.userId
    const currMovieId = this.props.movieId
    let movieName = ''
    
    console.log('currMovieId')
    console.log(currMovieId)
    console.log('userID')
    console.log(userID)

    if (userID === undefined){
      const currUser = new Authentication()
      userID = currUser.getCurrentUser().uid
    } 

    if ( currMovieId !== undefined ){
      const currentMovie = await new Movie(currMovieId)
      movieName = currentMovie.getTitle()
      console.log('movieName')
      console.log(movieName)

    }

    // let userID = "4ZmT7I7oZYdBy2YYaw5BS0keAhu1"
    const CurrUSerDetails = await new SetOfUsers().getById(userID)
    // let CurrUSerDetails = await new SetOfUsers().getById("4ZmT7I7oZYdBy2YYaw5BS0keAhu1") //uncomment this if you dont want to login everytime to see the profile page

    this.setState({
      avatarColour: CurrUSerDetails.userAvatarColour,
      isLoading: false,  
      movieName: movieName,
      userInitials: CurrUSerDetails.userInitials,  
      username: CurrUSerDetails.name
    })
  }

  _renderStars = (stars: number) => {
    const starsArray = []
    console.log('stars')
    console.log(stars)
    for (let i = 0; i < 5; i++) {
      if (stars <= i) {
        starsArray.push(
          <FontAwesomeIcon key={i} name="star-o" size={10} color="white" />
        )
      } else {
        starsArray.push(
          <FontAwesomeIcon key={i} name="star" size={10} color="white" />
        )
      }
    }
    return starsArray
  }

  text(txt: string) {
    return (
      <View>
        <Text
          style={{
            color: 'grey',
            fontFamily: 'PoppinsMedium',
            fontSize: 10,
            marginTop: 9
          }}
        >
          {txt}
        </Text>
        <TouchableOpacity
          style={{ justifyContent: 'flex-end' }}
          onPress={() => this.setState({ show: true })}
        >
          <Text
            style={{
              alignSelf: 'flex-end',
              color: 'red',
              fontFamily: 'PoppinsMedium',
              fontSize: 10,
              marginRight: 5,
              marginTop: 10
            }}
          >
            Read More
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { review, date, movieName, rating } = this.props
    const { isLoading, show, username, userInitials, avatarColour, userId } = this.state

    if (isLoading){
      return(
        <Row/>
      )
    }

    if (!show) {
      return (
        <Row
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 40
          }}
        >
          <Col
            style={{ backgroundColor: '#12152D', width: 40, marginRight: 15 }}
          >
          <UserAvatar 
            userInitials={userInitials}
            avatarColour={avatarColour}
          />
          </Col>
          <Col style={{ backgroundColor: '#12152D' }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'PoppinsMedium',
                fontSize: 18,
                marginTop: 5
              }}
            >
              {username} {movieName}
            </Text>
            {review.length > 100 ? (
              this.text(review.substr(0, 100) + '...')
            ) : (
              <Text
                style={{
                  color: 'grey',
                  fontFamily: 'PoppinsMedium',
                  fontSize: 10
                }}
              >
                {review}
              </Text>
            )}
          </Col>
          <Text
            style={{
              alignSelf: 'flex-end',
              color: 'red',
              fontFamily: 'PoppinsMedium',
              fontSize: 10,
              marginRight: 5,
              marginTop: 10,
              position: 'absolute',              
              right: 5,
              top: -5
            }}
          >
            {moment(date).fromNow()}
          </Text>
          <Row
            style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
          >
            {this._renderStars(rating)}
          </Row>
        </Row>
      )
    } else {
      return (
        <Row
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 40
          }}
        >
          <Col
            style={{ backgroundColor: '#12152D', width: 40, marginRight: 15 }}
          >
          <UserAvatar 
            userInitials={userInitials}
            avatarColour={avatarColour}
          />
          </Col>
          <Col style={{ backgroundColor: '#12152D' }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'PoppinsMedium',
                fontSize: 18
              }}
            >
              {username} {movieName}
            </Text>
            <Text
              style={{
                alignSelf: 'flex-end',
                color: 'red',
                fontFamily: 'PoppinsMedium',
                fontSize: 10,
                marginRight: 5,
                marginTop: 10,
                position: 'absolute',              
                right: 5,
                top: -5
              }}
            >
              {moment(date).fromNow()}
            </Text>
            <Text
              style={{
                color: 'grey',
                fontFamily: 'PoppinsMedium',
                fontSize: 10,
                marginBottom: 5,
                marginTop: 10,
                right: 5

              }}
            >
              {review}
            </Text>
            <TouchableOpacity
              style={{ justifyContent: 'flex-end' }}
              onPress={() => this.setState({ show: false })}
            >
              <Text
                style={{
                  alignSelf: 'flex-end',
                  color: 'red',
                  fontFamily: 'PoppinsMedium',
                  fontSize: 10,
                  marginTop: 10
                }}
              >
                Read Less
              </Text>
            </TouchableOpacity>
          </Col>
        </Row>
      )
    }
  }
}
