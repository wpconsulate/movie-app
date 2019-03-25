import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Authentication, User, SetOfUsers } from '../api'
import UserAvatar from './UserAvatar'

interface IProps {
  username: string
  userID: any
  userInitial: string
  userIconColour: string
}

export default class ProfilePic extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      hasFollow: false,
      loggedinUserID: '',
      loggedinUserName: '',
      friendIconColor: 'white',
      isFollowing: false,
      text: 'Follow'
    }
  }
  async componentWillMount() {
    const id = new Authentication().getCurrentUser().uid
    const loggedinUser = await new SetOfUsers().getById(id)
    if (this.props.userID != id) {
      this.CheckIfBothAreConnected(loggedinUser.following)
    }
    this.setState({ loggedinUserID: id, loggedinUserName: loggedinUser.name })
  }
  CheckIfBothAreConnected(following: any) {
    let found = false
    for (const key in following) {
      for (const value in following[key]) {
        if (following[key][value] === this.props.userID) {
          found = true
          break
        }
      }
    }
    if (found) {
      this.setState({
        friendIconColor: '#686C86',
        isFollowing: true,
        text: 'Unfollow'
      })
    }
  }
  _handleFollowPress = async () => {
    if (this.state.loggedinUserID === '') {
      alert('login to follow')
      return
    }
    let currentUser = new User({
      id: this.state.loggedinUserID,
      name: this.state.loggedinUserName
    })
    if (this.state.isFollowing) {
      alert('you have unfollowed ' + this.props.username)
      currentUser.unFollow(this.props.userID)
      this.setState({
        text: 'Follow',
        friendIconColor: 'white',
        isFollowing: !this.state.isFollowing
      })
    } else {
      await currentUser.addFollowToList(
        this.props.userID,
        this.props.username,
        this.props.userInitial,
        this.props.userIconColour
      )
      this.setState({
        friendIconColor: '#686C86',
        text: 'Unfollow',
        isFollowing: !this.state.isFollowing
      })

      //add pushnotification
      // await database()
      //           .ref('users')
      //           .child(this.props.userId)
      //           .once('value', snap => {
      //             console.log('snap', snap.val())
      //             if (snap.exists()) {
      //               if (snap.val().expoPushToken) {
      //                 console.log('attempting to send notification')
      //                 sendPushNotification(
      //                   snap.val().expoPushToken,
      //                   'Mmdb: Review Liked!',
      //                   `${this.state.username} liked your review.`
      //                 )
      //               }
      //             }
      //           })
      //         await database()
      //           .ref('review')
      //           .child(this.props.movieId.toString())
      //           .child(this.props.userId)
      //           .child('likes')
      //           .push({ userId: this.auth.getCurrentUser().uid })
    }
  }
  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: 'red' }}>
          {this.props.username}
        </Text>

        <UserAvatar
          userInitials={this.props.userInitial}
          avatarColour={this.props.userIconColour}
        />

        {this.state.loggedinUserID != this.props.userID ? (
          <TouchableOpacity onPress={() => this._handleFollowPress()}>
            {/* <Icon
              name={'user-follow'}
              type="SimpleLineIcons"
              style={{ fontSize: 30, color: this.state.friendIconColor }}
            /> */}
            <Text
              style={{
                borderRadius: 50,
                marginTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: this.state.friendIconColor
              }}
            >
              {this.state.text}
            </Text>
          </TouchableOpacity>
        ) : (
          undefined
        )}
      </View>
    )
  }
}
