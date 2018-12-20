import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'

interface IProps {
  open: boolean
  opacity: number
}

function MovieSidebar(props: IProps) {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        flex: 1,
        zIndex: 10,
        backgroundColor: 'red',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        disabled={props.open}
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          backgroundColor: 'blue',
          height: 60,
          width: 60,
        }}
      >
        <Image
          style={{
            opacity: props.opacity,
            height: 60,
            width: 60,
            borderRadius: 30,
          }}
          source={require('../../assets/icons/addWatchButton.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={props.open}
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          height: 60,
          width: 60,
        }}
      >
        <Image
          style={{
            opacity: props.opacity,
            height: 60,
            width: 60,
            borderRadius: 30,
          }}
          source={require('../../assets/icons/thumbsUpMovieButton.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={props.open}
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          height: 60,
          width: 60,
        }}
      >
        <Image
          style={{
            opacity: props.opacity,
            height: 60,
            width: 60,
            borderRadius: 30,
          }}
          source={require('../../assets/icons/shareButton.png')}
        />
      </TouchableOpacity>
    </View>
  )
}

export default MovieSidebar
