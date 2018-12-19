import React, { Component } from 'react'
import {
  Button,
  Icon,
  StyleProvider,
  Container,
  Content,
  H1,
  Text,
  Header,
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
import { PlayButton, Genres, Slider } from '../components'
import {
  ActivityIndicator,
  ImageBackground,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Image,
} from 'react-native'
import { LinearGradient } from 'expo'

import { formatDate } from '../lib'
import { IImage } from '../api/Movie/Interfaces'

interface IProps {
  navigation?: NavigationScreenProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >
}

interface IState {
  movie: Movie | null
  isLoaded: boolean
  images: Array<IImage>
  menuOpen: boolean
  menuOpacity: number
}
interface IStyle {
  playButtonView: ViewStyle
  titleView: ViewStyle
  title: TextStyle
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
      images: null,
      menuOpen: false,
      menuOpacity: null,
    }
  }

  async componentDidMount() {
    const id = await this.props.navigation.getParam('movieId', 181808) // Star Wars: The Last Jedi
    const movie = await this.movies.findMovieById(parseInt(id))
    const images = await movie.getImages(5)
    this.setState({
      movie,
      images,
      isLoaded: true,
      menuOpen: false,
      menuOpacity: 0,
    })
  }

  render() {
    const { movie, isLoaded, images, menuOpen, menuOpacity } = this.state

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
        <Header transparent translucent iosBarStyle="light-content" noShadow />
        <Content style={{ flex: 1, paddingHorizontal: 15 }}>
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
          <PlayContainer />
          <Title title={movie.getTitle()} />
          <GenreContainer genres={movie.getGenres(true, 3)} />
          <ReleaseDateRuntime
            date={formatDate(movie.getReleaseDate())}
            time={movie.getRuntime()}
          />
          <Storyline content={movie.getOverview()} />
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              flexWrap: 'wrap',
              marginTop: 40,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontFamily: 'PoppinsMedium',
                marginBottom: 10,
                width: '100%',
              }}
            >
              Photos
            </Text>

            <Slider images={images} />
            <TouchableOpacity
              disabled={menuOpen}
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                height: 60,
                width: 60,
                top: 100,
              }}
            >
              <Image
                style={{
                  opacity: menuOpacity,
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                }}
                source={require('../../assets/icons/addWatchButton.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={menuOpen}
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                height: 60,
                width: 60,
                top: 170,
              }}
            >
              <Image
                style={{
                  opacity: menuOpacity,
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                }}
                source={require('../../assets/icons/thumbsUpMovieButton.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={menuOpen}
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                height: 60,
                width: 60,
                top: 240,
              }}
            >
              <Image
                style={{
                  opacity: menuOpacity,
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                }}
                source={require('../../assets/icons/shareButton.png')}
              />
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    )
  }
}

function ReleaseDateRuntime(props: any) {
  return (
    <View
      style={{
        alignContent: 'center',
        flexDirection: 'row',
        flex: 1,
        marginTop: 40,
      }}
    >
      <ReleaseDate date={props.date} />
      <Runtime time={props.time} />
    </View>
  )
}

function ReleaseDate(props: any) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}
    >
      <View style={{ marginHorizontal: 5 }}>
        <Icon
          type="SimpleLineIcons"
          name="calendar"
          style={{ color: '#fff' }}
        />
      </View>
      <Text style={{ color: '#fff', marginHorizontal: 5, fontSize: 12 }}>
        {props.date}
      </Text>
    </View>
  )
}

function Runtime(props: any) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginLeft: 10,
      }}
    >
      <View style={{ marginHorizontal: 5 }}>
        <Icon type="EvilIcons" name="clock" style={{ color: '#fff' }} />
      </View>
      <Text style={{ color: '#fff', marginHorizontal: 5, fontSize: 12 }}>
        {props.time}
      </Text>
    </View>
  )
}

function Storyline(props: any) {
  return (
    <View
      style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap', marginTop: 40 }}
    >
      <Text
        style={{
          color: 'white',
          fontFamily: 'PoppinsMedium',
          marginBottom: 10,
          width: '100%',
        }}
      >
        Storyline
      </Text>
      <Text
        style={{
          color: 'white',
          fontFamily: 'PoppinsLight',
          fontSize: 13,
          width: '100%',
        }}
      >
        {props.content}
      </Text>
    </View>
  )
}

function PlayContainer() {
  return (
    <View style={styles.playButtonView}>
      <PlayButton />
    </View>
  )
}

function Title(props: any) {
  return (
    <View style={styles.titleView}>
      <H1 style={styles.title}>{props.title}</H1>
    </View>
  )
}

function GenreContainer(props: any) {
  return (
    <View style={{ marginTop: 20, flexDirection: 'row' }}>
      <Genres genres={props.genres} />
    </View>
  )
}

const styles = StyleSheet.create<IStyle>({
  playButtonView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 80,
  },
  titleView: {
    maxWidth: 250,
    marginTop: 50,
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'PoppinsSemiBold',
    color: '#fff',
    fontSize: 32,
    padding: 5,
    lineHeight: 50,
    flex: 1,
    flexWrap: 'wrap',
  },
})
