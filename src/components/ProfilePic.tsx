import * as React from 'react';
import { Text, View, Image } from 'react-native';
// You can import from local files


export default class ProfilePic extends React.Component {
  render() {
    return (
      <View style={{alignItems:"center"}}>
            <Image style={{width:95, height:95, borderRadius:100}} source= {{uri:"https://vignette.wikia.nocookie.net/leagueoflegends/images/7/7c/Urgot_OriginalCentered.jpg/revision/latest/scale-to-width-down/1215?cb=20180414203655"}}/>
            <Text style={{fontSize:18}}>Urgot</Text>
      </View>
            
    );
  }
}
