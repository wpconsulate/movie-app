import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { BlurView } from 'expo'
import { ActionSheet } from 'native-base'
import { EWatchlists } from '../api/Movie/Enums/Watchlists'
import { capitlize } from '../lib/string'
import Movie from '../api/Movie/Movie'
import { observer } from 'mobx-react'
import MovieStore from '../stores/MovieStore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Toast from 'react-native-simple-toast';
import UserStore from '../stores/UserStore';


interface IProps {
  movie: Movie,
  userid: string
}

// function addToWatchlist(movie: Movie, watchlist: string) {
//   console.log('movie', movie)
//   console.log('watchlist', watchlist)
// }

const OPTIONS = [
  capitlize(EWatchlists.WATCHING),
  capitlize(EWatchlists.PLANNED),
  capitlize(EWatchlists.DROPPED),
  capitlize(EWatchlists.COMPLETED),
  'Cancel',
]
const CIRCLE_SIZE = 100

const styles = StyleSheet.create({
  circle: {
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
@observer
class MovieSidebar extends React.Component<IProps, any> {
  render() {
    const { showMenu } = MovieStore
    if (showMenu) {
      return (
        <BlurView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            flex: 1,
            zIndex: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          tint="dark"
          intensity={70}
        >
          <TouchableOpacity
            style={{
              marginBottom: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            accessible
            accessibilityLabel="Add to watchlist"
            accessibilityRole="button"
            accessibilityHint="Double tap to open up an action list."
            onPress={() =>
              ActionSheet.show(
                {
                  options: OPTIONS,
                  cancelButtonIndex: 4,
                  title: 'Add to watchlist',
                },
                buttonIndex => {
                  const option = OPTIONS[buttonIndex].toLowerCase()
                  if(UserStore.isLoggedIn === true)
                  {
                    // console.log(this.props.userid)
                    this.props.movie.AddToWatchlist(this.props.userid, option)
                    Toast.show('Movie added to' + option + ' watchlist !', Toast.SHORT);
                  } else 
                  {
                    Toast.show('Please Login to add to a Watchlist !', Toast.SHORT);
                  }
                  if (option !== 'cancel') {
                    MovieStore.setShowMenu(false)
                  }
                }
              )
            }
          >
            <View style={styles.circle}>
              <MaterialIcons name="add" color="#12152D" size={52} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 50,
            }}
            accessible
            accessibilityLabel="Share with your friends"
            accessibilityRole="button"
            accessibilityHint="Double tap to share with your friends"
          >
            <View style={styles.circle}>
              <MaterialIcons name="share" color="#12152D" size={52} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            accessible
            accessibilityLabel="Like"
            accessibilityRole="button"
            accessibilityHint="Double tap to like it."
          >
            <View style={styles.circle}>
              <MaterialIcons name="thumb-up" color="#12152D" size={52} />
            </View>
          </TouchableOpacity>
        </BlurView>
      )
    }
    return <View />
  }
}

export default MovieSidebar
