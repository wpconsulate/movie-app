import React, { Component } from 'react'
import { Text, Col, Row, Button } from 'native-base'
import { Image, TextInput } from 'react-native'
import { Movie } from './../api'
import { any } from 'prop-types'

interface IProps {
  username: string
  url: string
  movieId: number
  userId: string
  isReviewing: boolean
}
interface IState {
  review: string
  numberOfDays?: number
  height: number
}

export default class LeaveReview extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      review: '',
      numberOfDays: 0,
      height: 40
    }
  }
  private movie = new Movie(any)
  onLeaveReview(review: String) {
    this.movie.addReview(
      review,
      this.props.movieId,
      this.props.userId,
      this.props.username
    )
  }

  updateSize = (height: number) => {
    this.setState({
      height
    })
  }
  render() {
    const { username, url, isReviewing } = this.props
    const { review } = this.state

    if (!isReviewing) {
      return <Row />
    }
    if (username == 'test' && isReviewing) {
      return (
        <Row>
          <Text
            style={{
              color: 'white',
              fontFamily: 'PoppinsMedium',
              fontSize: 18
            }}
          >
            User must be logged in to leave a review
          </Text>
        </Row>
      )
    }

    return (
      <Row
        style={{
          flexDirection: 'row',
          flex: 1,
          flexWrap: 'wrap',
          marginTop: 5,
          marginLeft: 5
        }}
      >
        <Col style={{ backgroundColor: '#12152D', width: 40, marginRight: 15 }}>
          <Image
            source={{ uri: url }}
            style={{
              height: 40,
              width: 40,
              borderRadius: 37.5,
              backgroundColor: 'red'
            }}
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
            Name: {username}
          </Text>
          <TextInput
            style={{
              backgroundColor: '#12182D',
              color: 'white',
              fontFamily: 'PoppinsMedium',
              fontSize: 18,
              marginBottom: 8
            }}
            placeholder="review"
            onChangeText={text => this.setState({ review: text })}
            editable={true}
            multiline={true}
            value={review}
            onContentSizeChange={e =>
              this.updateSize(e.nativeEvent.contentSize.height)
            }
          />
          <Button
            style={{ width: '100%', margin: 'auto' }}
            onPress={() => this.onLeaveReview(review)}
          >
            <Text
              style={{
                textAlign: 'auto',
                color: 'white',
                fontFamily: 'PoppinsMedium',
                fontSize: 10
              }}
            >
              Sumbit Review
            </Text>
          </Button>
        </Col>
      </Row>
    )
  }
}
