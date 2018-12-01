import { createStackNavigator } from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SearchScreen from './screens/SearchScreen'
import { Constants } from 'expo'

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Search: SearchScreen,
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      headerStyle: {
        marginTop: Constants.statusBarHeight,
      },
      headerTransparent: true,
    },
  }
)

export default RootStack
