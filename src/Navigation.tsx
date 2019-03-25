import React, { Component } from 'react'
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'
import { Text } from 'native-base'
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
import { StyleProvider, Button, Icon } from 'native-base'
import getTheme from './native-base-theme/components'
import mmdb from './native-base-theme/variables/mmdb'
import { NavigationScreenProps } from 'react-navigation'

const ProfileTabNavigator = createBottomTabNavigator(
  {
    Profile: { screen: ProfileScreen },
    Friends: { screen: FriendsScreen },
    Reviews: { screen: UserReviewScreen },
    Settings: { screen: SettingsScreen }
  },
  // @ts-ignore
  {
    swipeEnabled: true,
    navigationOptions: ({ navigation }: any) => {
      const { routeName } = navigation.state.routes[navigation.state.index]
      return {
        headerTitle: (
          <StyleProvider style={getTheme(mmdb)}>
            <Button onPress={() => navigation.navigate('Home')} transparent
              accessible={true}
              accessibilityLabel={routeName}
              accessibilityHint={"Navigate to the " + routeName + " screen"}
              accessibilityRole="button"
              accessibilityTraits="button"
            >
              <Text
                style={{ fontFamily: 'PoppinsBold', color: '#fff', fontSize: 18 }}
              >
                {routeName}
            </Text>
            </Button>
          </StyleProvider>
        ),
      }
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state
        const type: any = 'Feather'
        let name
        const color = focused ? 'white' : '#686C86'
        switch (routeName) {
          case 'Profile':
            name = 'user'
            break
          case 'Settings':
            name = 'more-horizontal'
            break
          case 'Reviews':
            name = 'inbox'
            break
          case 'Friends':
            name = 'users'
        }
        return (
          <Icon
            type={type}
            name={name as string}
            fontSize={10}
            color={color}
            style={{ paddingTop: 5, color, paddingBottom: 5 }}
          />
        )
      }
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#686C86',
      labelStyle: {
        fontSize: 12,
        fontFamily: 'Poppins',
        padding: 5
      },
      style: {
        backgroundColor: '#12152D',
        height: 70
      }
    }
  }
)

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Movie: MovieScreen,
    Profile: {
      screen: ProfileTabNavigator,
      navigationOptions: ({ navigation }: NavigationScreenProps) => ({
        headerLeft: (
          <StyleProvider style={getTheme(mmdb)}>
            <Button
              onPress={() => navigation.goBack()}
              transparent
              accessible
              accessibilityRole="button"
              accessibilityLabel="Go back"
              accessibilityHint="Double tap to go back to the previous screen."
            >
              <Icon
                type="Feather"
                name="chevron-left"
                style={{ color: '#fff' }}
              />
            </Button>
          </StyleProvider>
        ),
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#12152D',
          borderBottomWidth: 0,
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
          shadowOffset: {
            height: 0
          },
          shadowColor: 'transparent'
        },
        headerTitleStyle: {
          fontFamily: 'PoppinsBold',
          fontSize: 18,
          color: 'white'
        }
      })
    },
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
