import React from 'react'
import { Image, StyleSheet, ScrollView } from 'react-native'

export default function FriendsSlider() {
  const style = StyleSheet.create({
    imageStyle: {
      height: 66, // borderRadius:100
      margin: 5,
      width: 66
    }
  })
  return (
    <ScrollView horizontal={true}>
      <Image
        source={require('../../assets/profilePicture/p1.png')}
        style={style.imageStyle}
      />
      <Image
        source={require('../../assets/profilePicture/p2.png')}
        style={style.imageStyle}
      />
      <Image
        source={require('../../assets/profilePicture/p3.png')}
        style={style.imageStyle}
      />
      <Image
        source={require('../../assets/profilePicture/p4.png')}
        style={style.imageStyle}
      />
      <Image
        source={require('../../assets/profilePicture/p5.png')}
        style={style.imageStyle}
      />
      <Image
        source={require('../../assets/profilePicture/p6.png')}
        style={style.imageStyle}
      />
      <Image
        source={require('../../assets/profilePicture/p7.png')}
        style={style.imageStyle}
      />
    </ScrollView>
  )
}
