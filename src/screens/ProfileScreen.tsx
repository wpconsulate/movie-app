import * as React from 'react';
import { Text, View } from 'react-native';
// import ProfilePic from '../components/ProfilePic'
// import UserStats from '../components/UserStats'
import ProfileWatchlist from '../containers/ProfileWatchlist';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={{flex:1, backgroundColor:'#535FB2',padding:5, paddingTop:0}}>
            <Text style={{alignSelf: 'center', fontSize:20}}>My Profile</Text>
        <View style={{flexDirection:'row', alignItems:"center"}}>
          {/* <ProfilePic/> */}
          {/* <UserStats/> */}
        </View>
        <ProfileWatchlist/>
      </View>
      
            
    );
  }
}
