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
import { ActivityIndicator, ImageBackground, View, TouchableOpacity, Image } from 'react-native'
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
      menuOpen: false,
      menuOpacity: 0,
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


  componentWillUnmount(){
    this.setState({ isLoaded: false, menuOpacity: 0 })
  }



  render() {
    const { movie, isLoaded, menuOpen, menuOpacity } = this.state

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
          flex: 1,
          backgroundColor: '#12152D',        
        }}
      >       
        <View style={{ height: mmdb.isIphoneX ? '55%' : '55%'}}>
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
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
              }}
            />
            <Header transparent />
            <View style={{ width: '100%', marginTop: 50, flexDirection: "row" , flex: 1}}>
              <Button
                transparent
                style={{ width: 85, height: 85,  alignSelf: 'flex-start', marginLeft: 'auto', marginRight: 'auto' }}
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
                    }}}>
                 <Image 
                 style={{ 
                  height: 60, 
                  width: 30 ,
                  borderTopLeftRadius:  10,
                  borderBottomLeftRadius: 10,                     
                  alignSelf: 'center',
                }}
                
                 source={require('../../assets/icons/SideBar.png')}
                 />                 
              </TouchableOpacity>

            </View>
            <Content style={{ maxWidth: '70%', marginTop: 50,}}>
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

          {/* 3 Menu Buttons */}
          <TouchableOpacity
            disabled={menuOpen}
            style={{                   
              left: 0, 
              top: -150,
            }}>
                 <Image 
                 style={{
                  opacity: menuOpacity,                  
                  height: 60, 
                  width: 60 ,
                  borderRadius: 30,    
                  alignSelf: 'center',
                  justifyContent: 'center',                  
                }}
                 source={require('../../assets/icons/addWatchButton.png')}
                 />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={menuOpen}
            style={{                   
              left: 0, 
              top: -150,
            }}>
                 <Image 
                 style={{
                  opacity: menuOpacity,
                  height: 60, 
                  width: 60 ,
                  borderRadius: 30,    
                  alignSelf: 'center',
                  justifyContent: 'center',                  
                }}
                 source={require('../../assets/icons/thumbsUpMovieButton.png')}
                 />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={menuOpen}
            style={{                   
              left: 0, 
              top: -150,
            }}>
                 <Image 
                 style={{
                  opacity: menuOpacity,
                  height: 60, 
                  width: 60 ,
                  borderRadius: 30,    
                  alignSelf: 'center',
                  justifyContent: 'center',                  
                }}
                 source={require('../../assets/icons/shareButton.png')}
                 />
          </TouchableOpacity>



        </View>
     

      
      </Container>
    )
  }
}
