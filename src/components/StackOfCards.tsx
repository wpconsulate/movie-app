import React, { Component } from 'react'
import SetOfMovies from '../api/SetOfMovies'
import Movie from '../api/Movie/Movie'
import Card from './Card'
import Carousel from 'react-native-snap-carousel'

interface IProps {
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
        layout={'tinder'}
        firstItem={0}
      />
    )
  }
}

export default StackOfCards
