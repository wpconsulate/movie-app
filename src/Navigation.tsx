import { createStackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  SearchScreen,
  MovieScreen,
  ProfileScreen,
  ResultsScreen,
} from './screens'

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    Search: SearchScreen,
    Movie: MovieScreen,
    Profile: ProfileScreen,
    Results: ResultsScreen,
  },
  {
    initialRouteName: 'Results',
    navigationOptions: {
      headerStyle: {
        marginTop: Constants.statusBarHeight,
      },
      headerTransparent: true,
    },
  }
)

export default RootStack
