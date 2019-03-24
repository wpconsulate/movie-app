import React from 'react'
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { BlurView } from 'expo'
import { ActionSheet } from 'native-base'
import { EWatchlists } from '../api/Movie/Enums/Watchlists'
import { capitlize } from '../lib/string'
import Movie from '../api/Movie/Movie'
import { observer } from 'mobx-react'
import MovieStore from '../stores/MovieStore'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import Toast from 'react-native-simple-toast';
import UserStore from '../stores/UserStore'
import Likes, { ReviewType } from '../api/Collection/Likes';

interface IProps {
  movie: Movie
  userid: string
  likes : Likes
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
  },
})
@observer
class MovieSidebar extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      disabled : false,
    }
  }
 
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
                  if(option !== "cancel")
                  {
                    if(UserStore.isLoggedIn === true)
                    {
                      this.props.movie.AddToWatchlist(this.props.userid, option)
                      Alert.alert('Movie added to watchlist!')
                    } else 
                    {
                      Alert.alert('Please Login to add to Watchlist')
                    }
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
          <TouchableOpacity disabled={this.state.disabled}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            accessible
            accessibilityLabel="Like"
            accessibilityRole="button"
            accessibilityHint="Double tap to like it."
            onPress={() => {
              this.props.likes.create(this.props.movie.getId(), ReviewType.movie)
              Alert.alert("You have liked this Movie!")
              this.setState({disabled: true})
            }}
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
