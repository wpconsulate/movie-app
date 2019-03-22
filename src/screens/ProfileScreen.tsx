import * as React from 'react'
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import ProfilePic from '../components/ProfilePic'
import UserStats from '../components/UserStats'
import Friends from '../components/FriendsSlider'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Review from '../components/ReviewTab'
import ProfileWatchlist from '../containers/ProfileWatchlist'
import Authentication from '../api/Authentication'
import SetOfUsers from '../api/Collection/SetOfUsers'
import SettingsScreens from './SettingsScreen'
import { Button, Spinner } from 'native-base'
import UserStore from '../stores/UserStore'

interface IState {
  userID: string
  username: string
  userData: any
  isLoading: boolean
  refreshing: boolean
}

interface IProps {
  userID: string
}
class ProfileScreen extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      userID: '',
      isLoading: true,
    }
  }
  async componentWillMount() {
    let UId = this.props.navigation.getParam('userId')
    if (UId != null) {
      console.log('userID: ' + UId)
      this.setState({ userID: UId, isLoading: false })
    } else {
      let currUser = new Authentication()
      let userID = currUser.getCurrentUser().uid
      this.setState({ userID: userID, isLoading: false })
    }
  }
  render() {
    console.log('user states' + this.state.userID)
    return (
      <View>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <ProfileContent userID={this.state.userID} />
        )}
      </View>
    )
  }
}

class ProfileContent extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      userID: '',
      username: '',
      userData: null,
      isLoading: true,
      refreshing: false,
    }
  }
  async componentWillMount() {
    //let currUser = new Authentication()
    //let userID = currUser.getCurrentUser().uid
    const userID = this.props.userID
    const CurrUSerDetails = await new SetOfUsers().getById(userID)
    //let CurrUSerDetails = await new SetOfUsers().getById("4ZmT7I7oZYdBy2YYaw5BS0keAhu1") //uncomment this if you dont want to login everytime to see the profile page
    this.setState({
      userID: userID,
      username: CurrUSerDetails.name,
      userData: CurrUSerDetails,
      isLoading: false,
    })
  }
  // logout = () => {
  //   console.log("this");
  //   // let currUser = new Authentication()
  //   // currUser.auth.signOut().then(function() {
  //   //   this.props.navigation.navigate('Home');
  //   // });
  //   console.log("ICECREAM");
  // }
  _onRefresh = () => {
    this.setState({ refreshing: true })
    this.componentWillMount().then(() => {
      this.setState({ refreshing: false })
    })
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
      <ScrollView
        style={{ backgroundColor: '#12152D' }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <View style={{ flex: 1, backgroundColor: '#12152D', paddingTop: 5 }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 30,
              color: 'red',
              fontWeight: 'bold',
            }}
          >
            Profile Page
          </Text>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', padding: 6 }}
          >
            {/* Not asignable to style so took out -> color: 'white'}}> */}

            <ProfilePic username={this.state.username} />
            <UserStats userData={this.state.userData} />
          </View>
          <View style={{ marginTop: 10, flexDirection: 'row' }}>
            <Friends />
          </View>
          <View style={{ marginTop: 10, flexDirection: 'row' }}>
            <ProfileWatchlist userid={this.state.userID} />
          </View>
        </View>
        <Button
          onPress={() => {
            console.log('i logged out!')
            let currUser = new Authentication()
            currUser.auth.signOut().then(function() {
              UserStore.setIsLoggedIn(false)
            }) /*this.props.navigation.navigate('home');*/
          }}
        >
          <Text>Logout</Text>
        </Button>
      </ScrollView>
    )
  }
}

class FriendsList extends React.Component {
  render() {
    return (
      <View>
        <Text>Settings</Text>
        <ScrollView>
          <Review
            review="testing this review"
            username="shezan"
            url="../../assets/profilePicture/p1.png"
          />
          <Review review="testing this review" username="shezan" url="sdfs" />
          <Review review="testing this review" username="shezan" url="sdfs" />
        </ScrollView>
      </View>
    )
  }
}

interface IState2 {
  userID: string
  username: string
  userData: any
  isLoading: boolean
  reviewList: []
}

class ReviewsList extends React.Component<any, IState2> {
  private users = new SetOfUsers()
  constructor(props: any) {
    super(props)
    this.state = {
      userID: '',
      username: '',
      userData: null,
      isLoading: true,
      reviewList: null,
    }
  }
  async componentWillMount() {
    let currUser = new Authentication()
    let userID = currUser.getCurrentUser().uid
    //let userID = "4ZmT7I7oZYdBy2YYaw5BS0keAhu1"
    let CurrUSerDetails = await this.users.getById(userID)
    //let CurrUSerDetails = await new SetOfUsers().getById("4ZmT7I7oZYdBy2YYaw5BS0keAhu1") //uncomment this if you dont want to login everytime to see the profile page
    let userReviews = await this.users.getUserReviewsById(userID)

    this.setState({
      userID: userID,
      username: CurrUSerDetails.name,
      userData: CurrUSerDetails,
      isLoading: false,
      reviewList: userReviews,
    })
  }

  render() {
    const { reviewList, isLoading } = this.state

    if (isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <ScrollView style={{ backgroundColor: '#12152D' }}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 30,
            color: 'red',
            fontWeight: 'bold',
          }}
        >
          Your reviews
        </Text>

        {reviewList.map((element: any) => {
          return (
            <Review
              key={element.id}
              url={'something image'}
              review={element.content}
              numberOfDays={2}
              username={element.author}
              movieName={element.movieName}
            />
          )
        })}
      </ScrollView>
    )
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    All: { screen: ProfileScreen },
    Friends: { screen: FriendsList },
    Review: { screen: ReviewsList },
    Settings: SettingsScreens
  },
  {
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'white',
      labelStyle: {
        fontSize: 18,
        fontWeight: '400',
        textDecorationLine: 'underline',
      },
      style: {
        backgroundColor: '#12152D',
        height: 40,
      },
    },
  }
)

export default createAppContainer(TabNavigator)
