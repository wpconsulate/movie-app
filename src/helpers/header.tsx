import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { StyleProvider, Button, Text, Icon } from 'native-base';
import getTheme from '../native-base-theme/components'
import mmdb from '../native-base-theme/variables/mmdb'
import Profile from '../components/Header/Profile';


export const navigationOptions = ({ navigation }: NavigationScreenProps) => {
  return ({
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
}
