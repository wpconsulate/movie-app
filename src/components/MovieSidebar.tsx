import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { BlurView } from 'expo'

interface IProps {
  show: boolean
}

function MovieSidebar(props: IProps) {
  if (props.show) {
    return (
      <BlurView
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
          alignItems: 'center',
          justifyContent: 'center',
        }}
        tint="dark"
        intensity={70}
      >
        <TouchableOpacity
          style={{
            marginBottom: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
            }}
            source={require('../../assets/icons/add-watch-button.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 50,
          }}
        >
          <Image
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
            }}
            source={require('../../assets/icons/share.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
            }}
            source={require('../../assets/icons/thumbs-up.png')}
          />
        </TouchableOpacity>
      </BlurView>
    )
  }
  return <View />
}

export default MovieSidebar
