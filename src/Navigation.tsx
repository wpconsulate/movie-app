import { createStackNavigator } from "react-navigation";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SearchScreen from "./screens/SearchScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { Constants } from "expo";

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Search: SearchScreen,
    Profile: ProfileScreen
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      headerStyle: {
        marginTop: Constants.statusBarHeight
      },
      headerTransparent: true
    }
  }
);

export default RootStack;
