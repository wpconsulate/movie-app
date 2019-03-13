import React, { Component } from 'react'
import { Container, Header, Content } from 'native-base'
import { NavigationScreenProps } from 'react-navigation'
import { TopRated } from '../containers'
import { navigationOptions } from '../helpers/header'
import { StoreGlobal } from './globalStore'
import Upcoming from '../containers/Upcoming'
import Trending from '../containers/Trending'
interface IState {
  switch: boolean
}
class HomeScreen extends Component<NavigationScreenProps, IState> {
  static navigationOptions = navigationOptions

  constructor(props: NavigationScreenProps) {
    super(props)
    this.state = {
      switch: false,
    }
  }

  onchange = () => {
    this.setState({ switch: !this.state.switch })
    StoreGlobal({ type: 'set', key: 'access', value: !this.state.switch })
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
        <Content style={{paddingBottom: 20 }}>
          <Upcoming />
          {/* <TopRated /> */}
          <Trending />
        </Content>
      </Container>
    )
  }
}
export default HomeScreen
