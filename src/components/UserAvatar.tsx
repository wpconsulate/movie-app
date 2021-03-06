import React, { Component } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'

interface IProps {
  userInitials?: string
  avatarColour?: string
  marginRight?: number
  size?: 'small' | 'medium' | 'large' | 'xlarge'
}

export default class UserAvatar extends Component<IProps> {
  constructor(props: IProps) {
    super(props)
  }

  render() {
    const { userInitials, avatarColour } = this.props

    if (userInitials === undefined || avatarColour === null) {
      return (
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            borderRadius: 37.5,
            height: this.props.size,
            width: 40
          }}
        />
      )
    }

    return (
      <View style={{ marginRight: this.props.marginRight }}>
        <Avatar
          size={this.props.size ? this.props.size : 'medium'}
          rounded={true}
          title={userInitials}
          // title="MT"
          overlayContainerStyle={{ backgroundColor: avatarColour }}
          activeOpacity={0.7}
        />
      </View>
    )
  }
}
