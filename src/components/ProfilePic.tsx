import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Authentication, User, SetOfUsers } from '../api'
interface IProps {
  username: string
  userID: any
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
      text: 'Follow',
    }
  }
  async componentWillMount() {
    let id = new Authentication().getCurrentUser().uid
    let loggedinUser = await new SetOfUsers().getById(id)
    if (this.props.userID != id)
      this.CheckIfBothAreConnected(loggedinUser.following)
    this.setState({ loggedinUserID: id, loggedinUserName: loggedinUser.name })
  }
  CheckIfBothAreConnected(following: any) {
    let found = false
    for (let key in following) {
      for (let value in following[key]) {
        if (following[key][value] == this.props.userID) {
          found = true
          break
        }
      }
    }
    if (found)
      this.setState({
        friendIconColor: '#686C86',
        isFollowing: true,
        text: 'Unfollow',
      })
  }
  _handleFollowPress = async () => {
    if (this.state.loggedinUserID === '') {
      alert('login to follow')
      return
    }
    let currentUser = new User({
      id: this.state.loggedinUserID,
      name: this.state.loggedinUserName,
    })
    if (this.state.isFollowing) {
      alert('you have unfollowed ' + this.props.username)
      await currentUser.unFollow(this.props.userID)
      this.setState({
        text: 'Follow',
        friendIconColor: 'white',
        isFollowing: !this.state.isFollowing,
      })
    } else {
      await currentUser.addFollowToList(this.props.userID, this.props.username)
      this.setState({
        friendIconColor: '#686C86',
        text: 'Unfollow',
        isFollowing: !this.state.isFollowing,
      })
    }
  }
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
                padding: 5,
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: this.state.friendIconColor,
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
