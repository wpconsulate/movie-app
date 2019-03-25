import SvgUri from 'react-native-svg-uri'
import React, { Component } from 'react'
import { Container, Header, Content } from 'native-base'
import { NavigationScreenProps } from 'react-navigation'
import { navigationOptions } from '../helpers/header'
import Upcoming from '../containers/Upcoming'
import TopRated from '../containers/TopRated'
import Trending from '../containers/Trending'
import { View, Dimensions } from 'react-native'
interface IState {
  switch: boolean
}
class HomeScreen extends Component<NavigationScreenProps, IState> {
  static navigationOptions = navigationOptions

  constructor(props: NavigationScreenProps) {
    super(props)
  }

  render() {
    const { width, height } = Dimensions.get('window')
    const maxWidth = width / 3.5
    const maxHeight = height / 4.5
    return (
      <Container
        style={{
          backgroundColor: '#12152D'
        }}
      >
        <Header
          transparent
          translucent={true}
          noShadow={true}
          iosBarStyle="light-content"
          // style={{
          //   position: 'absolute',
          //   zIndex: -2,
          //   top: 0,
          //   width: '100%',
          //   height: Constants.statusBarHeight
          // }}
        >
          <View
            style={{
              position: 'absolute',
              width: maxWidth,
              height: maxHeight,
              right: 0,
              top: -34
            }}
          >
            <SvgUri
              source={require('../../assets/red-blob.svg')}
              width="100%"
              height="100%"
            />
          </View>
        </Header>

        <Content
          style={{
            paddingBottom: 20,
            flex: 1,
            marginTop: 15,
            backgroundColor: '#12152D'
          }}
        >
          <Upcoming />
          <TopRated />
          <Trending />
        </Content>
      </Container>
    )
  }
}
export default HomeScreen
