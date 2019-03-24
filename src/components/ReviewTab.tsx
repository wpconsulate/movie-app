import React, { Component } from 'react'
import { Text, Col, Row } from 'native-base'
import { View, TouchableOpacity, ActivityIndicator } from 'react-native'
import moment from 'moment'
import UserAvatar from './UserAvatar'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Authentication from '../api/Authentication'
import SetOfUsers from '../api/Collection/SetOfUsers'
import { SetOfMovies } from '../api'
import { database } from 'firebase'
import Likes from '../api/Collection/Likes'

interface IProps {
  review: string
  date?: number
  movieId: number
  userId?: string
  rating: number
  likes: [{ userId: string }]
  hideMovieTitle?: boolean
}
interface IState {
  show: boolean
  isLoading: boolean
  username: string
  movieName: string
  userInitials: string
  avatarColour: string
  currentUserLiked?: any
}

export default class Review extends Component<IProps, IState> {
  private likes = new Likes()
  private auth = new Authentication()
  constructor(props: IProps) {
    super(props)
    this.state = {
      avatarColour: '',
      isLoading: true,
      movieName: '',
      show: false,
      userInitials: '',
      username: '',
      currentUserLiked: undefined
    }
  }

  getCurrentReviewLikes = () => {
    return this.likes.getLikes(this.props.movieId)
  }

  likeReview = async () => {
    if (this.props.userId) {
      await database()
        .ref('review')
        .child(this.props.movieId.toString())
        .child(this.props.userId)
        .child('likes')
        .push({ userId: this.auth.getCurrentUser().uid })
    }
  }

  async componentWillMount() {
    const userID = this.props.userId as string
    const currMovieId = this.props.movieId
    let movieTitle = ''

    if (currMovieId !== undefined) {
      movieTitle = await new SetOfMovies().getTitleById(currMovieId)
    }
    const CurrUSerDetails = await new SetOfUsers().getById(userID)

    this.setState({
      avatarColour: CurrUSerDetails.userAvatarColour,
      isLoading: false,
      movieName: movieTitle,
      userInitials: CurrUSerDetails.userInitials,
      username: CurrUSerDetails.name
    })
  }

  _renderStars = (stars: number) => {
    const starsArray = []
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

  render() {
    const { review, date, hideMovieTitle, likes } = this.props
    const {
      isLoading,
      show,
      username,
      movieName,
      userInitials,
      avatarColour
    } = this.state

    if (isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <View>
        {!hideMovieTitle && movieName !== '' && (
          <Row
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginTop: 20
            }}
          >
            <Text
              style={{
                alignSelf: 'center',
                color: 'white',
                fontFamily: 'PoppinsMedium',
                fontSize: 18
              }}
            >
              {movieName}
            </Text>
          </Row>
        )}
        <Row
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Col size={2} style={{ backgroundColor: '#12152D', marginRight: 15 }}>
            <UserAvatar
              userInitials={userInitials}
              avatarColour={avatarColour}
            />
          </Col>
          <Col style={{ backgroundColor: '#12152D' }} size={10}>
            <Row
              style={{
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Col>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'PoppinsMedium',
                    fontSize: 16,
                    marginTop: 5,
                    textTransform: 'capitalize'
                  }}
                >
                  {username}
                </Text>
              </Col>
              <Col>
                <Text
                  style={{
                    color: '#686C86',
                    fontFamily: 'Poppins',
                    fontSize: 12,
                    textAlign: 'right'
                  }}
                >
                  {moment(date ? new Date(date) : new Date()).fromNow()}
                </Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Text
                  style={{
                    color: '#686C86',
                    fontFamily: 'PoppinsMedium',
                    fontSize: 14
                  }}
                >
                  {review.length > 100 && !show
                    ? review.substr(0, 100) + '...'
                    : review}
                </Text>
              </Col>
            </Row>
            <Row
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10
              }}
            >
              <Col style={{ alignItems: 'flex-start' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{
                      color: '#686C86',
                      fontFamily: 'Poppins',
                      fontSize: 12,
                      paddingRight: 10
                    }}
                  >
                    {likes ? likes.length : 0} Likes
                  </Text>
                  <Like
                    onPress={this.likeReview}
                    likes={likes}
                    currentUserId={
                      this.auth.getCurrentUser()
                        ? this.auth.getCurrentUser().uid
                        : undefined
                    }
                  />
                </View>
              </Col>
              {review.length > 100 ? (
                <Col style={{ alignItems: 'flex-end' }}>
                  <TouchableOpacity
                    onPress={() => this.setState({ show: !show })}
                  >
                    <Text
                      style={{
                        color: '#E10F0F',
                        fontFamily: 'Poppins',
                        fontSize: 12
                      }}
                    >
                      Read {show ? `less` : `more`}
                    </Text>
                  </TouchableOpacity>
                </Col>
              ) : (
                undefined
              )}
            </Row>
          </Col>
        </Row>
      </View>
    )
  }
}

export const Like = (props: any) => {
  if (!props.currentUserId) {
    return (
      <TouchableOpacity disabled>
        <FontAwesomeIcon name="thumbs-o-up" size={20} color="#686C86" />
      </TouchableOpacity>
    )
  }
  const likes: Array<any> = props.likes
  const userFound = likes.find(like => like.userId === props.currentUserId)
  if (userFound) {
    return (
      <TouchableOpacity disabled>
        <FontAwesomeIcon name="thumbs-up" size={20} color="#E10F0F" />
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <FontAwesomeIcon name="thumbs-o-up" size={20} color="#686C86" />
      </TouchableOpacity>
    )
  }
}
