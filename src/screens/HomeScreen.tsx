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
import { View, ActivityIndicator } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import getTheme from '../native-base-theme/components'
import mmdb from '../native-base-theme/variables/mmdb'
import { TopRated, Trending } from '../containers'
import { Card } from '../components'
import { SetOfMovies, Movie } from '../api'
interface IState {
  movie: Movie
  isLoaded: boolean
}
class HomeScreen extends Component<NavigationScreenProps, IState> {
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
  constructor(props: NavigationScreenProps) {
    super(props)
    this.state = {
      movie: null,
      isLoaded: false,
    }
  }
  async componentWillMount() {
    const movies = new SetOfMovies()
    try {
      const movie = await movies.findMovieById(181808)
      this.setState({
        isLoaded: true,
        movie,
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { isLoaded, movie } = this.state
    const sliderWidth = Math.round(mmdb.deviceWidth)
    const itemWidth = Math.round(sliderWidth - 50)
    if (!isLoaded) {
      return (
        <Container>
          <ActivityIndicator />
        </Container>
      )
    }
    return (
      <Container
        style={{
          backgroundColor: '#12152D',
        }}
      >
        <Header transparent />
        <Content>
          {/* <Upcoming /> */}
          <View>
            <Card
              title={movie.getTitle()}
              bgImage={movie.getPoster()}
              height={itemWidth}
              width={itemWidth}
              onPress
              routeName="Movie"
              params={{ movieId: movie.getId() }}
            />
          </View>
          <TopRated />
          <Trending />
        </Content>
      </Container>
    )
  }
}
export default HomeScreen
