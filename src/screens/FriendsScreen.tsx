import * as React from 'react'
import {
  Text,
  ScrollView
} from 'react-native'

export default class FriendsList extends React.Component {
  render() {
    return (
      <ScrollView style={{ backgroundColor: '#12152D' }}>
        <Text style={{
          alignSelf: 'center',
          color: 'white',
          fontSize: 30,
          fontWeight: 'bold'
          }}>Settings</Text>

          {/* <Review
            review="testing this review"
            username="shezan"
            url="../../assets/profilePicture/p1.png"
          />
          <Review review="testing this review" username="shezan" url="sdfs" />
          <Review review="testing this review" username="shezan" url="sdfs" /> */}

      </ScrollView>
    )
  }
}