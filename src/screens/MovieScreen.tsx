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
import { PlayButton, Genres, Slider, MovieSidebar, LeaveReview } from '../components'
import {
  ActivityIndicator,
  ImageBackground,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Image,
  AccessibilityInfo
} from 'react-native'
import { LinearGradient } from 'expo'
import { formatDate } from '../lib'
import { IImage } from '../api/Movie/Interfaces'
import Review from '../components/ReviewTab'
import { observer } from 'mobx-react'
import MovieStore from '../stores/MovieStore'
import { Authentication } from '../api'
import { SetOfUsers } from '../api/Collection'

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
  castImages: Array<IImage>
  showMenu: boolean
  reviewList: []
  isAccessible: boolean
  currentUid: string
  currentUsername: string
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
      headerTransparent: true,
      headerBackgroundTransitionPreset: 'fade',
      headerLeft: (
        <StyleProvider style={getTheme(mmdb)}>
          <Button onPress={() => navigation.goBack()} transparent
            accessible
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
    }
  }
  private movies = new SetOfMovies()
  constructor(props: IProps) {
    super(props)
    this.state = {
      movie: null,
      isLoaded: false,
      showMenu: false,
      images: null,
      castImages: null,
      reviewList: null,
      isAccessible: false,
      currentUid: 'testUid',
      currentUsername: 'test',
    }
  }

  async componentWillMount() {
    const id = await this.props.navigation.getParam('movieId', 181808) // Star Wars: The Last Jedi
    const movie = await this.movies.findMovieById(parseInt(id))
    const images = await movie.getImages(5, { type: 'backdrops' })
    const casts = await movie.getCasts()
    const isAccessible = await AccessibilityInfo.fetch()
    let castImages = new Array<IImage>()
    let Uid = "testUid"
    let username = 'test'


    let currUser = new Authentication()
    if(currUser.isLoggedIn()){
      Uid = currUser.getCurrentUser().uid
      let CurrUSerDetails = await new SetOfUsers().getById(Uid)
      username = CurrUSerDetails.name
    }


    let review = await movie.getReview()
    casts.forEach(cast => {
      castImages.push({ url: cast.getImage() })
    })
    this.setState({
      movie,
      images,
      isLoaded: true,
      castImages,
      reviewList: review,
      isAccessible,
      currentUid: Uid,
      currentUsername: username,
    })
  }

  render() {
    const {
      movie,
      isLoaded,
      images,
      castImages,
      reviewList,
      isAccessible,
      currentUid,
      currentUsername,
    } = this.state

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
        <Header
          transparent
          translucent
          iosBarStyle="light-content"
          noShadow
          style={{
            position: 'absolute',
            zIndex: -2,
          }}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 0,
            top: '15%',
            height: 100,
            width: 35,
            backgroundColor: '#12152D',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            zIndex: 15,
            justifyContent: 'center',
            shadowColor: 'rgba(0, 0, 0, 0.32)',
            shadowOffset: {
              width: -5,
              height: 2,
            },
            shadowOpacity: 10,
          }}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Sidebar"
          accessibilityHint="Double tap to open a modal where you can add the movie to your watchlist, share with your friends and like or unlike it."
          onPress={() => {
            if (MovieStore.showMenu)
              MovieStore.setShowMenu(false)
            else
              MovieStore.setShowMenu(true)
          }}
        >
          <Image
            style={{
              height: 60,
              width: 30,
              alignSelf: 'center',
            }}
            source={require('../../assets/icons/SideBar.png')}
          />
        </TouchableOpacity>
        <MovieSidebar movie={movie} userid={currentUid} />
        <Content style={{ flex: 1, paddingBottom: 20 }}>

          <Backdrop uri={movie.getBackdrop()} />
          <View style={{ flex: 1, paddingHorizontal: 15, marginTop: 30 }}>
            <PlayContainer />
            <Title title={movie.getTitle()} />
            <GenreContainer genres={movie.getGenres(true, 3)} />
            <ReleaseDateRuntime
              date={formatDate(movie.getReleaseDate())}
              time={isAccessible ? movie.getRuntime(true) : movie.getRuntime()}
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

              <Slider images={images} borderRadius={9} />
            </View>
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
                marginBottom: 30,
                width: '100%',
                fontSize:40,
              }}
            >
              Reviews
            </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                flexWrap: 'wrap',
                marginTop: 40,
              }} >
              <LeaveReview
                username={currentUsername}
                url={"https://vignette.wikia.nocookie.net/leagueoflegends/images/7/7c/Urgot_OriginalCentered.jpg/revision/latest/scale-to-width-down/1215?cb=20180414203655"}
                movieId={movie.getId()}
                userId={currentUid}
              />
            </View>
            {reviewList.map((element: any) => {
            return (
              <Review
                key={element.id}
                url={'something image'}
                review={element.content}
                numberOfDays={2}
                username={element.author}
              />
              )

            })}
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
        width: mmdb.deviceWidth,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <ImageBackground
        source={{
          uri: props.uri,
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
  )
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
      <Text style={{ color: '#fff', marginHorizontal: 5, fontSize: 14 }}
        accessible
        accessibilityHint={`The release date of this movie was the ${props.data}`}
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
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginLeft: 10,
      }}
    >
      <View style={{ marginHorizontal: 5 }}>
        <Icon type="EvilIcons" name="clock" style={{ color: '#fff' }} />
      </View>
      <Text style={{ color: '#fff', marginHorizontal: 5, fontSize: 12 }}
        accessible
        accessibilityRole="text"
        accessibilityLabel={`Total runtime is ${props.time}`}
      >
        {props.time}
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
          width: '100%',
        }}
      >
        Background
      </Text>
      <Text
        style={{
          color: 'white',
          fontFamily: 'PoppinsLight',
          fontSize: 20,
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
    marginTop: 45,
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'PoppinsSemiBold',
    color: '#fff',
    fontSize: 40,
    padding: 5,
    lineHeight: 50,
    flex: 1,
    flexWrap: 'wrap',
  },
})
