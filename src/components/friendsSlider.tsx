import React from 'react'
import { View, Image, ScrollView, Text, TouchableOpacity } from 'react-native'
import { SetOfUsers, User } from '../api'
import {
  NavigationInjectedProps,
  withNavigation,
  NavigationScreenProp,
  NavigationRoute,
  NavigationParams,
} from 'react-navigation'
interface IProps extends NavigationInjectedProps {
  data: SetOfUsers
  title: String
}
function handleOnPress(
  navigation: NavigationScreenProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >,
  user: User
) {
  navigation.push('User', { userID: user.getId() })
}
function MovieSlider(props: IProps) {
  const userList = props.data
  return (
    <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          marginLeft: 5,
          fontFamily: 'PoppinsBold',
        }}
      >
        {props.title}
      </Text>
      <ScrollView horizontal>
        {userList.map((user: User) => {
          return (
            <TouchableOpacity
              style={{ alignItems: 'center', maxWidth: 100, margin: 10 }}
              key={user.getId()}
              onPress={() => handleOnPress(props.navigation, user)}
            >
              <Image
                style={{ width: 100, height: 150, borderRadius: 10 }}
                source={{ uri:"https://vignette.wikia.nocookie.net/leagueoflegends/images/7/7c/Urgot_OriginalCentered.jpg/revision/latest/scale-to-width-down/1215?cb=20180414203655" }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: '#ffffff',
                  fontFamily: 'PoppinsMedium',
                }}
              >
                {user.getName()}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}
export default withNavigation(MovieSlider)
