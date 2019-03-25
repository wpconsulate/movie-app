import * as React from 'react'
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import UserStats from '../components/UserStats'
import Friends from '../components/FriendsSlider'
import ProfileWatchlist from '../containers/ProfileWatchlist'
import Authentication from '../api/Authentication'
import SetOfUsers from '../api/Collection/SetOfUsers'
import { Button, Spinner, Icon, Header } from 'native-base'
import UserStore from '../stores/UserStore'
import UserAvatar from '../components/UserAvatar'
import { navigationOptions } from '../helpers/header'
import { NavigationScreenProps } from 'react-navigation'
import AutoHeightImage from 'react-native-auto-height-image'
import SettingsScreens from './SettingsScreen'
import Review from '../components/ReviewTab'
import UserReviewScreen from './UserReviewScreen'
import FriendsScreen from './FriendsScreen'
import SvgUri from 'react-native-svg-uri'
import ProfilePic from '../components/ProfilePic'
interface IState {
  userID: string
  username: string
  userAvatarColour: string
  userData: any
  userInitials: string
  isLoading: boolean
  refreshing: boolean
  following: any
}

interface IProps extends NavigationScreenProps {
  userID: string
}
export default class ProfileScreen extends React.Component<any, any> {
  static navigationOptions = navigationOptions

  constructor(props: any) {
    super(props)
    this.state = {
      isLoading: true,
      userID: ''
    }
  }
  async componentWillMount() {
    const UId = this.props.navigation.getParam('userId')
    if (UId != null) {
      this.setState({ userID: UId, isLoading: false })
    } else {
      const currUser = new Authentication()
      const userID = (currUser.getCurrentUser() as firebase.User).uid
      this.setState({ userID: userID, isLoading: false })
    }
  }
  render() {
    const { width, height } = Dimensions.get('window')
    const maxWidth = width / 3.5
    const maxHeight = height / 4.5
    return (
      <View style={{ backgroundColor: '#12152D' }}>
        <Header
          transparent
          translucent={true}
          noShadow={true}
          iosBarStyle="light-content"
        />

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
      isLoading: true,
      refreshing: false,
      userAvatarColour: '',
      userData: undefined,
      userID: '',
      username: '',
      userInitials: '',
      following: ''
    }
  }
  async componentWillMount() {
    // let currUser = new Authentication()
    // let userID = currUser.getCurrentUser().uid
    const userID = this.props.userID
    const CurrUSerDetails = await new SetOfUsers().getById(userID)
    // let CurrUSerDetails = await new SetOfUsers().getById("4ZmT7I7oZYdBy2YYaw5BS0keAhu1") //uncomment this if you dont want to login everytime to see the profile page
    this.setState({
      isLoading: false,
      userData: CurrUSerDetails,
      userAvatarColour: CurrUSerDetails.userAvatarColour,
      userID: userID,
      username: CurrUSerDetails.name,
      userInitials: CurrUSerDetails.userInitials,
      following: CurrUSerDetails.following
    })
  }

  returnFriendsSlider() {
    const fol = this.state.following
    let dataformat: any[] = []
    for (const val in fol) {
      {
        dataformat.push({
          key: fol[val].followId,
          initial: fol[val].userInitials,
          avatarColor: fol[val].userAvatarColour,
          name: fol[val].followName
        })
      }
    }
    return <Friends following={dataformat} />
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
    // show loading icon for profile page
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
        <View style={{ flex: 1, backgroundColor: '#12152D', paddingTop: 50 }}>
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
              fontSize: 30,
              fontWeight: 'bold'
            }}
          >
            Profile Page
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 5
            }}
          >
            <ProfilePic
              userIconColour={this.state.userAvatarColour}
              userInitial={this.state.userInitials}
              userID={this.props.userID}
              username={this.state.username}
            />
            <UserStats
              userData={this.state.userData}
              userId={this.state.userID}
            />
          </View>
          <View style={{ marginTop: 10, flexDirection: 'row' }}>
            {this.returnFriendsSlider()}
          </View>
          <View style={{ marginTop: 10, flexDirection: 'row' }}>
            <ProfileWatchlist userid={this.state.userID} />
          </View>
        </View>
        <Button
          onPress={() => {
            console.log('i logged out!')
            const currUser = new Authentication()
            currUser.auth.signOut().then(() => {
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

// class FriendsList extends React.Component {
//   render() {
//     return (
//       <ScrollView style={{ backgroundColor: '#12152D' }}>
//         <Text style={{
//           alignSelf: 'center',
//           color: 'white',
//           fontSize: 30,
//           fontWeight: 'bold'
//           }}>Settings</Text>

//           {/* <Review
//             review="testing this review"
//             username="shezan"
//             url="../../assets/profilePicture/p1.png"
//           />
//           <Review review="testing this review" username="shezan" url="sdfs" />
//           <Review review="testing this review" username="shezan" url="sdfs" /> */}

//       </ScrollView>
//     )
//   }
// }

// interface IState2 {
//   userID: string
//   username: string
//   userData: any
//   isLoading: boolean
//   reviewList: []
// }

// class ReviewsList extends React.Component<any, IState2> {
//   private users = new SetOfUsers()
//   constructor(props: any) {
//     super(props)
//     this.state = {
//       isLoading: true,
//       reviewList: [],
//       userData: undefined,
//       userID: '',
//       username: ''
//     }
//   }
//   async componentWillMount() {
//     const currUser = new Authentication()
//     const userID = currUser.getCurrentUser().uid
//     // let userID = "4ZmT7I7oZYdBy2YYaw5BS0keAhu1"
//     const CurrUSerDetails = await this.users.getById(userID)
//     // let CurrUSerDetails = await new SetOfUsers().getById("4ZmT7I7oZYdBy2YYaw5BS0keAhu1") //uncomment this if you dont want to login everytime to see the profile page
//     const userReviews = await this.users.getUserReviewsById(userID)

//     this.setState({
//       isLoading: false,
//       reviewList: userReviews,
//       userData: CurrUSerDetails,
//       userID: userID,
//       username: CurrUSerDetails.name
//     })
//   }e

//   render() {
//     const { isLoading } = this.state

//     if (isLoading) {
//       return (
//         <View>
//           <ActivityIndicator />
//         </View>
//       )
//     }

//     return (
//       <ScrollView style={{ backgroundColor: '#12152D' }}>
//         <Text
//           style={{
//             alignSelf: 'center',
//             color: 'red',
//             fontSize: 30,
//             fontWeight: 'bold'
//           }}
//         >
//           Your reviews
//         </Text>

//          {/* {reviewList.map((element: any) => {
//           return (
//             <Review
//               key={element.id}
//               review={element.content}
//               movieId={element.movieId}
//               rating={element.rating}
//               userId={element.userId}
//             />
//           )
//         })} */}
//       </ScrollView>
//     )
//   }
// }

// const TabNavigator = createBottomTabNavigator(
//   {
//     All: { screen: ProfileScreen },
//     Friends: { screen: FriendsScreen },
//     Review: { screen: UserReviewScreen },
//     Settings: { screen: SettingsScreens }
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused }) => {
//         const { routeName } = navigation.state
//         let type: any = 'Feather'
//         let name
//         const color = focused ? 'white' : '#686C86'
//         if (routeName === 'All') {
//           name = 'user'
//         } else if (routeName === 'Settings') {
//           name = 'settings'
//         } else if (routeName === 'Review') {
//           name = 'rate-review'
//           type = 'MaterialIcons'
//         } else if (routeName === 'Friends') {
//           name = 'users'
//         }

//         // You can return any component that you like here! We usually use an
//         // icon component from react-native-vector-icons
//         return (
//           <Icon
//             type={type}
//             name={name as string}
//             style={{ color: color, fontSize: 30, paddingTop: 5 }}
//           />
//         )
//       }
//     }),
//     tabBarOptions: {
//       activeTintColor: 'white',
//       inactiveTintColor: '#686C86',
//       labelStyle: {
//         fontSize: 15,
//         fontWeight: '400'
//       },
//       style: {
//         backgroundColor: '#1d2249',
//         height: 60
//       }
//     }
//   }
// )

// export default createAppContainer(TabNavigator)
