import React from 'react'
import {View, Image, Text } from 'react-native';
import SetOfMovies from '../api/SetOfMovies';
import { Movie } from '../api';
interface IProps{
    data:SetOfMovies,
    title:String
}

export default function MovieItem(props:IProps){
    const topRated = props.data;
    return(
    <View>
        <Text style={{color: 'white', fontSize:20, marginLeft:5, fontFamily:'PoppinsBold'}}>{props.title}</Text>
        <View>          
          {/* TRY AND MAKE IT OUT PUT IN NEAT ORDELY PATTERN USING ABOVE AND FOR LOOP JUST BELOW RETURN COUTNING UNTIL NEW ROW NEEDED */}
          {topRated.map((movie:Movie) => {
          return(

            <View  style={{alignItems:'center', height:160, width:140}} key={movie.getId()}>
              <Image style={{width:100, height:150, borderRadius:10}} source={{uri:movie.getPoster()}}/>
              <Text style={{fontSize:10, color: '#ffffff'}}>{movie.getTitle(10)}</Text>
              <View style={{flexDirection: 'row'}}>
                {/* <Image source={require('../../assets/Star.png')}/>
                <Image source={require('../../assets/Star.png')}/>
                <Image source={require('../../assets/Star.png')}/>
                <Image source={require('../../assets/Star.png')}/>
                <Image source={require('../../assets/EmptyStar.png')}/> */}
              </View>
            </View>

            )
          })}
      </View>
  </View>)
};