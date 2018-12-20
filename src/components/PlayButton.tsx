import React from 'react'
import { Button } from 'native-base'
import SvgUri from 'react-native-svg-uri'

interface IProps {
  onPress?: void
}
function PlayButton(props: IProps) {
  return (
    <Button
      transparent
      style={{
        width: 85,
        height: 85,
      }}
      onPress={() => props.onPress}
    >
      <SvgUri
        source={require('../../assets/icons/play-button.svg')}
        width={85}
        height={85}
      />
    </Button>
  )
}

export default PlayButton