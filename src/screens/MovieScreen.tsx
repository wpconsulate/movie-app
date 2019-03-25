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
  Row,
  Col
} from 'native-base'
import {
  NavigationScreenProp,
  NavigationRoute,
  NavigationParams
} from 'react-navigation'
import getTheme from '../native-base-theme/components'
import mmdb from '../native-base-theme/variables/mmdb'
import { NavigationScreenProps } from 'react-navigation'
import { SetOfMovies, Movie } from '../api'
import { PlayButton, GenreContainer, Slider, MovieSidebar } from '../components'
import {
  ActivityIndicator,
  ImageBackground,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Linking,
  AccessibilityInfo
} from 'react-native'
import LikeSlider from '../components/LikeSlider'

import { LinearGradient, Location } from 'expo'
import { formatDate } from '../lib'
import { IImage } from '../api/Movie/Interfaces'
import Review from '../components/ReviewTab'
import { observer } from 'mobx-react'
import MovieStore from '../stores/MovieStore'
import MessageStore from '../stores/MessageStore'
import { Message } from '../stores/MessageStore'
import { Authentication } from '../api'
import { SetOfUsers } from '../api/Collection'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'
import Likes from '../api/Collection/Likes'
import Cast from '../api/Cast/Cast'
import DropdownAlert from 'react-native-dropdownalert'
import { database } from 'firebase'
import getLocation from '../helpers/getLocation'
import axios from 'axios'
import cinemaHeaders from '../helpers/cinemasHeader'
import Config from '../Config'
import CinemasSlider from '../components/CinemasSlider'
import moment from 'moment'
import _ from 'underscore'
interface IProps {
  navigation?: NavigationScreenProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >
}

interface IState {
  movie: Movie
  isLoaded: boolean
  wantsToRev: boolean
  images: Array<IImage>
  castImages: Array<IImage>
  showMenu: boolean
  isReviewing: boolean
  critiqueReviewList: []
  userReviewList: Array<any>
  isAccessible: boolean
  currentUid: string
  currentUsername: string
  likeCount: number
  messages: Array<Message>
  mmdbRating: number
  imdbRating: number
  showStoryline: boolean
  nearbyCinemas: Array<any> | undefined
}
interface IStyle {
  playButtonView: ViewStyle
  titleView: ViewStyle
  title: TextStyle
}

@observer
export default class MovieScreen extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      headerBackgroundTransitionPreset: 'fade',
      headerLeft: (
        <StyleProvider style={getTheme(mmdb)}>
          <Button
            onPress={() => navigation.goBack()}
            transparent={true}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            accessibilityHint="Double tap to go back to the previous screen."
          >
            <Icon
              type="Feather"
              name="chevron-left"
              style={{ color: '#fff' }}
            />
          </Button>
        </StyleProvider>
      ),
      headerTransparent: true
    }
  }
  private movies = new SetOfMovies()
  private auth = new Authentication()
  likes: Likes
  private dropdown: any
  constructor(props: IProps) {
    super(props)
    this.state = {
      castImages: [],
      critiqueReviewList: [],
      currentUid: '',
      currentUsername: '',
      images: [],
      isAccessible: false,
      isLoaded: false,
      isReviewing: false,
      likeCount: 0,
      movie: new Movie({}),
      showMenu: false,
      userReviewList: [],
      wantsToRev: false,
      messages: [],
      mmdbRating: 0,
      imdbRating: 0,
      showStoryline: false,
      nearbyCinemas: undefined
    }
    this.likes = new Likes()
  }

  onTrailerPlayPress = async () => {
    const { movie } = this.state
    if (movie) {
      const trailer = await movie.getTrailer(0)
      Linking.openURL(`https://www.youtube.com/embed/${trailer[0].key}`)
    }
  }

  onStorylinePress = () => {
    this.setState({
      showStoryline: !this.state.showStoryline
    })
  }

  async componentWillMount() {
    const { navigation } = this.props
    try {
      let likeCount = 0
      const id = await (navigation as any).getParam('movieId', 181808) // Star Wars: The Last Jedi
      // tslint:disable-next-line: radix
      const movie = (await this.movies.findMovieById(parseInt(id))) as Movie
      const images = await movie.getImages(5, { type: 'backdrops' })
      const casts = (await movie.getCasts()) as Array<Cast>
      const isAccessible = await AccessibilityInfo.fetch()
      const castImages = new Array<IImage>()
      try {
        const likes = await this.likes.getLikes(movie.getId())
        likeCount = likes.count
      } catch (err) {
        // No likes for the movie
      }

      let Uid = 'test'
      let username = 'test'
      if (this.auth.isLoggedIn()) {
        Uid = (this.auth.getCurrentUser() as firebase.User).uid
        const CurrUSerDetails = await new SetOfUsers().getById(Uid)
        username = CurrUSerDetails.name
      }
      const mmdbRating = await movie.getMMDBRating()
      const imdbRating = movie.getRating()
      const critReview = await movie.getReview()
      casts.forEach(cast => {
        castImages.push({ url: cast.getImage() })
      })
      // const location = (await getLocation()) as Location.LocationData
      // try {
      //   const cinemasResponse = await axios.get(
      //     `${Config.CINEMAS_API_BASE_URL}cinemasNearby/?n=10`,
      //     {
      //       headers: {
      //         ...cinemaHeaders(
      //           location.coords.latitude.toPrecision(8),
      //           location.coords.longitude.toPrecision(8)
      //         )
      //       }
      //     }
      //   )
      //   if (cinemasResponse.data.cinemas && cinemasResponse.data.cinemas[0]) {
      //     const cinemaShowTimes = await axios.get(
      //       `${Config.CINEMAS_API_BASE_URL}cinemaShowTimes/?cinema_id=${
      //         cinemasResponse.data.cinemas[0].cinema_id
      //       }&date=${moment().format('YYYY-MM-DD')}`,
      //       {
      //         headers: {
      //           ...cinemaHeaders(
      //             location.coords.latitude.toPrecision(8),
      //             location.coords.longitude.toPrecision(8)
      //           )
      //         }
      //       }
      //     )
      //     if (cinemaShowTimes.data.films) {
      //       const filmExists = cinemaShowTimes.data.films.filter(
      //         (film: any) => film.film_name === movie.getTitle()
      //       )
      //       if (filmExists && filmExists.length > 0) {
      //         this.setState({
      //           nearbyCinemas: cinemasResponse.data.cinemas
      //         })
      //       } else {
      //         this.setState({ nearbyCinemas: undefined })
      //       }
      //     }
      //   }
      // } catch (err) {
      //   console.log(
      //     `Error with cinemas API: MovieScreen (242). You've likely exceeded your API usage.`
      //   )
      // }
      this.setState({
        castImages,
        critiqueReviewList: critReview,
        currentUid: Uid,
        currentUsername: username,
        images,
        isAccessible,
        isLoaded: true,
        isReviewing: false,
        movie,
        likeCount,
        imdbRating,
        mmdbRating
      })
      database()
        .ref(`review/${id}`)
        .on('value', snapshot => {
          if (snapshot) {
            const reviews: Array<any> = []
            snapshot.forEach(snap => {
              const reviewID = snap.key
              const element = snap.val()
              let likes = []
              if (element.likes) {
                likes = Object.keys(element.likes).map(key => {
                  return element.likes[key]
                })
              }

              reviews.push({
                author: element.author,
                content: element.content,
                createdAt: element.createdAt,
                id: reviewID as string,
                rating: element.rating,
                likes
              })
            })
            this.setState({
              userReviewList: _.sortBy(reviews, 'createdAt').reverse()
            })
          }
        })
      if (MessageStore.message) {
        this.dropdown.alertWithType(
          MessageStore.message.type,
          MessageStore.message.type.toUpperCase(),
          MessageStore.message.message
        )
      }
    } catch (err) {
      console.log('MovieScreen: 291', err)
    }
  }

  render() {
    const sidebarIconsMargin = 2
    const {
      movie,
      isLoaded,
      images,
      castImages,
      userReviewList,
      isAccessible,
      currentUid,
      likeCount,
      mmdbRating,
      imdbRating,
      showStoryline,
      nearbyCinemas
    } = this.state
    const navigation: any = this.props.navigation
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
          backgroundColor: '#12152D'
        }}
      >
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
        <Header
          transparent={true}
          translucent={true}
          noShadow={true}
          iosBarStyle="light-content"
          style={{
            position: 'absolute',
            zIndex: -2
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#12152D',
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
            height: 100,
            justifyContent: 'center',
            position: 'absolute',
            right: 0,
            shadowColor: 'rgba(0, 0, 0, 0.32)',
            shadowOffset: {
              height: 2,
              width: -5
            },
            shadowOpacity: 10,
            top: '15%',
            width: 35,
            zIndex: 15
          }}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Sidebar"
          accessibilityHint="Double tap to open a modal where you can add the movie to your watchlist, share with your friends and like or unlike it."
          onPress={() => {
            if (MovieStore.showMenu) {
              MovieStore.setShowMenu(false)
            } else {
              MovieStore.setShowMenu(true)
            }
          }}
        >
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center'
            }}
          >
            <FontAwesomeIcons
              name="circle"
              size={10}
              color="white"
              style={{
                marginBottom: sidebarIconsMargin,
                marginTop: sidebarIconsMargin
              }}
            />
            <FontAwesomeIcons
              name="circle"
              size={10}
              color="white"
              style={{
                marginBottom: sidebarIconsMargin,
                marginTop: sidebarIconsMargin
              }}
            />
            <FontAwesomeIcons
              name="circle"
              size={10}
              color="white"
              style={{
                marginBottom: sidebarIconsMargin,
                marginTop: sidebarIconsMargin
              }}
            />
          </View>
        </TouchableOpacity>
        <MovieSidebar movie={movie} userid={currentUid} likes={this.likes} />
        <Content style={{ flex: 1, paddingBottom: 20 }}>
          <Backdrop uri={movie.getBackdrop()} />
          <View style={{ flex: 1, paddingHorizontal: 15, marginTop: 30 }}>
            <PlayContainer onPress={this.onTrailerPlayPress} />
            <Title title={movie.getTitle()} />
            <GenreContainer genres={movie.getGenres(true, 3)} />
            <ReleaseDateRuntime
              date={formatDate(movie.getReleaseDate())}
              time={isAccessible ? movie.getRuntime(true) : movie.getRuntime()}
              likes={likeCount}
            />
            <Ratings mmdb={mmdbRating} imdb={imdbRating} />
            <Storyline
              content={movie.getOverview()}
              onPress={this.onStorylinePress}
              show={showStoryline}
            />
            {nearbyCinemas && (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginTop: 40
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'PoppinsMedium',
                    marginBottom: 10,
                    width: '100%'
                  }}
                >
                  Nearby Cinemas
                </Text>

                <CinemasSlider data={nearbyCinemas} />
              </View>
            )}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: 40
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'PoppinsMedium',
                  marginBottom: 10,
                  width: '100%'
                }}
              >
                Photos
              </Text>

              <Slider images={images} borderRadius={9} />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: 40
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'PoppinsMedium',
                  marginBottom: 10,
                  width: '100%'
                }}
              >
                Cast
              </Text>
              <LikeSlider
                images={castImages}
                userid={currentUid}
                borderRadius={37.5}
                height={75}
                width={75}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                flexWrap: 'wrap',
                marginTop: 40
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'PoppinsMedium',
                  marginBottom: 10,
                  width: '100%'
                }}
              >
                Review(s)
              </Text>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  alignSelf: 'flex-end',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: -10
                }}
                onPress={() => {
                  navigation.push('Review', {
                    movie: movie,
                    userId: this.auth.getCurrentUserUid()
                  })
                }}
              >
                <View
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#E10F0F',
                    borderRadius: 40 / 2,
                    height: 40,
                    justifyContent: 'center',
                    width: 40
                  }}
                >
                  <MaterialIcons name="add" color="#12152D" size={38} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 40 }}>
              {userReviewList.map((element: any) => {
                return (
                  <Review
                    key={element.id}
                    review={element.content}
                    date={element.createdAt}
                    rating={element.rating}
                    userId={element.id}
                    hideMovieTitle
                    movieId={movie.getId()}
                    likes={element.likes ? element.likes : undefined}
                  />
                )
              })}
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}
function Backdrop(props: any) {
  return (
    <View
      style={{
        height: mmdb.isIphoneX ? '55%' : '55%',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        width: mmdb.deviceWidth
      }}
    >
      <ImageBackground
        source={{
          uri: props.uri
        }}
        style={{
          height: '100%',
          width: '100%'
        }}
      >
        <LinearGradient
          colors={['rgba(18, 21, 45, 100)', 'rgba(18, 21, 45, 0.04)']}
          start={[0.5, 1]}
          end={[0.5, 0]}
          style={{
            height: '100%',
            width: '100%'
          }}
        />
      </ImageBackground>
    </View>
  )
}

function ReleaseDateRuntime(props: any) {
  return (
    <View
      style={{
        alignContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginTop: 40
      }}
    >
      <ReleaseDate date={props.date} />
      <Runtime time={props.time} />
      <MovieLikes likes={props.likes} />
    </View>
  )
}

function ReleaseDate(props: any) {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <View style={{ marginHorizontal: 5 }}>
        <Icon type="EvilIcons" name="calendar" style={{ color: '#fff' }} />
      </View>
      <Text
        style={{ color: '#fff', marginHorizontal: 5, fontSize: 12 }}
        accessible={true}
        accessibilityHint={`The release date of this movie was the ${
          props.data
        }`}
      >
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10
      }}
    >
      <View style={{ marginHorizontal: 5 }}>
        <Icon type="EvilIcons" name="clock" style={{ color: '#fff' }} />
      </View>
      <Text
        style={{ color: '#fff', marginHorizontal: 5, fontSize: 12 }}
        accessible={true}
        accessibilityRole="text"
        accessibilityLabel={`Total runtime is ${props.time}`}
      >
        {props.time}
      </Text>
    </View>
  )
}

function MovieLikes(props: any) {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10
      }}
    >
      <View style={{ marginHorizontal: 5 }}>
        <Icon type="EvilIcons" name="arrow-up" style={{ color: '#fff' }} />
      </View>
      <Text
        style={{ color: '#fff', marginHorizontal: 5, fontSize: 12 }}
        accessible={true}
        accessibilityRole="text"
        accessibilityLabel={`Total Likes are ${props.likes}`}
      >
        {props.likes}
      </Text>
    </View>
  )
}

function Storyline(props: any) {
  return (
    <View
      style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap', marginTop: 35 }}
    >
      <Text
        style={{
          color: 'white',
          fontFamily: 'PoppinsMedium',
          marginBottom: 10,
          width: '100%'
        }}
      >
        Storyline
      </Text>
      <Text
        style={{
          color: 'white',
          fontFamily: 'PoppinsLight',
          fontSize: 15,
          width: '100%'
        }}
      >
        {props.content.length > 150 && !props.show
          ? props.content.substr(0, 150) + '...'
          : props.content}
      </Text>
      {props.content.length > 150 ? (
        <TouchableOpacity onPress={props.onPress} style={{ marginTop: 10 }}>
          <Text
            style={{
              color: '#E10F0F',
              fontFamily: 'Poppins',
              fontSize: 15
            }}
          >
            Read {props.show ? `less` : `more`}
          </Text>
        </TouchableOpacity>
      ) : (
        undefined
      )}
    </View>
  )
}

function PlayContainer(props: any) {
  return (
    <View style={styles.playButtonView}>
      <PlayButton onPress={props.onPress} />
    </View>
  )
}
function renderStars(stars: number, size: number, color: string, style?: any) {
  const starsArray = []
  for (let i = 0; i < 5; i++) {
    if (stars <= i) {
      starsArray.push(
        <FontAwesomeIcons
          key={i}
          name="star-o"
          size={size}
          color={color}
          style={style}
        />
      )
    } else {
      starsArray.push(
        <FontAwesomeIcons
          key={i}
          name="star"
          size={size}
          color={color}
          style={style}
        />
      )
    }
  }
  return starsArray
}
export function Ratings(props: any) {
  return (
    <Row style={{ justifyContent: 'space-between', marginTop: 20 }}>
      <Col>
        <Row style={{ marginBottom: 2 }}>
          {renderStars(props.mmdb, 28, '#E10F0F', { marginRight: 5 })}
        </Row>
        <Row>
          <Text
            style={{
              fontFamily: 'PoppinsBold',
              fontSize: 20,
              color: '#E10F0F'
            }}
          >
            mmdb
          </Text>
        </Row>
      </Col>
      <Col>
        <Row style={{ justifyContent: 'flex-end', marginBottom: 2 }}>
          {renderStars(props.imdb, 18, 'white', { marginLeft: 5 })}
        </Row>
        <Row style={{ justifyContent: 'flex-end' }}>
          <Text
            style={{ fontFamily: 'PoppinsBold', fontSize: 14, color: 'white' }}
          >
            IMDb
          </Text>
        </Row>
      </Col>
    </Row>
  )
}

export function Title(props: any) {
  return (
    <View style={styles.titleView}>
      <H1 style={styles.title}>{props.title}</H1>
    </View>
  )
}

const styles = StyleSheet.create<IStyle>({
  playButtonView: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 80,
    width: '100%'
  },
  title: {
    color: '#fff',
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: 'PoppinsSemiBold',
    fontSize: 38,
    lineHeight: 50,
    padding: 5
  },
  titleView: {
    flexDirection: 'row',
    marginTop: 45,
    maxWidth: 300
  }
})
