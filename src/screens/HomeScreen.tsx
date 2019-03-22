import React, { Component } from 'react'
import { Container, Header, Content } from 'native-base'
import { NavigationScreenProps } from 'react-navigation'
import { navigationOptions } from '../helpers/header'
import { StoreGlobal } from './globalStore'
import Upcoming from '../containers/Upcoming'
import TopRated from '../containers/TopRated'
import Trending from '../containers/Trending'
import { StatusBar } from 'react-native'
interface IState {
  switch: boolean
}
class HomeScreen extends Component<NavigationScreenProps, IState> {
  static navigationOptions = navigationOptions

  constructor(props: NavigationScreenProps) {
    super(props)
  }

  render() {
    return (
      <Container
        style={{
          backgroundColor: '#12152D',
        }}
      >
        <Header transparent />
        <StatusBar barStyle="light-content" />
        <Content style={{ paddingBottom: 20 }}>
          <Upcoming />
          <TopRated />
          <Trending />
        </Content>
      </Container>
    )
  }
}
export default HomeScreen
