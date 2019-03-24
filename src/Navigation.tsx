import { createStackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import {
  HomeScreen,
  LoginScreen,
  MovieScreen,
  ProfileScreen,
  RegisterScreen,
  ResultsScreen,
  ReviewScreen,
  SearchScreen,
  SettingsScreen,
  QrScreen
} from './screens'

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Movie: MovieScreen,
    Profile: ProfileScreen,
    Register: RegisterScreen,
    Results: ResultsScreen,
    Review: ReviewScreen,
    Search: SearchScreen,
    Settings: SettingsScreen,
    QrScreen: QrScreen
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        marginTop: Constants.statusBarHeight
      },
      headerTransparent: true
    }
  }
)

export default RootStack
