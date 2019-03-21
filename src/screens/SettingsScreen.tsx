import React, { Component } from 'react'
import {
  Container,
  Text,
  Content,
  Header,
  Row,
  Col,
  Button,
  Input,
  Form,
  Item,
  Label,
} from 'native-base'
import { Dimensions, CameraRoll, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { Database } from '../api'
import Authentication from '../api/Authentication'
import SetOfUsers from '../api/Collection/SetOfUsers'
import { navigationOptions } from '../helpers/header'
import { NavigationScreenProps } from 'react-navigation'
import AutoHeightImage from 'react-native-auto-height-image'

interface IState {
  userID: string
  username: string
  password: string
  userData: any
  email: string
  darkmode: boolean
  userPic: any
  currPic: string
  selectedPic: string
}
interface IProps extends NavigationScreenProps {}

class SettingsScreen extends Component<IProps, IState> {
  static navigationOptions = navigationOptions



  database: Database

  constructor(props: NavigationScreenProps) {
    super(props)
    this.state = {
      userID: '',
      username: '',
      password: '',
      userData: null,
      email: '',
      darkmode: false,
      userPic: [],
      selectedPic: '',
      currPic: 'http://www.cruciblefactory.com/images/membersprofilepic/noprofilepicture.gif',
    }
    this.database = new Database()
  }
  

  async componentWillMount(){
    let currUser = new Authentication()
    let userID = currUser.getCurrentUser().uid
    //let userID = "4ZmT7I7oZYdBy2YYaw5BS0keAhu1"
    let CurrUSerDetails = await new SetOfUsers().getById(userID)
    //let CurrUSerDetails = await new SetOfUsers().getById("4ZmT7I7oZYdBy2YYaw5BS0keAhu1") //uncomment this if you dont want to login everytime to see the profile page
    this.setState({userID: userID ,username: CurrUSerDetails.name, userData: CurrUSerDetails, email: CurrUSerDetails.email })
  }

  setPic(newP: any){
    this.setState({ currPic: newP })
    this.setState({ userPic: [] })
  }

  _handleButtonPress = () => {
    CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
      })
      .then(r => {
        console.log(r)
        this.setState({ userPic: r.edges })
      })
      .catch((err) => {
        console.log(err)
         //Error Loading Images
      });
    };

  render() {
    const { email, username, userPic, selectedPic, currPic , password} = this.state

    return (
      <Container>
        <Header
          transparent
          translucent
          iosBarStyle="light-content"
          noShadow
        />
        <AutoHeightImage
          source={require('../../assets/header.png')}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            width: '100%',
          }}
          width={Dimensions.get('window').width}
        />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Content style={{ marginTop: 60, paddingHorizontal: 30, paddingBottom: 20 }}>

              <Row style={{ marginTop: 30 }}>
            <Col>

              <Text style={{
                fontSize: 16,
                textDecorationLine: 'underline',
                fontFamily: 'PoppinsMedium',
                color: '#000',
              }}>
                Login information
              </Text>

              <Form>
              <Item stackedLabel style={{ marginLeft: 0, marginTop: 20 }}>
              <Image
                   style={{width: 50, height: 50}}
                   source={{ uri: currPic }}
              />
              <Text>CURRENT PROFILE PICTURE</Text>
              <Button
                      onPress={() => this._handleButtonPress()}
                      rounded
                      primary
                      block
                      style={{ backgroundColor: '#E20F0F', minHeight: 50 }}
                    >
                      <Text>Select Picture</Text>
              </Button>
              </Item>
              <Item stackedLabel style={{ marginLeft: 0, marginTop: 20 }}>
              {userPic.map((p: any, i: number) => {
              return (
                <TouchableOpacity key={i} onPress={() => this.setState({ selectedPic: p.node.image.uri })} >
                    <Image
                    style={{width: 50, height: 50}}
                    source={{ uri: p.node.image.uri }}
                    />
                    <Text> Picture: {i} </Text>
                </TouchableOpacity>
                );
              })}
              <Button
                onPress={() => this.setPic(selectedPic)}
                rounded
                primary
                block
                style={{ backgroundColor: '#E20F0F', minHeight: 50 }}
              >
                <Text>confirm Picture</Text>
              </Button>
              </Item>
                <Item stackedLabel style={{ marginLeft: 0, marginTop: 20 }}>
                  <Label
                    style={{
                      fontSize: 14,
                      fontFamily: 'PoppinsMedium',
                      color: '#696969',
                    }}
                  >
                    EMAIL
                  </Label>
                  <Input
                    label="EMAIL"
                    autoFocus
                    keyboardType="email-address"
                    autoCorrect
                    value={email}
                    onChangeText={text => {
                      this.setState({ email: text })
                    }}
                  />
                </Item>
                <Item stackedLabel style={{ marginLeft: 0, marginTop: 20 }}>
                  <Label
                    style={{
                      fontSize: 14,
                      fontFamily: 'PoppinsMedium',
                      color: '#696969',
                    }}
                  >
                    USERNAME
                  </Label>
                  <Row>
                    <Input
                      label="Username"
                      keyboardType="default"
                      value={username}
                      onChangeText={text => {
                        this.setState({ username: text })
                      }}
                    />
                  </Row>
                </Item>   
                <Item stackedLabel style={{ marginLeft: 0, marginTop: 20 }}>
                  <Label
                    style={{
                      fontSize: 14,
                      fontFamily: 'PoppinsMedium',
                      color: '#696969',
                    }}
                  >
                    PASSWORD
                  </Label>
                  <Row>
                    <Input
                      label="Password"
                      keyboardType="visible-password"
                      secureTextEntry
                      value={password}
                      onChangeText={text => {
                        this.setState({ password: text })
                      }}
                    />
                  </Row>
                </Item>              
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
