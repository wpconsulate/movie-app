import * as React from 'react';
import { Text, View } from 'react-native';
// import ProfilePic from '../components/ProfilePic'
// import UserStats from '../components/UserStats'
import ProfileWatchlist from '../containers/ProfileWatchlist';
import { NavigationScreenProps } from 'react-navigation';
// import Friends from '../components/friendsSlider'

interface IState {
  email: string
  password: string
}

interface IProps extends NavigationScreenProps {}

export default class ProfileScreen extends React.Component<IProps, IState> {


  render() {
    const { navigation } = this.props;
    const userID = navigation.getParam('userId')
    // console.log(userID);
    return (
      <View style={{flex:1, backgroundColor:'#181f52', padding:5, paddingTop:0}}>
            <Text style={{alignSelf: 'center', fontSize:20}}>My Profile</Text>
        <View style={{flexDirection:'row', alignItems:"center"}}>
          {/* <ProfilePic/> */}
          {/* <UserStats/> */}
        </View>
        <ProfileWatchlist userid={userID}/>
        {/* <Friends /> */}
      </View>
      
            
    );
  }
}
