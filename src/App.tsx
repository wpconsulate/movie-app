import React, { Component } from 'react'
import RootStack from './Navigation'
import { createAppContainer } from 'react-navigation'
import * as Expo from 'expo'
const AppContainer = createAppContainer(RootStack)

interface StateInterface {
  fontLoaded: boolean
}
interface PropsInterface {}

class App extends Component<PropsInterface, StateInterface> {
  constructor(props: PropsInterface) {
    super(props)
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
        PoppinsMedium: require('../assets/fonts/Poppins/Medium.ttf')
      })
      this.setState({ fontLoaded: true })
    } catch (error) {
      console.log('Error loading fonts.', error)
    }
  }
  render() {
    if (!this.state.fontLoaded) {
      return <Expo.AppLoading />
    }
    return <AppContainer />
  }
}

export default App
