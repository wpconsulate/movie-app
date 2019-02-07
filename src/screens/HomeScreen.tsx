import React, { Component } from 'react'
import { Container, Header, Content } from 'native-base'
import { NavigationScreenProps } from 'react-navigation'
import { Upcoming, TopRated, Trending } from '../containers'
import { navigationOptions } from '../helpers/header'

class HomeScreen extends Component<NavigationScreenProps> {
  static navigationOptions = navigationOptions

  constructor(props: NavigationScreenProps) {
    super(props)
  }

  render() {
    // const {navigate} = this.props.navigation;
    return (
      <Container
        style={{
          backgroundColor: '#12152D',
        }}
      >
        <Header transparent />
        <Content>
          <Upcoming />
          <TopRated />
          <Trending />
        </Content>
      </Container>
    )
  }
}
export default HomeScreen
