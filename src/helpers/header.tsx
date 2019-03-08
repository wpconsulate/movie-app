import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { StyleProvider, Button, Text, Icon } from 'native-base';
import getTheme from '../native-base-theme/components'
import mmdb from '../native-base-theme/variables/mmdb'
import { Authentication } from '../api';

const auth = new Authentication()
export const navigationOptions = ({ navigation }: NavigationScreenProps) => ({
  headerTransparent: true,
  headerBackgroundTransitionPreset: 'fade',
  headerLeft: (
    <StyleProvider style={getTheme(mmdb)}>
      <Button onPress={() => navigation.navigate('Login')} transparent
        accessibilityLabel={auth.isLoggedIn() ? `Profile` : `Login`}
        accessibilityHint={auth.isLoggedIn() ? `Navigates to the profile screen` : `Navigates to the login screen`}
        accessibilityRole="button"
        accessibilityTraits="button"
      >
        <Icon name="person" style={{ color: '#fff' }} />
      </Button>
    </StyleProvider>
  ),
  headerTitle: (
    <StyleProvider style={getTheme(mmdb)}>
      <Button onPress={() => navigation.navigate('Home')} transparent
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
        accessibilityLabel="Search"
        accessibilityHint={`Navigates to the search screen`}
        accessibilityRole="button"
        accessibilityTraits="button"
      >
        <Icon name="search" style={{ color: '#fff' }} />
      </Button>
    </StyleProvider>
  ),
})