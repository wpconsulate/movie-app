import * as React from 'react'
import {
  Container,
  Grid,
  Row,
  Col,
  Text,
  Content,
  Header,
  List,
  ListItem
} from 'native-base'
import { withNavigation } from 'react-navigation'
import { TouchableOpacity } from 'react-native'
import UserAvatar from '../components/UserAvatar'
import { Authentication, SetOfUsers } from '../api'
class FriendsList extends React.Component<any, any> {
  private userFollowing: any
  constructor(props: any) {
    super(props)
    this.state = {
      isLoading: true,
      data: {}
    }
  }
  async componentWillMount() {
    const currUser = new Authentication()
    const userID = (currUser.getCurrentUser() as firebase.User).uid
    const CurrUSerDetails = await new SetOfUsers().getById(userID)
    const j = CurrUSerDetails.following
    this.userFollowing = j
    this.setState({
      isLoading: false,
      data: j
    })
  }
  _handleClick(id: any, navigation: any) {
    navigation.push('Profile', { userId: id })
  }
  _returnEachFollow() {
    const { data } = this.state
    const formated: Array<any> = []
    for (const i in data) {
      formated.push(
        <ListItem
          style={{ backgroundColor: '#26293E' }}
          key={data[i].followId}
          onPress={() =>
            this._handleClick(data[i].followId, this.props.navigation)
          }
        >
          <UserAvatar
            marginRight={10}
            userInitials={data[i].userInitials}
            avatarColour={data[i].userAvatarColour}
          />
          <Text style={{ color: 'white' }}>{data[i].followName}</Text>
        </ListItem>
      )
    }
    return formated
  }
  render() {
    return (
      <Container style={{ backgroundColor: '#12152D' }}>
        <Content>
          <List style={{ backgroundColor: '#26293E' }}>
            <ListItem itemDivider>
              <Text>FOLLOWERS</Text>
            </ListItem>
            {this._returnEachFollow()}
          </List>
        </Content>
      </Container>
    )
  }
}
export default withNavigation(FriendsList)
