import React, { Component } from 'react'
import {
  ImageBackground,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native'
import { Card as NativeCard, View, CardItem, Body, Text } from 'native-base'

interface IProps {
  title: string
  bgImage: string
  width?: number | string
  height: number | string
}

interface IStyles {
  view: ViewStyle
  imageBackground: ImageStyle
  cardItem: ViewStyle
  text: TextStyle
}

class Card extends Component<IProps> {
  constructor(props: IProps) {
    super(props)
  }
  render() {
    const { width, title, bgImage, height } = this.props

    const styles = StyleSheet.create<IStyles>({
      view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      },
      imageBackground: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
      },
      cardItem: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        color: 'white',
        fontFamily: 'PoppinsBold',
        maxWidth: '50%',
        textAlign: 'center',
      },
    })

    return (
      <View style={styles.view}>
        <NativeCard
          style={{
            width: width ? width : '90%',
            height: height,
            borderRadius: 16,
            borderColor: 'transparent',
          }}
        >
          <ImageBackground
            source={{ uri: bgImage }}
            style={styles.imageBackground}
            imageStyle={{ borderRadius: 16 }}
          >
            <CardItem style={styles.cardItem}>
              <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.text}>{title}</Text>
              </Body>
            </CardItem>
          </ImageBackground>
        </NativeCard>
      </View>
    )
  }
}
export default Card
