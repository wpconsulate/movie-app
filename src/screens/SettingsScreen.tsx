import React, { Component } from 'react'
import {
  Container,
  Text,
  Content,
  Header,
  Row,
  Col,
  StyleProvider,
  Button,
  Icon,
  Input,
  Form,
  Item,
  Label,
} from 'native-base'
import getTheme from '../native-base-theme/components'
import mmdb from '../native-base-theme/variables/mmdb'
import { NavigationScreenProps } from 'react-navigation'
import AutoHeightImage from 'react-native-auto-height-image'
import { Dimensions, CameraRoll, Image, TouchableOpacity, } from 'react-native'
import { Database } from '../api'

interface IState {
  email: string
  password: string
  darkmode: boolean
  userPic: any
  currPic: string
  selectedPic: string
}
interface IProps extends NavigationScreenProps {}

class SettingsScreen extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      headerTransparent: true,
      headerBackgroundTransitionPreset: 'fade',
      headerLeft: (
        <StyleProvider style={getTheme(mmdb)}>
          <Button onPress={() => navigation.navigate('Login')} transparent>
            <Icon name="close" style={{ color: '#fff' }} />
          </Button>
        </StyleProvider>
      ),
      headerTitle: (
        <StyleProvider style={getTheme(mmdb)}>
          <Button onPress={() => navigation.navigate('Home')} transparent>
            <Text
              style={{ fontFamily: 'PoppinsBold', color: '#fff', fontSize: 18 }}
            >
              mmdb
            </Text>
          </Button>
        </StyleProvider>
      ),
    }
  }


  database: Database

  constructor(props: NavigationScreenProps) {
    super(props)
    this.state = {
      email: "Dummy email",
      password: "Dummy pass",
      darkmode: false,
      userPic: [],
      selectedPic: '',
      currPic: 'http://www.cruciblefactory.com/images/membersprofilepic/noprofilepicture.gif',
    }
    this.database = new Database()
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
    const { email, password, userPic, selectedPic, currPic } = this.state

    return (
      <Container>
        <Header transparent />
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
                    PASSWORD
                  </Label>
                  <Row>
                    <Input
                      label="PASSWORD"
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
      </Container>
    )
  }
}
export default SettingsScreen
