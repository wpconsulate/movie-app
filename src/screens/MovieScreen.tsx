import React, { Component } from 'react'
import {
  Button,
  Icon,
  StyleProvider,
  Container,
  Header,
  Content,
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
import {
  ActivityIndicator,
  ImageBackground,
  View,
  ScrollView,
} from 'react-native'
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
        <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
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
                  width: '100%',
                  height: '100%',
                }}
              />
            </ImageBackground>
          </View>
          <View
            style={{
              paddingHorizontal: 15,
              position: 'absolute',
              top: 100,
              width: '100%',
            }}
          >
            <View style={{ flex: 1, marginTop: 70 }}>
              <Button
                transparent
                style={{ width: 85, flex: 1, alignSelf: 'center' }}
              >
                <SvgUri
                  source={require('../../assets/icons/play-button.svg')}
                  width={85}
                  height={85}
                />
              </Button>
            </View>
            <View
              style={{ maxWidth: '75%', marginTop: 70, flexDirection: 'row' }}
            >
              <H1
                style={{
                  fontFamily: 'PoppinsSemiBold',
                  color: '#fff',
                  fontSize: 32,
                  padding: 5,
                  lineHeight: 50,
                  flex: 1,
                  flexWrap: 'wrap',
                }}
              >
                {movie.getTitle()}
              </H1>
            </View>
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
              <Genres genres={movie.getGenres(true, 3)} />
            </View>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                zIndex: 1,
                marginTop: 20,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ marginHorizontal: 5 }}>
                  <Icon
                    type="SimpleLineIcons"
                    name="calendar"
                    style={{ color: '#fff' }}
                  />
                </View>
                <Text
                  style={{ color: '#fff', marginHorizontal: 5, fontSize: 12 }}
                >
                  {formatDate(movie.getReleaseDate())}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginLeft: 10,
                }}
              >
                <View style={{ marginHorizontal: 5 }}>
                  <Icon
                    type="EvilIcons"
                    name="clock"
                    style={{ color: '#fff' }}
                  />
                </View>
                <Text
                  style={{ color: '#fff', marginHorizontal: 5, fontSize: 12 }}
                >
                  {movie.getRuntime()}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 40,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'PoppinsMedium',
                  marginBottom: 10,
                }}
              >
                Storyline
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'PoppinsLight',
                  fontSize: 13,
                }}
              >
                {movie.getOverview()}
              </Text>
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}
