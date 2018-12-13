import { createStackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  SearchScreen,
  MovieScreen,
} from './screens'

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    Search: SearchScreen,
    Movie: MovieScreen,
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
