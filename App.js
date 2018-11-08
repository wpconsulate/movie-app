import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, ScrollView, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//KEY 47a7085127ae49a25727d14a6a229052

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			text: '',
			poster: '',
		};
		
	}



	posterPath(item) {	
		this.state.poster = 'https://image.tmdb.org/t/p/w185'+ item.poster_path
	}

	componentDidMount() {
		this.searchMovies('Star wars');
	}

	onPress = () => {
		this.searchMovies(this.state.text);
	};

	searchMovies = async (searchTerm) => {
		
		// const urlString = "https://api.themoviedb.org/3/search/movie?api_key=47a7085127ae49a25727d14a6a229052&language=en-US&query=Shrek"
		const response = await fetch(
			'https://api.themoviedb.org/3/search/movie?api_key=47a7085127ae49a25727d14a6a229052&language=en-US&query=' +
				searchTerm
		);
		const json = await response.json();
		this.setState({ data: json.results });		
	};

	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.navBar}>
					<Image source={require('./assets/tmdb-logo.png')} style={{ alignSelf: 'stretch' }} />
					<TextInput
						onChangeText={(text) => {
							this.setState({ text });
						}}
						value={this.state.text}
						placeholder="Search Movies"
						style={{ minWidth: 250 }}
					/>
					<View style={styles.navRight}>
						<TouchableOpacity onPress={this.onPress}>
							<Icon name="search" size={30} />
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.body}>

						<FlatList
							data={this.state.data}
							keyExtractor={(x, i) => i.toString()}
							renderItem={({ item }) => (							
									<View style={styles.vidItem}>
										{this.posterPath(item)}
										<Text>Title: {`${item.title}`} </Text>
										<Image 
											style={{width: 75, height: 100}}
											source={{uri: this.state.poster }}
										/>												
									</View>							
							)}
						/>

				</View>
				<View style={styles.tabBar}>
					<TouchableOpacity style={styles.tabItem}>
						<Icon name="home" size={30} />
						<Text style={styles.tabTitle}>Home</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.tabItem}>
						<Icon name="whatshot" size={30} />
						<Text style={styles.tabTitle}>Popular</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	navBar: {
		paddingTop: 25,
		paddingHorizontal: 15,
		height: 100,
		backgroundColor: '#fff',
		elevation: 3,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	navRight: {
		flexDirection: 'row'
	},
	body: {
		flex: 1
	},
	tabBar: {
		backgroundColor: '#fff',
		height: 60,
		borderTopWidth: 0.5,
		borderColor: '#E5E5E5',
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	tabItem: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	tabTitle: {
		paddingTop: 4,
		fontSize: 11,
		color: '#3c3c3c'
	}
	,
	vidBar: {
		backgroundColor: '#fff',
		height: 120,
		borderTopWidth: 0.5,
		borderColor: '#E5E5E5',
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	vidItem: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	vidTitle: {
		paddingTop: 4,
		fontSize: 11,
		color: '#3c3c3c'
	}
});
