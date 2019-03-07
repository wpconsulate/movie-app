import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { BlurView } from 'expo'
import { ActionSheet } from 'native-base'
import { EWatchlists } from '../api/Movie/Enums/Watchlists'
import { capitlize } from '../lib/string'
import Movie from '../api/Movie/Movie'

interface IProps {
  show: boolean
  movie: Movie
}

function addToWatchlist(movie: Movie, watchlist: string) {
  console.log('movie', movie)
  console.log('watchlist', watchlist)
}

const OPTIONS = [
  capitlize(EWatchlists.WATCHING),
  capitlize(EWatchlists.PLANNED),
  capitlize(EWatchlists.DROPPED),
  capitlize(EWatchlists.COMPLETED),
  'Cancel',
]
class MovieSidebar extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      show: false,
    }
  }

  componentDidMount() {
    this.setState({
      show: this.props.show,
    })
  }

  render() {
    if (this.state.show) {
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
            onPress={() =>
              ActionSheet.show(
                {
                  options: OPTIONS,
                  cancelButtonIndex: 4,
                  title: 'Add to watchlist',
                },
                buttonIndex => {
                  const option = OPTIONS[buttonIndex].toLowerCase()
                  addToWatchlist(this.props.movie, option)
                  if (option !== 'cancel') {
                    this.setState({
                      show: false,
                    })
                  }
                }
              )
            }
          >
            <Image
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
              }}
              source={require('../../assets/icons/add-watch-button.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 50,
            }}
          >
            <Image
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
              }}
              source={require('../../assets/icons/share.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
              }}
              source={require('../../assets/icons/thumbs-up.png')}
            />
          </TouchableOpacity>
        </BlurView>
      )
    }
    return <View />
  }
}

export default MovieSidebar
