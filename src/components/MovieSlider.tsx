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
import { Row } from 'native-base'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
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
function _ViewAllOnPress(
  navigation: NavigationScreenProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >,
  data: SetOfMovies,
  title: String
) {
  navigation.push('Results', { setOfMovie: data, query: title })
}
function renderStars(stars: number) {
  let starsArray = []

  for (let i = 0; i < 5; i++) {
    if (stars <= i) {
      starsArray.push(
        <FontAwesomeIcon key={i} name="star-o" size={10} color="white" />
      )
    } else {
      starsArray.push(
        <FontAwesomeIcon key={i} name="star" size={10} color="white" />
      )
    }
  }
  return starsArray
}
function MovieSlider(props: IProps) {
  const topRated = props.data
  return (
    <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontFamily: 'PoppinsBold',
          }}
        >
          {props.title}
        </Text>
        <TouchableOpacity
          onPress={() =>
            _ViewAllOnPress(props.navigation, topRated, props.title)
          }
        >
          <Text
            style={{
              color: '#E20F0F',
              fontSize: 15,
              fontFamily: 'PoppinsLight',
            }}
          >
            View all
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal>
        {topRated.slice(0, 10).map((movie: Movie) => {
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
              <Row
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}
              >
                {renderStars(movie.getRating())}
              </Row>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}
export default withNavigation(MovieSlider)
