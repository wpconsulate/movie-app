import React, { Component } from 'react'
import {
  Container,
  Text,
  Content,
  Row,
  Col,
  Button,
  Input,
  Form,
  Item,
  Label
} from 'native-base'
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from 'react-native'
import { Database, User } from '../api'
import Authentication from '../api/Authentication'
import SetOfUsers from '../api/Collection/SetOfUsers'
import { navigationOptions } from '../helpers/header'
import { NavigationScreenProps } from 'react-navigation'
import { Avatar } from 'react-native-elements'
import { database } from 'firebase'
import UserStore from '../stores/UserStore'

interface IState {
  email: string
  isLoading: boolean
  name: string
  newPassword: string
  oldPassword: string
  userAvatarColour: string
  userData: any
  userID: string
  userInitials: string
  username: string
  isEdited: boolean
}
interface IProps extends NavigationScreenProps {}

class SettingsScreen extends Component<IProps, IState> {
  static navigationOptions = navigationOptions

  auth: Authentication
  database: Database
  private users = new SetOfUsers()
  constructor(props: NavigationScreenProps) {
    super(props)
    this.state = {
      email: '',
      isLoading: false,
      name: '',
      newPassword: '',
      oldPassword: '',
      userAvatarColour: 'blue',
      userData: undefined,
      userID: '',
      userInitials: 'MT',
      username: '',
      isEdited: false
    }
    this.database = new Database()
  }
  // logout = () => {
  //   console.log("this");
  //   // let currUser = new Authentication()
  //   // currUser.auth.signOut().then(function() {
  //   //   this.props.navigation.navigate('Home');
  //   // });
  //   console.log("ICECREAM");
  // }
  async componentWillMount() {
    const currUser = new Authentication()
    const userID = currUser.getCurrentUser().uid
    // let userID = "4ZmT7I7oZYdBy2YYaw5BS0keAhu1"
    const CurrUSerDetails = await this.users.getById(userID)
    // let CurrUSerDetails = await new SetOfUsers().getById("4ZmT7I7oZYdBy2YYaw5BS0keAhu1") //uncomment this if you dont want to login everytime to see the profile page

    this.setState({
      email: CurrUSerDetails.email,
      isLoading: true,
      name: CurrUSerDetails.name,
      userAvatarColour: CurrUSerDetails.userAvatarColour,
      userData: CurrUSerDetails,
      userID: userID,
      userInitials: CurrUSerDetails.userInitials,
      username: CurrUSerDetails.username
    })
  }

  async onRegisterPress() {
    const { isEdited, email, name, username, userInitials, userAvatarColour, userID } = this.state
    console.log(username)

    if (isEdited && name !== '' && username !== '' && userInitials !== '' && userAvatarColour !== '')
    {
      await database()
        .ref('users')
        .child(userID)
        .update({ name, username, userInitials, userAvatarColour })
    }
    else {
      Alert.alert('Please Input all the data before Registering!')
    }
  }

  setUserAvatar(name: string) {
    name = name || ''
    let charIndex = 0
    let colourChosen = ''
    let colourIndex = 0
    const colours = [
      '#1abc9c',
      '#2ecc71',
      '#3498db',
      '#9b59b6',
      '#34495e',
      '#16a085',
      '#27ae60',
      '#2980b9',
      '#8e44ad',
      '#2c3e50',
      '#f1c40f',
      '#e67e22',
      '#e74c3c',
      '#ecf0f1',
      '#95a5a6',
      '#f39c12',
      '#d35400',
      '#c0392b',
      '#bdc3c7',
      '#7f8c8d',
      '#ff00d8'
    ]
    let initials = ''
    const nameSplit = String(name)
      .toUpperCase()
      .split(' ')

    // Collects Initials of persons NAME (First and second first character)
    if (nameSplit.length === 1) {
      // console.log("Length = 1")
      initials = nameSplit[0] ? nameSplit[0].charAt(0) : ' ? '
    } else {
      // console.log("length > 1")
      initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0)
    }
    charIndex = (initials === '?' ? 72 : initials.charCodeAt(0)) - 64
    colourIndex = charIndex % 20

    colourChosen = colours[colourIndex]

    this.setState({ userInitials: initials, userAvatarColour: colourChosen })
  }

  render() {
    const {
      email,
      username,
      oldPassword,
      newPassword,
      userAvatarColour,
      userInitials,
      isLoading,
      name
    } = this.state

    if (!isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <Container style={{ backgroundColor: '#12152D', paddingBottom: 10 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Content style={{ paddingHorizontal: 30 }}>
            <Row style={{ marginTop: 30 }}>
              <Col>
                <Form>
                  <Item
                    stackedLabel={true}
                    style={{ marginLeft: 0, marginTop: 20 }}
                  >
                    {/* <Image
                style={{width: 50, height: 50}}
                source={{ uri: currPic }}
              /> */}
                    <Avatar
                      size="large"
                      rounded={true}
                      title={userInitials}
                      // title="MT"
                      overlayContainerStyle={{
                        backgroundColor: userAvatarColour
                      }}
                      activeOpacity={0.7}
                    />
                    <Text
                      style={{
                        color: '#FFF',
                        fontFamily: 'PoppinsMedium',
                        fontSize: 14,
                        marginBottom: 20,
                        marginTop: 20
                      }}
                    >
                      CURRENT PROFILE PICTURE
                    </Text>
                  </Item>
                  <Item
                    stackedLabel={true}
                    style={{ marginLeft: 0, marginTop: 20 }}
                  >
                    <Label
                      style={{
                        color: '#FFF',
                        fontFamily: 'PoppinsMedium',
                        fontSize: 16
                      }}
                    >
                      EMAIL
                    </Label>
                    <Input
                      style={{
                        color: '#FFF',
                        fontFamily: 'PoppinsMedium',
                        fontSize: 14
                      }}
                      label="EMAIL"
                      value={email}
                      autoFocus={false}
                      keyboardType="email-address"
                      autoCorrect={true}
                      disabled
                    />
                  </Item>
                  <Item
                    stackedLabel={true}
                    style={{ marginLeft: 0, marginTop: 20 }}
                  >
                    <Label
                      style={{
                        color: '#FFF',
                        fontFamily: 'PoppinsMedium',
                        fontSize: 16
                      }}
                    >
                      FULLNAME
                    </Label>
                    <Row>
                      <Input
                        style={{
                          color: '#FFF',
                          fontFamily: 'PoppinsMedium',
                          fontSize: 14
                        }}
                        label="Fullname"
                        keyboardType="default"
                        value={name}
                        onChangeText={text => {
                          this.setState({ name: text, isEdited: true })
                          this.setUserAvatar(text)
                        }}
                      />
                    </Row>
                  </Item>
                  <Item
                    stackedLabel={true}
                    style={{ marginLeft: 0, marginTop: 20 }}
                  >
                    <Label
                      style={{
                        color: '#FFF',
                        fontFamily: 'PoppinsMedium',
                        fontSize: 16
                      }}
                    >
                      USERNAME
                    </Label>
                    <Row>
                      <Input
                        style={{
                          color: '#FFF',
                          fontFamily: 'PoppinsMedium',
                          fontSize: 14
                        }}
                        value={username}
                        onChangeText={(text) => this.setState({ username: text, isEdited: true })}
                      />
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          top: -10,
                          alignSelf: 'flex-end',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      />
                    </Row>
                  </Item>
                  {
                    this.state.isEdited &&
                  <Row
                    style={{
                      alignContent: 'center',
                      justifyContent: 'center',
                      marginTop: 40
                    }}
                  >
                    <Col style={{ maxWidth: 250, marginBottom: 20 }}>
                      <Button
                        rounded={true}
                        primary={true}
                        block={true}
                        onPress={() => this.onRegisterPress()}
                        style={{ backgroundColor: '#E20F0F', minHeight: 50 }}
                      >
                        <Text>Update Account</Text>
                      </Button>
                    </Col>
                  </Row>
                  }
                  <Row
                    style={{
                      alignContent: 'center',
                      justifyContent: 'center',
                      marginTop: 10
                    }}
                  >
                    <Col style={{ maxWidth: 250, marginBottom: 20 }}>
                      <Button
                        style={{ backgroundColor: '#E20F0F', minHeight: 50 }}
                        rounded={true}
                        primary={true}
                        block={true}
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
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Content>
        </TouchableWithoutFeedback>
      </Container>
    )
  }
}
export default SettingsScreen
