import React, { Component } from 'react'
import {
  Button,
  Icon,
  Text,
  StyleProvider,
  Container,
  Header,
  Content,
} from 'native-base'
import { NavigationScreenProps } from 'react-navigation'
import getTheme from '../native-base-theme/components'
import mmdb from '../native-base-theme/variables/mmdb'
import { Upcoming, TopRated, Trending } from '../containers'
// import Alert from 'react-native'

class HomeScreen extends Component<NavigationScreenProps> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      headerTransparent: true,
      headerBackgroundTransitionPreset: 'fade',
      headerLeft: (
        <StyleProvider style={getTheme(mmdb)}>
          <Button onPress={() => navigation.navigate('Profile')} transparent>
            <Icon name="person" style={{ color: '#fff' }} />
          </Button>
        </StyleProvider>
      ),
      headerTitle: (
        <StyleProvider style={getTheme(mmdb)}>
          <Button onPress={() => navigation.navigate('Home')} transparent>
            <Text
              style={{ fontFamily: 'PoppinsBold', color: '#fff', fontSize: 18 }}
            >
              mmdb
            </Text>
          </Button>
        </StyleProvider>
      ),
      headerRight: (
        <StyleProvider style={getTheme(mmdb)}>
          <Button onPress={() => navigation.navigate('Search')} transparent>
            <Icon name="search" style={{ color: '#fff' }} />
          </Button>
        </StyleProvider>
      ),
    }
  }
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
