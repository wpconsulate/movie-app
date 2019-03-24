import React, { Component } from 'react'
import { Text } from 'native-base'
import { TouchableOpacity } from 'react-native'

class ResultItem extends Component<any, any> {
  onPress = (e: any) => {
    e.preventDefault()
    this.props.onPress(this.props.id)
  }

  render() {
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row', flex: 1, marginBottom: 15 }}
        onPress={this.onPress}
      >
        <Text
          style={{
            paddingLeft: 15,
            fontSize: 14,
            fontFamily: 'PoppinsLight',
            color: '#8A8A8A'
          }}
        >
          {this.props.name}{' '}
          {this.props.releaseDate ? `(${this.props.releaseDate})` : undefined}
        </Text>
      </TouchableOpacity>
    )
  }
}
export default ResultItem
