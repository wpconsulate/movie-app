import * as React from 'react'
import { Text, View, Image } from 'react-native'
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign'
// You can import from local files
interface IProps {
  username: string
}

export default class ProfilePic extends React.Component<IProps> {
  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Image
          style={{ width: 100, height: 100, borderRadius: 750 }}
          source={{
            uri:
              'https://vignette.wikia.nocookie.net/leagueoflegends/images/7/7c/Urgot_OriginalCentered.jpg/revision/latest/scale-to-width-down/1215?cb=20180414203655',
          }}
        />
        <Text style={{ fontSize: 18, color: 'red' }}>
          {this.props.username}
        </Text>
        <AntDesign name="user" color="white" />
      </View>
    )
  }
}
