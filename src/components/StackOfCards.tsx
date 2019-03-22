import React, { Component } from 'react'
import { SetOfMovies, Movie } from '../api'
import Card from './Card'
import Carousel from 'react-native-snap-carousel'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { AccessibilityInfo } from 'react-native'

interface IProps extends NavigationInjectedProps {
  data: Array<any> | SetOfMovies
  height: number
  sliderWidth: number
  itemWidth: number
}

class StackOfCards extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      accessibilityOn: false,
    }
  }

  async componentDidMount() {
    this.setState({
      accessibilityOn: await AccessibilityInfo.fetch(),
    })
  }

  _renderItem({ item }: { item: Movie }) {
    return (
      <Card
        title={item.getTitle()}
        bgImage={item.getPoster()}
        height={this.props.height}
        onPress
        routeName="Movie"
        movie={item}
        params={{ movieId: item.getId() }}
      />
    )
  }

  render() {
    const { accessibilityOn } = this.state
    return (
      <Carousel
        data={this.props.data}
        renderItem={this._renderItem.bind(this)}
        sliderWidth={this.props.sliderWidth}
        itemWidth={this.props.itemWidth}
        layout={accessibilityOn ? 'default' : 'stack'}
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
