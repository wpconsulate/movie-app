import React, { Component } from 'react'
import { Alert, View, Text, Button, ActivityIndicator, Image } from 'react-native'
import {  BarCodeScanner, Permissions } from 'expo'
import { withNavigation } from 'react-navigation'
import { NavigationScreenProps } from 'react-navigation'
import { SetOfMovies } from '../api'
import { Container, Row } from 'native-base';
interface IProps extends NavigationScreenProps {}

interface IState {
    hasCameraPermission: boolean
    filmName: string
    movieId: number
    isLoading: boolean
    findFilm: boolean
    filmURL: string
    filmFound: boolean
}

class QrReader extends Component <IProps, IState> {
    constructor(props: any) {
        super(props)    
        this.state = {
            hasCameraPermission: false,
            filmName: '',
            movieId: 0,
            isLoading: true,
            findFilm: true,
            filmURL: '',
            filmFound: false
        }    
    }

  componentDidMount() {
    this._requestCameraPermission()
    this.setState({ isLoading: false, findFilm: true })
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermission: status === 'granted'
    })
  }
  onPressItem = (movieId: number) => {
    this.props.navigation.push('Movie', { movieId })
  }

   _handleBarCodeRead  =  async qrCode => {
    this.setState({ findFilm: false })
    let movieTitle = ''
    let test
    let poster = ''
    let test2 = ''
    const film = qrCode.data

    if (film !== undefined) {
      movieTitle = await new SetOfMovies().getTitleById(film)
    }

    if (film !== undefined) {
      test = await new SetOfMovies().findMovieById(film)
      test2 = test.title
      poster = test.poster_path
    }

    Alert.alert(
      'Scan successful!',
      JSON.stringify(movieTitle)
    )
    console.log(poster)
    console.log(test2)
    this.setState({ 
      isLoading: false, 
      movieId: film, 
      filmName: movieTitle, 
      filmURL: poster 
    })
  }

  render() {
    const { filmName, movieId, filmFound, hasCameraPermission, isLoading, findFilm, filmURL  } = this.state

    if (isLoading) {
      return (
        <View><ActivityIndicator /></View>
      )
    }

    return (
      <Container style={{ flex: 1, backgroundColor: '#12152D'  }} >
        <Row style={{ alignItems: 'center', justifyContent: 'center' }} >
        {console.log(findFilm)}

        { !findFilm ? <View><Image 
        style={{width: 150, height: 300}}
        source={{ uri: 'http://image.tmdb.org/t/p/w185/' + filmURL }} />
        </View>
        :  (hasCameraPermission === undefined ?
            <Text>Requesting for camera permission</Text> :
            hasCameraPermission === false ?
              <Text>Camera permission is not granted</Text> :
              <BarCodeScanner
                  onBarCodeScanned={this._handleBarCodeRead}
                  style={{ height: 200, width: 200, marginTop: 20 }}
              />
          )
        }

        </Row> 
        <Row style={{ flex: 1, flexDirection: 'column', alignSelf: 'center', justifyContent: 'center' }}>
        { !findFilm && <Button title={'Search Again'} onPress={() => this.setState({ findFilm: !findFilm }) }/>}

        <Text
            style={{
              color: 'white',
              fontFamily: 'PoppinsMedium',
              fontSize: 18,
              marginTop: 10 
            }}
        > 
        {filmName}
        </Text>

        { filmFound &&      
        <Button
          title="GO TO FILM"
          onPress={() => this.onPressItem(movieId)}
        >
          <Text
            style={{
              fontFamily: 'PoppinsMedium',
              color: 'black',
              fontSize: 14,
              fontWeight: 'bold'
            }}
          >
            GO TO FILM
          </Text>
        </Button>
        }
        </Row>
      </Container>
    )
  }
}

export default withNavigation(QrReader);
