import React from 'react'
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import UserAvatar from './UserAvatar'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
interface Iprops extends NavigationInjectedProps {
  following: any
}

function FriendsSlider(props: Iprops) {
  const style = StyleSheet.create({
    imageStyle: {
      margin: 5
    }
  })
  function handlePress(id: any, navigate: any) {
    navigate.push('Profile', { userId: id })
  }
  return (
    <ScrollView horizontal={true}>
      {props.following.map((ele: any) => {
        return (
          <TouchableOpacity
            key={ele.key}
            style={style.imageStyle}
            onPress={() => handlePress(ele.key, props.navigation)}
          >
            <UserAvatar
              userInitials={ele.initial}
              avatarColour={ele.avatarColor}
            />
            <Text style={{ color: 'white' }}>{ele.name}</Text>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

export default withNavigation(FriendsSlider)
