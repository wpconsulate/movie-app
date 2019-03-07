import React, { Component } from 'react'
import RootStack from './Navigation'
import { createAppContainer } from 'react-navigation'
import * as Expo from 'expo'
const AppContainer = createAppContainer(RootStack)
import Config from './Config'
import * as firebase from 'firebase'
import { Root } from 'native-base'

interface StateInterface {
  fontLoaded: boolean
}
interface PropsInterface {}

class App extends Component<PropsInterface, StateInterface> {
  constructor(props: PropsInterface) {
    super(props)
    const config = {
      apiKey: Config.FIREBASE_API_KEY,
      authDomain: Config.FIREBASE_AUTH_DOMAIN,
      databaseURL: Config.FIREBASE_DATABASE_URL,
      projectId: Config.FIREBASE_PROJECT_ID,
      storageBucket: Config.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: Config.FIREBASE_MESSAGE_SENDER_ID,
    }
    firebase.initializeApp(config)
    this.state = {
      fontLoaded: false,
    }
  }

  async componentWillMount() {
    try {
      await Expo.Font.loadAsync({
        Poppins: require('../assets/fonts/Poppins/Regular.ttf'),
        PoppinsBold: require('../assets/fonts/Poppins/Bold.ttf'),
        PoppinsLight: require('../assets/fonts/Poppins/Light.ttf'),
        PoppinsMedium: require('../assets/fonts/Poppins/Medium.ttf'),
        PoppinsSemiBold: require('../assets/fonts/Poppins/SemiBold.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      })
      this.setState({ fontLoaded: true })
    } catch (error) {
      console.error(error)
    }
  }
  render() {
    if (!this.state.fontLoaded) {
      return <Expo.AppLoading />
    }
    return (
      <Root>
        <AppContainer />
      </Root>
    )
  }
}

export default App
