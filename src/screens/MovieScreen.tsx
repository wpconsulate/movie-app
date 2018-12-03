import React, { Component } from 'react'
import {
  Button,
  Icon,
  StyleProvider,
  Container,
  Header,
  Content,
  Row,
  Col,
  H1,
  Text,
} from 'native-base'
import {
  NavigationScreenProp,
  NavigationRoute,
  NavigationParams,
} from 'react-navigation'
import getTheme from '../native-base-theme/components'
import mmdb from '../native-base-theme/variables/mmdb'
import { NavigationScreenProps } from 'react-navigation'
import { SetOfMovies, Movie } from '../api'
import { Genres } from '../components'
import { ActivityIndicator, ImageBackground, View } from 'react-native'
import { LinearGradient } from 'expo'
import SvgUri from 'react-native-svg-uri'
import { formatDate } from '../lib'

interface IProps {
  navigation?: NavigationScreenProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >
}

interface IState {
  movie: Movie | null
  isLoaded: boolean
}

export default class MovieScreen extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      headerTransparent: true,
      headerBackgroundTransitionPreset: 'fade',
      headerLeft: (
        <StyleProvider style={getTheme(mmdb)}>
          <Button onPress={() => navigation.goBack()} transparent>
            <Icon
              type="Feather"
              name="chevron-left"
              style={{ color: '#fff' }}
            />
          </Button>
        </StyleProvider>
      ),
    }
  }
  private movies = new SetOfMovies()
  constructor(props: IProps) {
    super(props)
    this.state = {
      movie: null,
      isLoaded: false,
    }
  }

  async componentWillMount() {
    const id = await this.props.navigation.getParam('movieId', 181808) // Star Wars: The Last Jedi
    const movie = await this.movies.findMovieById(parseInt(id))
    this.setState({
      movie,
      isLoaded: true,
    })
  }

  render() {
    const { movie, isLoaded } = this.state

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
        <View style={{ height: mmdb.isIphoneX ? '55%' : '55%' }}>
          <ImageBackground
            source={{
              uri: movie.getBackdrop(),
            }}
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <LinearGradient
              colors={['rgba(18, 21, 45, 100)', 'rgba(18, 21, 45, 0.04)']}
              start={[0.5, 1]}
              end={[0.5, 0]}
              style={{
                position: 'absolute',
                flex: 1,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
              }}
            />
            <Header transparent />
            <View style={{ width: '100%', marginTop: 50 }}>
              <Button
                transparent
                style={{ width: 85, height: 85, alignSelf: 'center' }}
              >
                <SvgUri
                  source={require('../../assets/icons/play-button.svg')}
                  width={85}
                  height={85}
                />
              </Button>
            </View>
            <Content style={{ maxWidth: '70%' }}>
              <Row>
                <Col>
                  <H1
                    style={{
                      fontFamily: 'PoppinsSemiBold',
                      color: '#fff',
                      fontSize: 32,
                    }}
                  >
                    {movie.getTitle()}
                  </H1>
                </Col>
              </Row>
              <Genres genres={movie.getGenres(true, 3)} />
              <Row style={{ alignItems: 'center' }}>
                <Col style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon
                    type="SimpleLineIcons"
                    name="calendar"
                    style={{ color: '#fff' }}
                  />
                  <Text style={{ color: '#fff' }}>
                    {formatDate(movie.getReleaseDate())}
                  </Text>
                </Col>
                <Col style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon
                    type="EvilIcons"
                    name="clock"
                    style={{ color: '#fff' }}
                  />
                  <Text style={{ color: '#fff' }}>{movie.getRuntime()}</Text>
                </Col>
              </Row>
            </Content>
          </ImageBackground>
        </View>
      </Container>
    )
  }
}
