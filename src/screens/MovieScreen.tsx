import React, { Component } from 'react'
import {
  Button,
  Icon,
  StyleProvider,
  Container,
  Content,
  H1,
  Text,
  Header
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
import {
  PlayButton,
  GenreContainer,
  Slider,
  MovieSidebar,
  LeaveReview
} from '../components'
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
import { LinearGradient } from 'expo'
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
import Likes from '../api/Collection/Likes';
import Cast from '../api/Cast/Cast'
import DropdownAlert from 'react-native-dropdownalert'
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
  userReviewList: []
  isAccessible: boolean
  currentUid: string
  currentUsername: string
  likeCount: number
  messages: Array<Message>
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
  likes : Likes
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
      messages: []
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

  async componentWillMount() {
    const { navigation } = this.props
    
    const id = await (navigation as any).getParam('movieId', 181808) // Star Wars: The Last Jedi
    // tslint:disable-next-line: radix
    const movie = (await this.movies.findMovieById(parseInt(id))) as Movie
    const images = await movie.getImages(5, { type: 'backdrops' })
    const casts = (await movie.getCasts()) as Array<Cast>
    const isAccessible = await AccessibilityInfo.fetch()
    const errorMessages = MessageStore.errorMessages
    const successMessages = MessageStore.successMessages
    const castImages = new Array<IImage>()
    let likeObj = await this.likes.getLikes(movie.getId())
    let Uid = 'test'
    let username = 'test'

    const currUser = new Authentication()
    if (currUser.isLoggedIn()) {
      Uid = (currUser.getCurrentUser() as firebase.User).uid
      const CurrUSerDetails = await new SetOfUsers().getById(Uid)
      username = CurrUSerDetails.name
    }

    const critReview = await movie.getReview()
    const userReview = await movie.getMMDBReview()

    casts.forEach(cast => {
      castImages.push({ url: cast.getImage() })
    })
    let result;
    if(likeObj == null)
    {
      result = 0;
    } else {
      result = likeObj.count
    }
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
      userReviewList: userReview,
      likeCount: result
    })
    if (MessageStore.message) {
      this.dropdown.alertWithType(
        MessageStore.message.type,
        MessageStore.message.type.toUpperCase(),
        MessageStore.message.message
      )
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
      // critiqueReviewList,
      isAccessible,
      isReviewing,
      currentUid,
      currentUsername,
      likeCount
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
          iosBarStyle="light-content"
          noShadow={true}
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
            <Storyline content={movie.getOverview()} />
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
              <Slider
                images={castImages}
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
                  // this.setState({ isReviewing: !isReviewing })
                  navigation.push('Review', {
                    movie: movie,
                    userId: 'uRl0sszVPNfy5oQGznGuSzunhhB2'
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
                    movieId={movie.getId()}
                    likes={element.likes ? element.likes : 0}
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
        <Icon
          type="SimpleLineIcons"
          name="calendar"
          style={{ color: '#fff' }}
        />
      </View>
      <Text
        style={{ color: '#fff', marginHorizontal: 5, fontSize: 14 }}
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
        {props.content}
      </Text>
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
    fontSize: 40,
    lineHeight: 50,
    padding: 5
  },
  titleView: {
    flexDirection: 'row',
    marginTop: 45,
    maxWidth: 250
  }
})
