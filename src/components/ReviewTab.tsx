import React from 'react'
import {
  Text,
  Col,
} from 'native-base'
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native'
interface IProps {
    review: string
    numberOfDays?: number
    username: string
    url: string
}

export default function Review (props: IProps){
  return(
    <View style={{
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
    <Col style={{ backgroundColor: '#12152D', height: 200 }}>
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
    
      <Text style={{color:"white"}}>
      
      {props.review}
      </Text>

      <TouchableOpacity style={{justifyContent:'flex-end'}}>
        <Text style={{color:'red'}}>Read More</Text>
      </TouchableOpacity>
    </Col>
    
   
        
    </View>
  )
}