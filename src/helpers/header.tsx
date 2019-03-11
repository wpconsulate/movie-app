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
      >
        <Icon name="person" style={{ color: '#fff' }} />
      </Button>
    </StyleProvider>
  ),
  headerTitle: (
    <StyleProvider style={getTheme(mmdb)}>
      <Button onPress={() => navigation.navigate('Home')} transparent
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
      >
        <Icon name="search" style={{ color: '#fff' }} />
      </Button>
    </StyleProvider>
  ),
})