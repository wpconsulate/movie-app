import React, { Component } from 'react'
import {
  Button,
  Icon,
  StyleProvider,
  Container,
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
import { Genres, Slider } from '../components'
import { ActivityIndicator, ImageBackground, View, Image, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo'
import SvgUri from 'react-native-svg-uri'
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

  async componentWillMount() {
    const id = await this.props.navigation.getParam('movieId', 181808) // Star Wars: The Last Jedi
    const movie = await this.movies.findMovieById(parseInt(id))
    const images = await movie.getImages(5)
    console.log(images)
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
        }}>      
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

              {/* side menu that changes the opacity of the 3 buttons - would like to change
                them to animated */}
              <TouchableOpacity  onPress={() => {
                    if(this.state.menuOpacity == 0 ){
                      this.setState({ menuOpacity: 1, menuOpen: false})
                    }else {
                      this.setState({ menuOpacity: 0, menuOpen: true})
                    }}}
                    style={{ top: -100, }}
                    >
                 <Image 
                 style={{ 
                  
                  height: 60, 
                  width: 30 ,
                  borderTopLeftRadius:  10,
                  borderBottomLeftRadius: 10,                     
                  alignSelf: 'flex-end',
                }}
                
                 source={require('../../assets/icons/SideBar.png')}
                 />                 
              </TouchableOpacity>

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
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'PoppinsMedium',
                  marginBottom: 10,
                }}
              >
                Photos
              </Text>
            </View>
            <Slider images={images} />
            <TouchableOpacity
            disabled={menuOpen}
            style={{                   
              alignSelf: 'center',
              justifyContent:'center',
              alignItems: 'center',
              position:"absolute",
              height: 60, 
              width: 60 , 
              top:100,
              }}>
                 <Image 
                 style={{
                  opacity: menuOpacity,
                  height: 60, 
                  width: 60 , 
                  borderRadius: 30,                                 
                }}
                 source={require('../../assets/icons/addWatchButton.png')}
                 />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={menuOpen}
            style={{                   
              alignSelf: 'center',
              justifyContent:'center',
              alignItems: 'center',
              position:"absolute",
              height: 60, 
              width: 60 , 
              top:170,
              }}>
                 <Image 
                 style={{
                  opacity: menuOpacity,
                  height: 60, 
                  width: 60 , 
                  borderRadius: 30,                                 
                }}
                 source={require('../../assets/icons/thumbsUpMovieButton.png')}
                 />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={menuOpen}
            style={{                   
              alignSelf: 'center',
              justifyContent:'center',
              alignItems: 'center',
              position:"absolute",
              height: 60, 
              width: 60 , 
              top:240,
              }}>
                 <Image 
                 style={{
                  opacity: menuOpacity,
                  height: 60, 
                  width: 60 , 
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