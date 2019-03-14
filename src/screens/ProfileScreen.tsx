import * as React from 'react';
import { Text, View, ScrollView,ActivityIndicator, RefreshControl  } from 'react-native';
import ProfilePic from '../components/ProfilePic'
import UserStats from '../components/UserStats'
import Friends from '../components/FriendsSlider'
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';
import Review from '../components/ReviewTab'
import ProfileWatchlist from '../containers/ProfileWatchlist'
import Authentication from '../api/Authentication'
import SetOfUsers from '../api/Collection/SetOfUsers'
import SettingsScreens from '../screens/SettingsScreen'

interface IState{
  userID: string
  username: string
  userData: any
  isLoading: boolean
  refreshing: boolean
}
class OverAllStatus extends React.Component <any,IState>{
  constructor(props: any){
    super(props)
    this.state={
      userID: '',
      username: '',
      userData: null,
      isLoading: true,
      refreshing: false
    }
  }
  async componentWillMount(){
    let currUser = new Authentication()
    let userID = currUser.getCurrentUser().uid
    //let userID = "4ZmT7I7oZYdBy2YYaw5BS0keAhu1"
    let CurrUSerDetails = await new SetOfUsers().getById(userID)
    //let CurrUSerDetails = await new SetOfUsers().getById("4ZmT7I7oZYdBy2YYaw5BS0keAhu1") //uncomment this if you dont want to login everytime to see the profile page
    this.setState({userID: userID ,username: CurrUSerDetails.name, userData: CurrUSerDetails, isLoading: false})
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.componentWillMount().then(() => {
      this.setState({refreshing: false});
    });
  }
  render() {
    //show loading icon for profile page
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
        return (
      <ScrollView style={{backgroundColor: '#05111F'}}
      refreshControl={
        <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>
      }
      >
      <View style={{flex:1, backgroundColor:'#05111F', paddingTop:10}}>
            <Text style={{alignSelf: 'center', fontSize:30, color: 'white',fontWeight: 'bold'}}>Profile Page</Text>
        <View style={{flexDirection:'row', alignItems:"center", padding:5, color: 'white'}}>
          <ProfilePic username={this.state.username}/>
          <UserStats userData={this.state.userData}/>
        </View>
        <View style={{marginTop:10, flexDirection:"row"}}>
            <Friends/>
        </View>
        <View style={{marginTop:10, flexDirection:"row"}}>
            <ProfileWatchlist userid={this.state.userID}/>
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
        <Text>Settings</Text>
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
  Review:{screen: ReviewsList},
  Setting: SettingsScreens
}, {tabBarOptions: {
  activeTintColor: 'red',
  inactiveTintColor: 'white',
  labelStyle: {
    fontSize: 18,
    fontWeight:'400',
    textDecorationLine: 'underline',

  },
  style: {
    backgroundColor: '#05111F',
    height: 40
  },
}});

export default createAppContainer(TabNavigator);
