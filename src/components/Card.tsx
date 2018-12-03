import React, { Component } from 'react'
import {
  ImageBackground,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native'
import { Card as NativeCard, CardItem, Body, Text, Button } from 'native-base'
import SvgUri from 'react-native-svg-uri'
import { LinearGradient } from 'expo'
import { NavigationActions } from 'react-navigation'
interface IParams {
  movieId: number
}
interface IProps {
  title: string
  bgImage: string
  width?: number | string
  height: number | string
  route: string
  params: IParams
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
    const { width, title, bgImage, height, route, params } = this.props

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
        borderColor: 'transparent',
      },
      cardItem: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'transparent',
      },
      text: {
        color: 'white',
        fontFamily: 'PoppinsBold',
        textAlign: 'center',
        fontSize: 22,
        marginTop: 50,
      },
    })

    const navigationAction = NavigationActions.navigate({
      routeName: route,
      params: params,
    })

    return (
      <TouchableOpacity onPress={() => navigationAction}>
        <View style={styles.view}>
          <NativeCard
            style={{
              width: width ? width : '100%',
              height: height,
              borderRadius: 16,
              borderColor: 'transparent',
              backgroundColor: 'transparent',
            }}
          >
            <ImageBackground
              source={{ uri: bgImage }}
              style={styles.imageBackground}
              imageStyle={{
                borderRadius: 16,
                borderColor: 'transparent',
                backgroundColor: 'transparent',
              }}
            >
              <LinearGradient
                colors={['rgba(226, 15, 15, 100)', 'rgba(226, 15, 15, 0.65)']}
                start={[0.5, 0.9]}
                end={[0.5, 0]}
                style={{
                  position: 'absolute',
                  flex: 1,
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: 16,
                }}
              />
              <CardItem style={styles.cardItem}>
                <Body
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    maxWidth: '60%',
                  }}
                >
                  <Button
                    transparent
                    style={{ width: 85, height: 85, alignSelf: 'center' }}
                  >
                    <SvgUri
                      source={require('../../assets/icons/play-button.svg')}
                      width={85}
                      height={85}
                    />
                  </Button>
                  <Text style={styles.text}>{title}</Text>
                </Body>
              </CardItem>
            </ImageBackground>
          </NativeCard>
        </View>
      </TouchableOpacity>
    )
  }
}
export default Card
