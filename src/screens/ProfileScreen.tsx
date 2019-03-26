import * as React from 'react'
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import UserStats from '../components/UserStats'
import Friends from '../components/FriendsSlider'
import ProfileWatchlist from '../containers/ProfileWatchlist'
import Authentication from '../api/Authentication'
import SetOfUsers from '../api/Collection/SetOfUsers'
import { Button, Spinner, Icon, Header } from 'native-base'
import { NavigationScreenProps } from 'react-navigation'
import { User } from '../api'
import { IImage } from '../api/Movie/Interfaces'
import ProfileSlider, { IDataParams } from '../components/ProfileSlider'

import ProfilePic from '../components/ProfilePic'
interface IState {
  userID: string
  username: string
  userAvatarColour: string
  userData: any
  userInitials: string
  isLoading: boolean
  refreshing: boolean
  casts: Array<IImage>
  following: any
}

interface IProps extends NavigationScreenProps {
  userID: string
}
export default class ProfileScreen extends React.Component<IProps, any> {
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
    Keyboard.dismiss
  }
  render() {
    const { width, height } = Dimensions.get('window')
    const maxWidth = width / 3.5
    const maxHeight = height / 4.5
    return (
      <View style={{ backgroundColor: '#12152D' }}>
        <StatusBar barStyle="light-content" />

        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <ProfileContent userID={this.state.userID} />
        )}
      </View>
    )
  }
}

class ProfileContent extends React.Component<any, IState> {
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
      casts: [],
      following: ''
    }
  }
  async componentWillMount() {
    const actorImages = new Array<IImage>()
    // let currUser = new Authentication()
    // let userID = currUser.getCurrentUser().uid
    const userID = this.props.userID
    const CurrUSerDetails = await new SetOfUsers().getById(userID)
    const user = new User(userID)
    const casts = (await user.getActors(userID)) as Array<IImage>
    // casts.forEach(cast => {
    //   actorImages.push({ url: cast} )
    // })

    // let CurrUSerDetails = await new SetOfUsers().getById("4ZmT7I7oZYdBy2YYaw5BS0keAhu1") //uncomment this if you dont want to login everytime to see the profile page
    this.setState({
      isLoading: false,
      userData: CurrUSerDetails,
      userAvatarColour: CurrUSerDetails.userAvatarColour,
      userID: userID,
      username: CurrUSerDetails.name,
      userInitials: CurrUSerDetails.userInitials,
      casts,
      following: CurrUSerDetails.following
    })
  }

  returnFriendsSlider() {
    const fol = this.state.following
    let dataformat: Array<any> = []
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
  _onRefresh = () => {
    this.setState({ refreshing: true })
    this.componentWillMount().then(() => {
      this.setState({ refreshing: false })
    })
  }
  render() {
    const { casts } = this.state
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
        <View
          style={{
            backgroundColor: '#12152D'
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
        <View
          style={{
            flex: 1,
            backgroundColor: '#12152D',
            padding: 10
          }}
        >
          <View style={{ marginTop: 10, flexDirection: 'row' }}>
            {this.returnFriendsSlider()}
          </View>
          <View style={{ marginTop: 10, flexDirection: 'row' }}>
            <ProfileWatchlist userid={this.state.userID} />
          </View>
          <View style={{ marginTop: 10, flexDirection: 'row' }}>
            <ProfileSlider images={casts} borderRadius={30} />
          </View>
        </View>
      </ScrollView>
    )
  }
}
