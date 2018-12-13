import React, { Component } from 'react'
import { SetOfMovies, Movie } from '../api'
import Card from './Card'
import Carousel from 'react-native-snap-carousel'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

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
  _renderItem({ item }: { item: Movie }) {
    return (
      <Card
        title={item.getTitle()}
        bgImage={item.getPoster()}
        height={this.props.height}
        onPress
        routeName="Movie"
        params={{ movieId: item.getId() }}
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
          // alignItems: 'flex-start',
          justifyContent: 'center',
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    )
  }
}

export default withNavigation(StackOfCards)
