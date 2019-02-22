import React from 'react'
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

export default function Review (props: IProps){
  function text(txt: String){
    return (
    <View>
      <Text style={{color:"white"}}>
      {txt} 
      </Text>
    <TouchableOpacity style={{justifyContent:'flex-end'}}>
    <Text style={{color:'red'}}>Read More</Text>
    </TouchableOpacity>
    </View>
  )
  }
  return(
    <Row style={{
      flexDirection: 'row', flex: 1, flexWrap: 'wrap', marginTop: 40
    }}>
    <Col style={{ backgroundColor: '#12152D', width:40, marginRight:15}}>
    <Image
          source={{ uri: props.url }}
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
        {props.username}
      </Text>
    <Text
        style={{
          color: 'white',
          fontFamily: 'PoppinsMedium',
          fontSize:10
        }}
      >
        {props.numberOfDays} days ago
      </Text>
      {
        props.review.length > 100 ?
        (text(props.review.substr(0,100) + '...')):
        (
          <Text style={{color:"white"}}>
            {props.review}
          </Text>
        )
      }
      

      
    </Col>
    
   
        
    </Row>
  )
}