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
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import {
  Card as NativeCard,
  CardItem,
  Body,
  Text,
  Button,
  // Row,
} from 'native-base'
import SvgUri from 'react-native-svg-uri'
import { LinearGradient, Linking } from 'expo'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Movie from '../api/Movie/Movie'
// import { Pill } from '.'

interface ICardParams {
  movieId: number
}
interface IProps extends NavigationInjectedProps {
  title: string
  bgImage: string
  width?: number | string
  height: number | string
  onPress?: boolean
  routeName?: string
  params?: ICardParams
  movie?: Movie
}

interface IStyles {
  view: ViewStyle
  imageBackground: ImageStyle
  cardItem: ViewStyle
  text: TextStyle
}

class Card extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      genres: [],
    }
  }
  onPress = async () => {
    const trailer = await this.props.movie.getTrailer(0)
    Linking.openURL(`https://www.youtube.com/embed/${trailer.key}`)
  }
  renderStars = (stars: number) => {
    let starsArray = []

    for (let i = 0; i < 5; i++) {
      if (stars <= i) {
        starsArray.push(
          <FontAwesomeIcon key={i} name="star-o" size={16} color="white" />
        )
      } else {
        starsArray.push(
          <FontAwesomeIcon key={i} name="star" size={16} color="white" />
        )
      }
    }
    return starsArray
  }
  render() {
    const {
      width,
      title,
      bgImage,
      height,
      navigation,
      routeName,
      movie,
      params,
      onPress,
    } = this.props

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

    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={0.6}
        accessible
        accessibilityLabel={title}
        accessibilityHint={`Navigates to ${title} screen. Swipe horizontally with three fingers for the next movie card.`}
        accessibilityRole="button"
        onPress={() => (onPress ? navigation.push(routeName, params) : {})}
      >
        <View style={styles.view}>
          <NativeCard
            accessible
            accessibilityLabel={title}
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
              accessible
              accessibilityLabel={title}
              accessibilityRole="image"
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
              <CardItem
                style={styles.cardItem}
                onPress={() =>
                  onPress ? navigation.push(routeName, params) : {}
                }
                accessible
                accessibilityLabel={title}
                accessibilityHint={`Navigates to ${title} screen`}
                accessibilityRole="button"
              >
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
                    accessible
                    accessibilityLabel={`Play`}
                    onPress={this.onPress}
                    accessibilityHint={`Press to open the trailer in a browser.`}
                  >
                    <SvgUri
                      source={require('../../assets/icons/play-button.svg')}
                      width={85}
                      height={85}
                    />
                  </Button>
                  <Text style={styles.text}>{title}</Text>
                  {/* <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    {this.state.genres
                      ? this.state.genres.map((item: any) => (
                          <Pill
                            key={item.id}
                            colour="#B90D0D"
                            text={item.name}
                            textColour="#E20F0F"
                          />
                        ))
                      : ''}
                  </View> */}
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    {this.renderStars(movie.getRating())}
                  </View>
                </Body>
              </CardItem>
            </ImageBackground>
          </NativeCard>
        </View>
      </TouchableOpacity>
    )
  }
}
export default withNavigation(Card)
