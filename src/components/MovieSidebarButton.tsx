import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

function MovieSidebarButton() {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        right: 0,
        top: '15%',
        height: 150,
        width: 30,
        backgroundColor: '#12152D',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        zIndex: 5,
      }}
    >
      <Image
        style={{
          height: 60,
          width: 30,
          alignSelf: 'center',
        }}
        source={require('../../assets/icons/SideBar.png')}
      />
    </TouchableOpacity>
  )
}

export default MovieSidebarButton
