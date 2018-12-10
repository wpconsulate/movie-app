import React, { Component } from 'react'
import SetOfMovies from '../api/SetOfMovies'
import Movie from '../api/Movie/Movie'
import Card from './Card'
import Carousel from 'react-native-snap-carousel'
import {
  NavigationInjectedProps,
  withNavigation,
  NavigationScreenProp,
  NavigationRoute,
  NavigationParams,
} from 'react-navigation'

interface IProps extends NavigationInjectedProps {
  data: Array<any> | SetOfMovies
  height: number
  sliderWidth: number
  itemWidth: number
}

class StackOfCards extends Component<IProps> {
  constructor(props: IProps) {
    super(props)
  }

  _handleOnPress(
    navigation: NavigationScreenProp<
      NavigationRoute<NavigationParams>,
      NavigationParams
    >,
    movie: Movie
  ) {
    console.log('pressed!')
    navigation.push('Movie', { movieId: movie.getId() })
  }

  _renderItem({ item }: { item: Movie }) {
    return (
      <Card
        title={item.getTitle()}
        bgImage={item.getPoster()}
        height={this.props.height}
        onPress={() => this._handleOnPress(this.props.navigation, item)}
      />
    )
  }

  render() {
    return (
      <Carousel
        data={this.props.data}
        renderItem={this._renderItem.bind(this)}
        sliderWidth={this.props.sliderWidth}
        itemWidth={this.props.itemWidth}
        layout={'stack'}
        layoutCardOffset={18}
        slideStyle={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          alignSelf: 'flex-start',
        }}
      />
    )
  }
}

export default withNavigation(StackOfCards)
