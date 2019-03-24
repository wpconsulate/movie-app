import * as Expo from 'expo'
import * as firebase from 'firebase'
import { Root } from 'native-base'
import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation'
import UserStore from './src/stores/UserStore'
import Config from './src/Config'
import RootStack from './src/Navigation'

const config = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  databaseURL: Config.FIREBASE_DATABASE_URL,
  projectId: Config.FIREBASE_PROJECT_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  // tslint:disable-next-line: object-literal-sort-keys
  messagingSenderId: Config.FIREBASE_MESSAGE_SENDER_ID
}
firebase.initializeApp(config)
export const firebaseApp = firebase.app()
const AppContainer = createAppContainer(RootStack)

interface StateInterface {
  fontLoaded: boolean
}
// tslint:disable-next-line: no-empty-interface
interface PropsInterface {}

class App extends Component<PropsInterface, StateInterface> {
  constructor(props: PropsInterface) {
    super(props)
    this.state = {
      fontLoaded: false
    }
  }

  async componentWillMount() {
    try {
      await Expo.Font.loadAsync({
        Poppins: require('./assets/fonts/Poppins/Regular.ttf'),
        PoppinsBold: require('./assets/fonts/Poppins/Bold.ttf'),
        PoppinsLight: require('./assets/fonts/Poppins/Light.ttf'),
        PoppinsMedium: require('./assets/fonts/Poppins/Medium.ttf'),
        PoppinsSemiBold: require('./assets/fonts/Poppins/SemiBold.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
      })
      console.log('user', firebase.auth().currentUser)
      if (firebase.auth().currentUser) {
        UserStore.setIsLoggedIn(true)
      }
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
