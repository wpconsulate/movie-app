import React, { Component } from 'react'
import {
  Text,
  Col,
  Row,
  Button,
  Textarea
} from 'native-base'
import {
  Image
} from 'react-native'
import { Movie } from './../api'
import { any } from 'prop-types';


interface IProps {
  username: string
  url: string
  movieId: number
  userId: string
}
interface IState {
    review: String
    numberOfDays?: number
}


export default class ReviewTest extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      review: "",
      numberOfDays: 0
    }
  }
  private movie = new Movie(any)
  onLeaveReview(review: String){
      this.movie.addReview(review, this.props.movieId, this.props.userId, this.props.username)
  }

  render(){
    const { username, url } = this.props
    const { review } = this.state




      return(
        <Row style={{
          flexDirection: 'row', flex: 1, flexWrap: 'wrap', marginTop: 40
        }}>
        <Col style={{ backgroundColor: '#12152D', width:40, marginRight:15}}>
        <Image
              source={{ uri: url }}
              style={{
                height: 40,
                width : 40,
                borderRadius: 37.5,
                backgroundColor:'red'
              }}
            />
        </Col>
        <Col style={{ backgroundColor: '#12152D' }}>
          <Text
              style={{
                color: 'white',
                fontFamily: 'PoppinsMedium',
                fontSize:18
              }}
            >
              Name: {username}
            </Text>
          <Textarea
              rowSpan={5}
              onChangeText={text => {
                this.setState({ review: text })
              }}
              style={{
                color: 'white',
                fontFamily: 'PoppinsMedium',
                fontSize:10
              }}
          />    
          <Button
            style={{ width: '100%' }}
            onPress={() => this.onLeaveReview(review)}
          >
            <Text
              style={{
              textAlign: 'auto',
              color: 'white',
              fontFamily: 'PoppinsMedium',
              fontSize:10
            }}>
            Sumbit Review
            </Text>
          </Button>      
          </Col>
        </Row>
      )
    }



}
