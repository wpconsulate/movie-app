import React, { Component } from 'react'
import RootStack from './Navigation'
import { createAppContainer } from 'react-navigation'
import * as Expo from 'expo'
const AppContainer = createAppContainer(RootStack)

import { Root } from 'native-base'

interface StateInterface {
  fontLoaded: boolean
}
interface PropsInterface { }

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
