import * as Expo from 'expo'
import * as firebase from 'firebase'
import { Root } from 'native-base'
import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation'
import registerPushNotifications from './src/helpers/registerPushNotification'
import getLocation from './src/helpers/getLocation'
import Config from './src/Config'
import RootStack from './src/Navigation'

import UserStore from './src/stores/UserStore'
import { AppState } from 'react-native'

const config = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  databaseURL: Config.FIREBASE_DATABASE_URL,
  projectId: Config.FIREBASE_PROJECT_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Config.FIREBASE_MESSAGE_SENDER_ID
}
firebase.initializeApp(config)
export const firebaseApp = firebase.app()
const AppContainer = createAppContainer(RootStack)

interface StateInterface {
  fontLoaded: boolean
  isReady: boolean
  appState: any
}
// tslint:disable-next-line: no-empty-interface
interface PropsInterface {}

class App extends Component<PropsInterface, StateInterface> {
  constructor(props: PropsInterface) {
    super(props)
    this.state = {
      fontLoaded: false,
      isReady: false,
      appState: AppState.currentState
    }
  }

  async _cacheResourcesAsync(): Promise<any> {
    const images = [
      require('./assets/header.png'),
      require('./assets/red-blob.svg')
    ]

    const cacheImages = images.map(image => {
      return Expo.Asset.fromModule(image).downloadAsync()
    })
    return Promise.all(cacheImages)
  }

  componentDidMount() {
    registerPushNotifications()
  }

  handleAppStateChange = (nextAppState: any) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      getLocation()
    }
    this.setState({ appState: nextAppState })
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
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
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          UserStore.setIsLoggedIn(true)
        }
      })
      AppState.addEventListener('change', this.handleAppStateChange)
      this.setState({ fontLoaded: true })
    } catch (error) {
      console.error(error)
    }
  }
  render() {
    if (!this.state.fontLoaded) {
      return (
        <Expo.AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }
    return (
      <Root>
        <AppContainer />
      </Root>
    )
  }
}

export default App
