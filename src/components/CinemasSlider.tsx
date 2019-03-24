import React from 'react'
import { Spinner } from 'native-base'
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Text
} from 'react-native'
import { Linking } from 'expo'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

export default (props: any) => {
  if (props.data) {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10
        }}
      >
        <ScrollView horizontal={true}>
          {props.data.map((item: any) => (
            <Item key={item.cinema_id} {...item} />
          ))}
        </ScrollView>
      </View>
    )
  } else {
    return <Spinner />
  }
}
export const CinemasPlaceholder = () => (
  <View
    style={{
      flex: 1,
      height: 75,
      width: 100,
      borderRadius: 9,
      backgroundColor: '#E20F0F',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <FontAwesomeIcon name="film" color="white" size={24} />
  </View>
)
class Item extends React.Component<any, any> {
  onPress = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL(
        `https://maps.apple.com/?q=${this.props.lat},${this.props.lng}`
      )
    } else {
      Linking.openURL(
        `https://maps.google.com/?q=${this.props.lat},${this.props.lng}`
      )
    }
  }
  render() {
    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={{
          position: 'relative',
          height: 75,
          width: 100,
          marginRight: 15,
          borderRadius: 9
        }}
      >
        {this.props.logo_url !==
        'https://assets.movieglu.com/chain_logos/uk/UK-0-sq.jpg' ? (
          <Image
            source={{ uri: this.props.logo_url }}
            style={{
              height: 75,
              width: 100,
              borderRadius: 9
            }}
          />
        ) : (
          <CinemasPlaceholder />
        )}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 30,
            backgroundColor: '#26293E',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomLeftRadius: 9,
            borderBottomRightRadius: 9
          }}
        >
          <Text
            style={{
              fontFamily: 'Poppins',
              color: '#6F7395',
              padding: 5,
              fontSize: 6,
              flex: 1
            }}
          >
            {this.props.cinema_name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
