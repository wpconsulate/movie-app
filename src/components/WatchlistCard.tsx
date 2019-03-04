import React from 'react'
import { FlatList, Text, View, Image } from 'react-native'
import { Card } from 'react-native-elements'

import { NavigationInjectedProps, withNavigation } from 'react-navigation'
// import { SetOfMovies } from "../api";
import Watchlist from '../api/Collection/Watchlist'
import { SetOfMovies } from '../api'
// import { TopRated } from "../containers";

interface IProps extends NavigationInjectedProps {
  //data: SetOfMovies
  title: String
  data: Watchlist | SetOfMovies
}

function renderStars(stars: number) {
  let starsArray = []

  for (let i = 0; i < 5; i++) {
    if (stars <= i) {
      starsArray.push(<Image source={require('../../assets/empty-star.png')} />)
    } else {
      starsArray.push(<Image source={require('../../assets/Star.png')} />)
    }
  }

  return starsArray
}

function WatchlistCard(props: IProps) {
  let title = props.title
  return (
    <View>
      <FlatList
        numColumns={3}
        data={props.data}
        renderItem={({ item: rowData }) => {
          return (
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>
                {title}
              </Text>
              <Card
                title={null}
                image={{ uri: rowData.getPoster() }} //not sure what to do about if the poster has a url but that url does that actually lead to an image
                containerStyle={{
                  padding: 0,
                  width: 90,
                  backgroundColor: '#0a006d',
                  borderColor: '#181F52',
                }}
              >
                <Text
                  style={{
                    marginBottom: 10,
                    color: '#fff',
                    textAlign: 'center',
                  }}
                >
                  {rowData.getTitle(7)}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  {renderStars(parseInt(rowData.getPopularity.toString()))}
                </View>
              </Card>
            </View>
          )
        }}
        keyExtractor={index => index.toString()}
      />
    </View>
  )
}

export default withNavigation(WatchlistCard)
