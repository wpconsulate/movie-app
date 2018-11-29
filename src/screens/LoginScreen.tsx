import React, { Component } from 'react'
import {
  Button,
  Icon,
  Container,
  Text,
  Body,
  Header,
  StyleProvider,
  Row,
  Col,
} from 'native-base'
import Firebase from 'firebase'
import getTheme from '../native-base-theme/components'
import mmdb from '../native-base-theme/variables/mmdb'
import { NavigationScreenProps } from 'react-navigation'
import SvgUri from 'react-native-svg-uri'
interface IState {
  error: string
  password: string
  email: string
  isLoaded: boolean
}
interface IProps {}
class LoginScreen extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      headerTransparent: true,
      headerBackgroundTransitionPreset: 'fade',
      headerLeft: (
        <StyleProvider style={getTheme(mmdb)}>
          <Button onPress={() => navigation.navigate('Home')} transparent>
            <Icon name="close" style={{ color: '#fff' }} />
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
    }
  }
  constructor(props: IProps) {
    super(props)
    const config = {
      apiKey: 'AIzaSyBzJnfVx8xNOFa2RVXJHc3TgBPO4vtmJSE',
      authDomain: 'movie-app-73c3a.firebaseapp.com',
      databaseURL: 'https://movie-app-73c3a.firebaseio.com',
      projectId: 'movie-app-73c3a',
      storageBucket: 'movie-app-73c3a.appspot.com',
      messagingSenderId: '852865426325',
    }
    Firebase.initializeApp(config)
    this.state = {
      error: '',
      password: '',
      email: '',
      isLoaded: false,
    }
  }

  onLoginPress() {
    const { password, email } = this.state

    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: '', isLoaded: true })
        console.log('Signed in')
      })
      .catch(() => {
        this.setState({ error: 'Authentication Failed', isLoaded: false })
        console.error('Unable to sign in.')
      })
  }

  onSignupPress() {
    const { password, email } = this.state
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: '', isLoaded: true })
        console.log('WORKS')
      })
      .catch(() => {
        this.setState({ error: 'Authentication Failed', isLoaded: false })
        console.log('FAILED')
      })
  }

  render() {
    return (
      <Container>
        {/* <Header transparent></Header> */}
        <SvgUri
          source={require('../../assets/red-blue-abstract.svg')}
          width="100%"
          height={85}
        />
        <Body style={{ marginTop: 50 }}>
          <Row>
            <Col>
              <Text>Login</Text>
            </Col>
            <Col>
              <Text>Sign in to your account</Text>
            </Col>
          </Row>
        </Body>
      </Container>
    )
  }
}

export default LoginScreen
