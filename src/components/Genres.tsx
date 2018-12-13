import React, { Component } from 'react'
import { View } from 'react-native'
import { Badge, Text } from 'native-base'
import { IGenre } from '../api/Movie/Interfaces'
interface IProps {
  genres: Array<IGenre>
}
export default class Genres extends Component<IProps> {
  constructor(props: IProps) {
    super(props)
  }
  render() {
    const { genres } = this.props
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
        }}
      >
        {genres.map((genre: IGenre) => {
          return (
            <Badge
              key={genre.id}
              style={{ backgroundColor: '#26293E', marginRight: 15 }}
            >
              <Text style={{ color: '#4F547E' }}>{genre.name}</Text>
            </Badge>
          )
        })}
      </View>
    )
  }
}
