//import Carousel from 'react-native-snap-carousel';
import React, { Component } from 'react';
import { ActivityIndicator, View, Image, StyleSheet, ImageStyle, ViewStyle, ScrollView, Text } from 'react-native';
// import { Item } from 'native-base';
// import Movie from '../../api/Movie/Movie';
// import { any, array } from 'prop-types';

interface IProps{
  style:ViewStyle
}
interface IStyle{
    singleMovie: ImageStyle,
    flatListStyle: ViewStyle
}
interface IState{
    isLoading: boolean,
    dataSource: any
}

export default class TopRated extends Component <IProps, IState> {
  constructor(props:IProps) {
    super(props);
    this.state = {
        isLoading: true,
        dataSource: {} 
    };
  }

  style = StyleSheet.create<IStyle>({
    singleMovie: {
        height: 120,
        width: 50,
        margin: 5    
    },
    flatListStyle: {
        flex:1,
        flexDirection: "row",
        flexWrap: "wrap"
    }
});

  async componentDidMount() {
    try{
        const response = await fetch(
            'https://api.themoviedb.org/3/movie/upcoming?api_key=47a7085127ae49a25727d14a6a229052&language=en-US&page=1'
          );
          const responseJson = await response.json();
          this.setState(
              {
                isLoading: false,
                dataSource: responseJson.results,
              })
    }
    catch (error){
        console.error(error);
    }
  }

  getImage(path:any) {
    return `http://image.tmdb.org/t/p/w500/${path}`;
  }

  render() {
      
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    // let listItems = this.state.dataSource.map((m:any) =>
    //         <Image
    //         key={`image${m.poster_path}`} 
    //         source={{uri:this.getImage(m.poster_path)}}/>
    // );
    //https://facebook.github.io/react-native/docs/touchableopacity 
    //touchable opacity
    let imageArray= new Array<JSX.Element>();
    this.state.dataSource.forEach((Movie:any,m:any)=>{
            const thisImage = <Image  
            key={m}
            source = {{uri: this.getImage(Movie.poster_path)}}
            style={{ width: 50, height:100, margin:10, flex:2}}
            /> 
            imageArray.push(thisImage);
    })

    const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <Text style={{fontWeight:"700", flex:1}}>{number}</Text>
);


    return (
    <ScrollView style={this.props.style}
    horizontal
    >

   {imageArray}
   {listItems}

    </ScrollView>
         
    );
  }
}