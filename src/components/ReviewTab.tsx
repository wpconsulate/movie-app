import React, { Component } from 'react'
import { Text, Col, Row } from 'native-base'
import { View, TouchableOpacity, Image } from 'react-native'
import moment from 'moment'
interface IProps {
  review: String
  date?: number
  username: String
  url: string
  movieName?: string
}
interface IState {
  show: boolean
}

export default class Review extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      show: false,
    }
  }

  text(txt: String) {
    return (
      <View>
        <Text
          style={{
            marginTop: 9,
            color: 'grey',
            fontFamily: 'PoppinsMedium',
            fontSize: 10,
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
              color: 'red',
              alignSelf: 'flex-end',
              marginRight: 5,
              marginTop: 10,
              fontFamily: 'PoppinsMedium',
              fontSize: 10,
            }}
          >
            Read More
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { review, date, username, url, movieName } = this.props
    const { show } = this.state

    if (!show) {
      return (
        <Row
          style={{
            flexDirection: 'row',
            flex: 1,
            flexWrap: 'wrap',
            marginTop: 40,
          }}
        >
          <Col
            style={{ backgroundColor: '#12152D', width: 40, marginRight: 15 }}
          >
            <Image
              source={{ uri: url }}
              style={{
                height: 40,
                width: 40,
                borderRadius: 37.5,
                backgroundColor: 'blue',
              }}
            />
          </Col>
          <Col style={{ backgroundColor: '#12152D' }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'PoppinsMedium',
                fontSize: 18,
                marginTop: 5,
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
                  fontSize: 10,
                }}
              >
                {review}
              </Text>
            )}
          </Col>
          <Text
            style={{
              marginTop: 9,
              position: 'absolute',
              right: 5,
              color: 'grey',
              fontFamily: 'PoppinsMedium',
              fontSize: 10,
            }}
          >
            {moment(date).fromNow()}
          </Text>
        </Row>
      )
    } else {
      return (
        <Row
          style={{
            flexDirection: 'row',
            flex: 1,
            flexWrap: 'wrap',
            marginTop: 40,
          }}
        >
          <Col
            style={{ backgroundColor: '#12152D', width: 40, marginRight: 15 }}
          >
            <Image
              source={{ uri: url }}
              style={{
                height: 40,
                width: 40,
                borderRadius: 37.5,
                backgroundColor: 'red',
              }}
            />
          </Col>
          <Col style={{ backgroundColor: '#12152D' }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'PoppinsMedium',
                fontSize: 18,
              }}
            >
              {username} {movieName}
            </Text>
            <Text
              style={{
                marginTop: 9,
                position: 'absolute',
                right: 5,
                color: 'grey',
                fontFamily: 'PoppinsMedium',
                fontSize: 10,
              }}
            >
              {moment(date).fromNow()}
            </Text>
            <Text
              style={{
                color: 'grey',
                marginBottom: 5,
                fontSize: 10,
                marginTop: 10,
                fontFamily: 'PoppinsMedium',
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
                  color: 'red',
                  alignSelf: 'flex-end',
                  marginTop: 10,
                  fontFamily: 'PoppinsMedium',
                  fontSize: 10,
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
