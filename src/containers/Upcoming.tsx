import React, { Component } from 'react'
import { View, Text } from 'native-base'
import { StackOfCards } from '../components'
import { SetOfMovies } from '../api'
import { ActivityIndicator, Dimensions } from 'react-native'

interface IProps {}
interface IState {
  isLoaded: boolean
  upcomingMovies: SetOfMovies | null
}
class Upcoming extends Component<IProps, IState> {
  private upcomingMovies = new SetOfMovies()

  constructor(props: IProps) {
    super(props)
    this.state = {
      isLoaded: false,
      upcomingMovies: null,
    }
  }

  async componentDidMount() {
    const upcomingMovies = await this.upcomingMovies.getUpcoming()
    this.setState({
      upcomingMovies: upcomingMovies,
      isLoaded: true,
    })
  }

  render() {
    const { upcomingMovies, isLoaded } = this.state

    const deviceWidth = Dimensions.get('window').width
    const deviceHeight = Dimensions.get('window').height

    const sliderWidth = Math.round(deviceWidth)
    const sliderHeight = Math.round(deviceHeight * 0.6)
    const itemWidth = Math.round(sliderWidth - 50)

    if (!isLoaded) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          flex: 1,
        }}
      >
        <View style={{ width: '100%' }}>
          <Text
            style={{
              fontFamily: 'PoppinsBold',
              color: 'white',
              fontSize: 20,
              marginBottom: 20,
            }}
          >
            Upcoming
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            height: sliderHeight,
          }}
        >
          <StackOfCards
            data={upcomingMovies}
            height={sliderHeight}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
          />
        </View>
      </View>
    )
  }
}

export default Upcoming
