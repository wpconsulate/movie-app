import React, { Component } from 'react';
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
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
  QrScreen,
  FriendsScreen,
  UserReviewScreen

} from './screens'
import { StyleProvider, Button, Text, Icon } from 'native-base';
import getTheme from './native-base-theme/components'
import mmdb from './native-base-theme/variables/mmdb'
import Profile from './components/Header/Profile';

const ProfileTabNavigator = createBottomTabNavigator(
  {
    All: { screen: ProfileScreen },
    Friends: { screen: FriendsScreen },
    Review: { screen: UserReviewScreen },
    Settings: { screen: SettingsScreen }
  },  
  {  
    defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state
      let type: any = 'Feather'
      let name
      const color = focused ? 'white' : '#686C86'
      if (routeName === 'All') {
        name = 'user'
      } else if (routeName === 'Settings') {
        name = 'settings'
      } else if (routeName === 'Review') {
        name = 'rate-review'
        type = 'MaterialIcons'
      } else if (routeName === 'Friends') {
        name = 'users'
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return (
        <Icon
          type={type}
          name={name as string}
          style={{ color: color, fontSize: 30, paddingTop: 5 }}
        />
      )
    }
  }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#686C86',
      labelStyle: {
        fontSize: 15,
        fontWeight: '400'
      },
      style: {
        backgroundColor: '#1d2249',
        height: 60
      },    
      
    }
  }
)

const ProfileStackNavigator = createStackNavigator(
  {
    ProfileTabNavigator: ProfileTabNavigator
  },  
  {
    defaultNavigationOptions: ({ navigation }) => ({      
    headerTransparent: true,
    headerBackgroundTransitionPreset: 'fade',
    headerLeft: <Profile navigation={navigation} />,
    headerTitle: (
      <StyleProvider style={getTheme(mmdb)}>
        <Button onPress={() => navigation.navigate('Home')} transparent
          accessible={true}
          accessibilityLabel="Home"
          accessibilityHint={"Navigate to the home screen"}
          accessibilityRole="button"
          accessibilityTraits="button"
        >
          <Text
            style={{ fontFamily: 'PoppinsBold', color: '#fff', fontSize: 18 }}
          >
            mmdb
        </Text>
        </Button>
      </StyleProvider>
    ),
    headerRight: (
      <StyleProvider style={getTheme(mmdb)}>
        <Button onPress={() => navigation.navigate('Search')} transparent
          accessible={true}
          accessibilityLabel="Search"
          accessibilityHint={"Navigate to the search screen"}
          accessibilityRole="button"
          accessibilityTraits="button"
        >
          <Icon name="search" style={{ color: '#fff' }} />
        </Button>
      </StyleProvider>
    ),
  })

})

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Movie: MovieScreen,
    Profile: ProfileStackNavigator,
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
      headerTransparent: true,
    }
  }
)

export default RootStack
