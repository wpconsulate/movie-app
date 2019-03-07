import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';
import ProfilePic from '../components/ProfilePic'
import UserStats from '../components/UserStats'
import {TopRated} from '../containers'
import Friends from '../components/FriendsSlider'
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';
import Review from '../components/ReviewTab'
import ProfileWatchlist from '../containers/ProfileWatchlist'

//import {Container, Row, Col} from 'native-base'
// import ProfileWatchlist from '../containers/ProfileWatchlist';

// export default class ProfileScreen extends React.Component {
//   render() {
//     return (
//       <View style={{flex:1, backgroundColor:'#535FB2', paddingTop:0}}>
//             <Text style={{alignSelf: 'center', fontSize:20}}>My Profile</Text>
//         <View style={{flexDirection:'row', alignItems:"center"}}>
//           <ProfilePic/>
//           <UserStats/>
//         </View>
//         {/* <ProfileWatchlist/> */}

//         <Tabs style={{backgroundColor: '#535FB2'}} tabBarUnderlineStyle={{backgroundColor: 'red'}} tabBarBackgroundColor='#535FB2'>
//           <Tab heading="All" >
//           <View style={{marginTop:10, flexDirection:"row"}}>
//             <Friends/>
//           </View>
//           <View style={{marginTop:5, flexDirection:"row"}}>
//             <TopRated />
//           </View>
//           </Tab>
//           <Tab heading="Friends">
            
//           </Tab>
//           <Tab heading="Review">
          
//           </Tab>
//         </Tabs>

//       </View>
      
            
//     );
//   }
// }
class OverAllStatus extends React.Component {
  render() {
        return (
          <ScrollView style={{backgroundColor: '#535FB2'}}>
      <View style={{flex:1, backgroundColor:'#535FB2'}}>
            <Text style={{alignSelf: 'center', fontSize:20}}>My Profile</Text>
        <View style={{flexDirection:'row', alignItems:"center", padding:5}}>
          <ProfilePic/>
          <UserStats/>
        </View>
        <View style={{marginTop:10, flexDirection:"row"}}>
            <Friends/>
          </View>
          <View style={{marginTop:10, flexDirection:"row"}}>
            <TopRated />
          </View>
          <View style={{marginTop:10, flexDirection:"row"}}>
            <TopRated />
            <ProfileWatchlist userid={"1"}/>
          </View>
      </View>
      </ScrollView>
      
            
    );
  }
}

class FriendsList extends React.Component {
  render() {
    return (
      <View>
        <Text>Settings!</Text>
        <ScrollView > 
        <Review review="testing this review" username="shezan" url="../../assets/profilePicture/p1.png"/>
        <Review review="testing this review" username="shezan" url="sdfs"/>
        <Review review="testing this review" username="shezan" url="sdfs"/>
        
        </ScrollView>
      </View>
    );
  }
}

class ReviewsList extends React.Component {
  render() {
    return (
      <View>
        <ScrollView>
        <Review review="testing this review" username="shezan" url="sdfs"/>
        <Review review="testing this review" username="shezan" url="sdfs"/>
        <Review review="testing this review" username="shezan" url="sdfs"/>
        <Review review="testing this review" username="shezan" url="sdfs"/>
        <Review review="testing this review" username="shezan" url="sdfs"/>
         </ScrollView>
      </View>
    );
  }
}
const TabNavigator = createBottomTabNavigator({
  All: { screen: OverAllStatus },
  Friends: { screen: FriendsList },
  Review:{screen: ReviewsList}
}, {tabBarOptions: {
  activeTintColor: 'red',
  inactiveTintColor: 'white',
  labelStyle: {
    fontSize: 18,
    fontWeight:'400',
    textDecorationLine: 'underline',
    
  },
  style: {
    backgroundColor: '#535FB2',
    height: 40
  },
}});

export default createAppContainer(TabNavigator);

