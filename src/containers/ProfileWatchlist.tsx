import React, { Component } from 'react'
import { ActivityIndicator, View } from 'react-native'
import Watchlist from '../api/Collection/Watchlist'
// import WatchlistCard from '../components/WatchlistCard'
import { SetOfMovies } from '../api';
import MovieSlider from '../components/MovieSlider'
interface IState {
  isLoading: boolean
  watching: SetOfMovies
  planned: SetOfMovies
  completed: SetOfMovies
  dropped: SetOfMovies
}
interface IProps {
  userid : string
}

export default class ProfileWatchlist extends Component<IProps, IState> {         
  private Watchlist = new Watchlist(this.props.userid)
  constructor(props: IProps) {
    super(props)
    this.state = {
      isLoading: true,
      watching: null,
      planned: null,
      completed: null,
      dropped: null
    }
  }

  //this function is called when component has mounted
  async componentDidMount() {
    const { userid } = this.props;
    // console.log(userid)
    // let SetOfMovie = new SetOfMovies();
    // SetOfMovie = await SetOfMovie.getTrending();
    const watching = await this.Watchlist.getList(userid, "watching"); 
    const planned = await this.Watchlist.getList(userid, "planned"); 
    const completed = await this.Watchlist.getList(userid, "completed"); 
    const dropped = await this.Watchlist.getList(userid, "dropped"); 
    // dropped[0].AddToWatchlist("4ZmT7I7oZYdBy2YYaw5BS0keAhu1", "watching");
    // await this.Watchlist.changelist(dropped[0], "watching", "planned"); 
    // console.log(watching);
    this.setState({
      isLoading: false,
      watching: watching,
      planned: planned,
      completed: completed,
      dropped: dropped,

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
       <View style={{width:'100%'}}>
        <MovieSlider data={this.state.watching} title={"Watching"}/> 
        <MovieSlider data={this.state.planned} title={"Planning"}/> 
        <MovieSlider data={this.state.completed} title={"Completed"}/>  
        <MovieSlider data={this.state.dropped} title={"Dropped"}/> 
      </View>
    )
  }
}
