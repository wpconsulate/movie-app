import React,  { Component } from 'react';
import { Text, View } from 'react-native';

interface IProps {
}

interface IState {
  data: Array<Object>,
  text: string,
  poster: string
}

class Movie {
	private poster_path: string;

	constructor(poster_path: string) {
		this.poster_path = poster_path;
	}

	public getPath(): string {
		return this.poster_path;
	} 
}

class App extends Component<IProps, IState> {

  constructor(props: IProps) {
		super(props);
	}

  public setPosterPath(item: Movie) {
    this.state.poster = `https://image.tmdb.org/t/p/w185${item.getPath()}`;
  }

  public getPosterPath(): string {
    return this.state.poster;
  }

  public componentDidMount() {
    this.searchMovies('Star wars');
  }

  public onPress() {
    this.searchMovies(this.state.text);
  }

  public async searchMovies(searchTerm: string) {
    const response = await fetch (
      'https://api.themoviedb.org/3/search/movie?api_key=47a7085127ae49a25727d14a6a229052&language=en-US&query=' +
      searchTerm
    );
    const json = await response.json();
		this.setState({data: json.results});
		return json;
  }


  render() {
    return (
			<View>
				<Text>Hello</Text>
			</View>
    );
  }
}

export default App;