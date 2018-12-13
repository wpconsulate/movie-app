import React from 'react'
import { Header, Left, Icon, Button } from 'native-base'
import {
  NavigationScreenProp,
  NavigationRoute,
  NavigationParams,
} from 'react-navigation'
interface IProps {
  navigation?: NavigationScreenProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >
}
const BackHeader = (props: IProps) => {
  return (
    <Header noShadow transparent androidStatusBarColor="transparent">
      <Left>
        <Button onPress={() => props.navigation.goBack()} transparent>
          <Icon type="Feather" name="chevron-left" />
        </Button>
      </Left>
    </Header>
  )
}

export default BackHeader
