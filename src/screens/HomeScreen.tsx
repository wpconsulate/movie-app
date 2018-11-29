import React, { Component } from 'react'
import {
  Button,
  Icon,
  Text,
  StyleProvider,
  Container,
  Header,
} from 'native-base'
import { NavigationScreenProps } from 'react-navigation'
import getTheme from '../native-base-theme/components'
import mmdb from '../native-base-theme/variables/mmdb'
import Upcoming from '../containers/Upcoming'

interface IProps {
  navigation: Object
}
class HomeScreen extends Component<IProps> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      headerTransparent: true,
      headerBackgroundTransitionPreset: 'fade',
      headerLeft: (
        <StyleProvider style={getTheme(mmdb)}>
          <Button onPress={() => navigation.navigate('Login')} transparent>
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

  render() {
    return (
      <Container
        style={{
          backgroundColor: '#181F52',
          paddingHorizontal: 25,
        }}
      >
        <Header transparent />
        <Upcoming />
      </Container>
    )
  }
}
export default HomeScreen
