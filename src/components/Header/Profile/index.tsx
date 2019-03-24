import React, { Component } from 'react'
import { StyleProvider, Button, Icon } from 'native-base'
import getTheme from '../../../native-base-theme/components'
import mmdb from '../../../native-base-theme/variables/mmdb'
import UserStore from '../../../stores/UserStore'

class Profile extends Component<any, any> {
  _handleClick() {
    if (UserStore.isLoggedIn) return this.props.navigation.navigate('Profile')
    return this.props.navigation.navigate('Login')
  }
  render() {
    const isLoggedIn = UserStore.isLoggedIn
    return (
      <StyleProvider style={getTheme(mmdb)}>
        {isLoggedIn ? (
          <Button
            onPress={() => this._handleClick()}
            transparent
            accessible={true}
            accessibilityLabel="Profile"
            accessibilityHint={'Navigate to the profile screen'}
            accessibilityRole="button"
            accessibilityTraits="button"
          >
            <Icon name="person" style={{ color: '#fff' }} />
          </Button>
        ) : (
          <Button
            onPress={() => this._handleClick()}
            transparent
            accessible={true}
            accessibilityLabel="Login"
            accessibilityHint={'Navigate to the login screen'}
            accessibilityRole="button"
            accessibilityTraits="button"
          >
            <Icon name="person" style={{ color: '#fff' }} />
          </Button>
        )}
      </StyleProvider>
    )
  }
}
export default Profile
