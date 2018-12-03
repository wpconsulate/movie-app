import React from 'react'
import { View, Image, ScrollView, Text, TouchableOpacity } from 'react-native'
import SetOfMovies from '../api/SetOfMovies'
import { Movie } from '../api'
import { NavigationActions } from 'react-navigation'
interface IProps {
  data: SetOfMovies
  title: String
}

export default function MovieSlider(props: IProps) {
  const topRated = props.data
  return (
    <View>
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          marginLeft: 5,
          fontFamily: 'PoppinsBold',
        }}
      >
        {props.title}
      </Text>
      <ScrollView horizontal>
        {topRated.map((movie: Movie) => {
          return (
            <TouchableOpacity
              style={{ alignItems: 'center', maxWidth: 100, margin: 10 }}
              key={movie.getId()}
              onPress={() =>
                NavigationActions.navigate({
                  routeName: 'MovieScreen',
                  params: { movieId: movie.getId() },
                })
              }
            >
              <Image
                style={{ width: 100, height: 150, borderRadius: 10 }}
                source={{ uri: movie.getPoster() }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: '#ffffff',
                  fontFamily: 'PoppinsMedium',
                }}
              >
                {movie.getTitle(10)}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}
