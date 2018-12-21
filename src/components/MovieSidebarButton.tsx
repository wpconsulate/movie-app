import React from 'react'
import { TouchableOpacity, Image, GestureResponderEvent } from 'react-native'
interface IProps {
  onPress?: (event: GestureResponderEvent) => void
}
function MovieSidebarButton(props: IProps) {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        right: 0,
        top: '15%',
        height: 100,
        width: 35,
        backgroundColor: '#12152D',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        zIndex: 15,
        justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.32)',
        shadowOffset: {
          width: -5,
          height: 2,
        },
        shadowOpacity: 10,
      }}
      onPress={() => props.onPress}
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
