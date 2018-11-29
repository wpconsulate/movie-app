import React, { Component } from 'react'
import { Button, Input, Container, Text, Body } from 'native-base'
import Firebase from 'firebase'

interface IState {
  error: string
  password: string
  email: string
  isLoaded: boolean
}
interface IProps {}
class LoginScreen extends Component<IProps, IState> {
  static navigationOptions = {
    title: 'Login',
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
        <Body>
          <Text>Login Screen</Text>
          <Text
            style={{ fontFamily: 'PoppinsBold', color: '#fff', fontSize: 18 }}
          >
            Username/Email
          </Text>
          <Input
            style={{ fontFamily: 'PoppinsBold', color: '#fff', fontSize: 18 }}
            onChangeText={email => this.setState({ email })}
          />
          <Text
            style={{ fontFamily: 'PoppinsBold', color: '#fff', fontSize: 18 }}
          >
            Password
          </Text>
          <Input
            style={{ fontFamily: 'PoppinsBold', color: '#fff', fontSize: 18 }}
            onChangeText={password => this.setState({ password })}
          />
          <Button full light onPress={() => this.onLoginPress()}>
            <Text>Login</Text>
          </Button>

          <Button full light onPress={() => this.onSignupPress()}>
            <Text>Sign up</Text>
          </Button>
        </Body>
      </Container>
    )
  }
}

export default LoginScreen
