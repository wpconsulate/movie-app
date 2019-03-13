import React, { Component } from 'react'
import {
  Text,
  Col,
  Row
} from 'native-base'
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native'
interface IProps {
    review: String
    numberOfDays?: number
    username: String
    url: string
}
interface IState {
  show: boolean
}


export default class ReviewTest extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      show: false,
    }
  }


  text(txt: String){
    return (
      <View>
        <Text style={{color:"white"}}>
        {txt} 
        </Text>
      <TouchableOpacity style={{justifyContent:'flex-end'}} onPress={() => this.setState({ show: true })} >
      <Text style={{color:'red'}}>Read More</Text>
      </TouchableOpacity>
      </View>
    )
  }

  render(){
    const { review, numberOfDays, username, url } = this.props
    const { show } = this.state
    
    if(!show){
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
                backgroundColor:'blue'
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
            {username}
          </Text>
        <Text
            style={{
              color: 'white',
              fontFamily: 'PoppinsMedium',
              fontSize:10
            }}
          >
            {numberOfDays} days ago
          </Text>
          {
            review.length > 100 ?
            (this.text(review.substr(0,100) + '...')):
            (
              <Text style={{color:"white"}}>
                {review}
              </Text>
            )
          }
        </Col>
        </Row>
      )
    } else {
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
              {username}
            </Text>
          <Text
              style={{
                color: 'white',
                fontFamily: 'PoppinsMedium',
                fontSize:10
              }}
            >
              {numberOfDays} days ago
            </Text>            
            <Text style={{color:"white"}}>
              {review}
            </Text>    
            <TouchableOpacity style={{justifyContent:'flex-end'}} onPress={() => this.setState({ show: false })} >
              <Text style={{color:'red'}}>Read Less</Text>
            </TouchableOpacity>         
          </Col>
        </Row>
      )
    }
  }
}
