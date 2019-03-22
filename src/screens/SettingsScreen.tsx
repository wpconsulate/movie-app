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
  Label,
} from 'native-base'
import { CameraRoll, Image, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { Database } from '../api'
import Authentication from '../api/Authentication'
import SetOfUsers from '../api/Collection/SetOfUsers'
import { navigationOptions } from '../helpers/header'
import { NavigationScreenProps } from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

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
  lookingAtPictures: boolean
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
      lookingAtPictures: false,
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
    let reverse = !this.state.lookingAtPictures
    this.setState({ lookingAtPictures: reverse })
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
      <Container style={{ backgroundColor: '#12152D' }} >

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Content style={{ paddingHorizontal: 30, paddingBottom: 20 }}>
              <Row style={{ marginTop: 30 }}>
            <Col>

              <Text style={{
                alignSelf: 'center', 
                fontSize:30, 
                color: 'red',
                fontWeight: 'bold',
                marginBottom: 40
              }}>
                Settings
              </Text>

              <Form>
              <Item stackedLabel style={{ marginLeft: 0, marginTop: 20 }}>
              <Image
                style={{width: 50, height: 50}}
                source={{ uri: currPic }}
              />
              <Text 
              style={{
                fontSize: 14,
                fontFamily: 'PoppinsMedium',
                color: '#FFF',
                marginBottom: 20
              }}
              >CURRENT PROFILE PICTURE</Text>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: -10,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => this._handleButtonPress()}                     
              >
                <View style={{ 
                  height: 40,
                  width: 40,
                  borderRadius: 40 / 2,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <MaterialIcons name="add" color="#12152D" size={38} />
                </View>
              </TouchableOpacity>
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
                      fontSize: 16,
                      fontFamily: 'PoppinsMedium',
                      color: '#FFF',
                    }}
                  >
                    EMAIL
                  </Label>
                  <Input
                    style={{
                      fontSize: 14,
                      fontFamily: 'PoppinsMedium',
                      color: '#FFF',
                    }}
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
                      fontSize: 16,
                      fontFamily: 'PoppinsMedium',
                      color: '#FFF',
                    }}
                  >
                    USERNAME
                  </Label>
                  <Row>
                    <Input
                      style={{
                        fontSize: 14,
                        fontFamily: 'PoppinsMedium',
                        color: '#FFF',
                      }}
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
                      fontSize: 16,
                      fontFamily: 'PoppinsMedium',
                      color: '#FFF',
                    }}
                  >
                    PASSWORD
                  </Label>
                  <Row>
                    <Input
                      style={{
                        fontSize: 14,
                        fontFamily: 'PoppinsMedium',
                        color: '#FFF',
                      }}
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
