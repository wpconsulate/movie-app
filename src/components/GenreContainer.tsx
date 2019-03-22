import React from 'react'
import { View } from 'react-native'
import { Genres } from './'

export function GenreContainer(props: any) {
  return (
    <View style={{ marginTop: 20, flexDirection: 'row' }}>
      <Genres genres={props.genres} />
    </View>
  )
}
