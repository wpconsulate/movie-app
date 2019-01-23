import React, { Component } from 'react'
import { ActivityIndicator, View } from 'react-native'
import Watchlist from '../api/Collection/Watchlist'
import WatchlistCard from '../components/WatchlistCard'
// import { SetOfMovies } from '../api';

interface IProps {}

interface IState {
  isLoading: boolean
  topRated: Watchlist
}

export default class ProfileWatchlist extends Component<IProps, IState> {         
  private Watchlist = new Watchlist("1")
  constructor(props: IProps) {
    super(props)
    this.state = {
      isLoading: true,
      topRated: null,
    }
  }

  //this function is called when component has mounted
  async componentDidMount() {
    const movies = await this.Watchlist.getList() //This part is not receving anything back this is where I need to go to try and fix it loool
    console.log(movies) // empty because the id is not included
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
        <WatchlistCard data={this.state.topRated} title={this.Watchlist.getTitle()} />
        {/* <MovieSlider data={this.state.topRated} title="Testing" /> */}
      </View>
    )
  }
}
