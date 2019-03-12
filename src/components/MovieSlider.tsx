import React from 'react'
import { View, Image, ScrollView, Text, TouchableOpacity } from 'react-native'
import SetOfMovies from '../api/Collection/SetOfMovies'
import { Movie } from '../api'
import {
  NavigationInjectedProps,
  withNavigation,
  NavigationScreenProp,
  NavigationRoute,
  NavigationParams,
} from 'react-navigation'
interface IProps extends NavigationInjectedProps {
  data: SetOfMovies
  title: String
}
function handleOnPress(
  navigation: NavigationScreenProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >,
  movie: Movie
) {
  navigation.push('Movie', { movieId: movie.getId() })
}
function MovieSlider(props: IProps) {
  const topRated = props.data
  return (
    <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
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
              accessible
              accessibilityRole="button"
              accessibilityLabel={movie.getTitle()}
              accessibilityHint={`Double tap to go to the movie screen.`}
              style={{ alignItems: 'center', maxWidth: 100, margin: 10 }}
              key={movie.getId()}
              onPress={() => handleOnPress(props.navigation, movie)}
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
export default withNavigation(MovieSlider)
