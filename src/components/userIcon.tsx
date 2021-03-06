import React from 'react'
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import {
  NavigationInjectedProps,
  withNavigation,
  NavigationScreenProp,
  NavigationRoute,
  NavigationParams
} from 'react-navigation'
import UserAvatar from '../components/UserAvatar'

interface IProps extends NavigationInjectedProps {
  userId: string
  username: string
  userInnitial: string
  avatarColour: string
  textColour?: string
}
const shapes = StyleSheet.create({
  pill: {
    height: 66,
    width: 66,
    borderRadius: 100
  },
  text: {
    color: 'white'
  }
})

function handleOnPress(
  id: string,
  navigation: NavigationScreenProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >
) {
  navigation.push('Profile', { userId: id })
}
const image =
  'https://us.123rf.com/450wm/imagevectors/imagevectors1606/imagevectors160600227/58872995-white-profile-icon-on-blue-button-isolated-on-white.jpg?ver=6'
function UserIcon(props: IProps) {
  return (
    <TouchableOpacity
      key={props.userId}
      style={{ margin: 5, alignSelf: 'baseline', alignItems: 'center' }}
      onPress={() => handleOnPress(props.userId, props.navigation)}
    >
      <UserAvatar
        userInitials={props.userInnitial}
        avatarColour={props.avatarColour}
      />
      {/* <Image style={[shapes.pill]} source={{ uri: image }} />
      <Text style={shapes.text}>{props.username}</Text> */}
      <Text style={shapes.text}>{props.username}</Text>
    </TouchableOpacity>
  )
}

export default withNavigation(UserIcon)
