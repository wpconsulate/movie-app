import { createStackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Login: LoginScreen
    },
    {
        initialRouteName: 'Home'   
    }
);

export default RootStack;