import React, { Component } from 'react'
import { Content, View, Text, Container } from 'native-base'
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

    const sliderWidth = Math.round(deviceWidth - 10)
    const sliderHeight = Math.round(deviceHeight * 0.5)
    const itemWidth = Math.round(sliderWidth - 10)

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
          justifyContent: 'center',
          alignItems: 'flex-start',
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
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}
        >
          <StackOfCards
            data={upcomingMovies}
            height={sliderHeight}
            sliderWidth={sliderWidth}
            itemWidth={sliderWidth}
          />
        </View>
      </View>
    )
  }
}

export default Upcoming
