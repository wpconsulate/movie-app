import React, { Component } from 'react'
import { ActivityIndicator, View } from 'react-native'
import SetOfMovies from '../api/Collection/SetOfMovies'
import MovieSlider from '../components/MovieSlider'

interface IProps {}

interface IState {
  isLoading: boolean
  topRated: SetOfMovies
}

export default class Trending extends Component<IProps, IState> {
  //used to generate top rated movies
  private setOfTopRated = new SetOfMovies()
  constructor(props: IProps) {
    super(props)
    this.state = {
      isLoading: true,
      topRated: null,
    }
  }

  //this function is called when component has mounted
  async componentDidMount() {
    const movies = await this.setOfTopRated.getTrending()
    this.setState({
      isLoading: false,
      topRated: movies,
    })
  }

  render() {
    //show loading icon
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <View>
        <MovieSlider data={this.state.topRated} title="Trending" />
      </View>
    )
  }
}
