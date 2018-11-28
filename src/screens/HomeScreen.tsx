import React, { Component } from 'react'
import {
  Button,
  Icon,
  Text,
  StyleProvider,
  Container,
  Header,
  Content,
  View,
} from 'native-base'
import { NavigationScreenProps } from 'react-navigation'
import getTheme from '../native-base-theme/components'
import mmdb from '../native-base-theme/variables/mmdb'
import { StackOfCards } from '../components'
import { SetOfMovies } from '../api'
import { ActivityIndicator, Dimensions } from 'react-native'

interface IProps {
  navigation: Object
}
interface IState {
  isLoaded: boolean
  upcomingMovies: SetOfMovies | null
}

class HomeScreen extends Component<IProps, IState> {
  private upcomingMovies = new SetOfMovies()

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

  constructor(props: IProps) {
    super(props)
    this.state = {
      isLoaded: false,
      upcomingMovies: null,
    }
  }

  async componentDidMount() {
    const upcomingMovies = await this.upcomingMovies.getUpcoming()
    this.setState({
      upcomingMovies: upcomingMovies,
      isLoaded: true,
    })
  }

  render() {
    const { upcomingMovies, isLoaded } = this.state

    const deviceWidth = Dimensions.get('window').width
    const deviceHeight = Dimensions.get('window').height

    const sliderWidth = deviceWidth - 20
    const sliderHeight = deviceHeight - 300
    const itemWidth = sliderWidth - 40

    if (!isLoaded) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    } else {
      console.log(upcomingMovies)
      return (
        <Container
          style={{
            backgroundColor: '#181F52',
          }}
        >
          <Header transparent />
          <Content style={{ marginTop: 25, justifyContent: 'center' }}>
            <StackOfCards
              data={upcomingMovies}
              height={sliderWidth}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
            />
          </Content>
        </Container>
      )
    }
  }
}
export default HomeScreen
