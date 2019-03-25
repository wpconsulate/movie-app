import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface IProps {
  colour?: string
  textColour?: string
  text: string
  size?: number
}

class Pill extends Component<IProps> {
  static defaultProps = {
    colour: '#26293E',
    textColour: '#4F547E',
    size: 32
  }
  render() {
    const originalSize = 32
    const paddingCalc = Math.floor((100 / originalSize) * 12).toPrecision(3)
    const padding = parseInt(
      (
        (parseFloat(paddingCalc) / 100) *
        (this.props.size as number)
      ).toString(),
      undefined
    )
    const shapes = StyleSheet.create({
      pill: {
        justifyContent: 'center',
        backgroundColor: this.props.colour,
        borderRadius: 16,
        paddingLeft: padding,
        paddingRight: padding,
        minHeight: this.props.size,
        marginLeft: 5,
        marginRight: 5
      }
    })

    return (
      <View style={[shapes.pill]}>
        <Text style={{ color: this.props.textColour }}>{this.props.text}</Text>
      </View>
    )
  }
}

export default Pill
