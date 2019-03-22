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
import AutoHeightImage from 'react-native-auto-height-image'
import getTheme from '../native-base-theme/components'
import mmdb from '../native-base-theme/variables/mmdb'
import { NavigationScreenProps } from 'react-navigation'
import { Dimensions, Alert, ActivityIndicator } from 'react-native'
import { Authentication, Database } from '../api'

interface IState {
  email: string
  password: string
  name: string
  isLoaded: boolean
  username: string
  createDate: Date
  showPass: boolean
  userInitials: string
  userAvatarColour: string
}
interface IProps extends NavigationScreenProps { }

class RegisterScreen extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      headerTransparent: true,
      headerBackgroundTransitionPreset: 'fade',
      headerLeft: (
        <StyleProvider style={getTheme(mmdb)}>
          <Button onPress={() => navigation.navigate('Home')} transparent>
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

  auth: Authentication
  database: Database

  constructor(props: NavigationScreenProps) {
    super(props)
    this.state = {
      email: null,
      password: null,
      name: null,
      isLoaded: true,
      username: null,
      createDate: new Date(),
      showPass: true,
      userInitials: 'MT',
      userAvatarColour: '#7d7d7d'
    }

    this.auth = new Authentication()
    this.database = new Database()
  }
  // user = new User('', 'test');
  onRegisterPress() {
    const { email, password, name, username, userInitials, userAvatarColour} = this.state

    if (email !== null && password !== null && name !== null && username !== null)
    {
      this.setState({ isLoaded: false })
      this.auth
        .register(email, password, {
          email,
          name,
          username,
          userInitials,
          userAvatarColour
          
        })
        .then(() => {
          this.setState({ isLoaded: true })
          Alert.alert('Successfully registered!')
          this.props.navigation.navigate('Home');
        })
        .catch(error => {
          Alert.alert(error.message)
        })
    }
    else {
      Alert.alert('Please Input all the data before Registering!')
    }
  }

  setUserAvatar(name: string){
    name  = name || '';

    let nameSplit = String(name).toUpperCase().split(' ')
    let initials = ''
    let charIndex = 0
    let colourIndex = 0
    let colourChosen = ''
    let colours = [
      "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", 
      "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"
    ]

    //Collects initals of persons NAME (First and second first character)
    if (nameSplit.length == 1) {
      // console.log("Length = 1")
      initials = nameSplit[0] ? nameSplit[0].charAt(0):'?';
    } else {
      // console.log("length > 1")
        initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
    }
    charIndex     = (initials == '?' ? 72 : initials.charCodeAt(0)) - 64;
    colourIndex   = charIndex % 20;

    colourChosen = colours[colourIndex]
    console.log(initials)
    console.log(colourChosen)
    this.setState({ userInitials: initials, userAvatarColour: colourChosen })
  }

    

  render() {
    if (!this.state.isLoaded) {
      return (
        <Container>
          <ActivityIndicator />
        </Container>
      )
    }
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
        <Content style={{ marginTop: 60, paddingHorizontal: 30 , paddingBottom: 20}}>
          <Row
            style={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Col>
              <Text
                style={{
                  fontFamily: 'PoppinsBold',
                  fontSize: 26,
                  color: '#12152D',
                }}
              >
                Register
              </Text>
            </Col>
            <Col>
              <Text
                style={{
                  fontFamily: 'PoppinsMedium',
                  fontSize: 14,
                  color: '#696969',
                }}
              >
                Sign up for a new account
              </Text>
            </Col>
          </Row>
          <Row style={{ marginTop: 30 }}>
            <Col>
              <Form>
                <Item stackedLabel style={{ marginLeft: 0, marginTop: 20 }}>
                  <Label
                    style={{
                      fontSize: 14,
                      fontFamily: 'PoppinsMedium',
                      color: '#696969',
                    }}
                  >
                    YOUR NAME
                  </Label>
                  <Input
                    label="YOUR NAME"
                    autoFocus
                    keyboardType="name-phone-pad"
                    autoCapitalize="words"
                    value={this.state.name}
                    onChangeText={text => {
                      this.setState({ name: text }),
                      this.setUserAvatar(this.state.name)
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
                    EMAIL
                  </Label>
                  <Input
                    label="EMAIL"
                    keyboardType="email-address"
                    value={this.state.email}
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
                  <Input
                    label="USERNAME"
                    keyboardType="default"
                    value={this.state.username}
                    onChangeText={text => {
                      this.setState({ username: text })
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
                      keyboardType="default"
                      secureTextEntry={this.state.showPass}
                      value={this.state.password}
                      onChangeText={text => {
                        this.setState({ password: text })
                      }}
                    />
                    <Button onPress={() => { this.setState({ showPass: !this.state.showPass })}}  transparent>
                      <Text
                        style={{
                          color: '#E20F0F',
                          fontFamily: 'PoppinsMedium',
                          fontSize: 12,
                          fontWeight: 'bold',
                        }}
                      >
                        Show
                      </Text>
                    </Button>
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
                    CONFIRM PASSWORD
                  </Label>
                  <Row>
                  <Input
                      label="CONFIRM PASSWORD"
                      keyboardType="default"
                      secureTextEntry={this.state.showPass}
                    />
                    <Button onPress={() => { this.setState({ showPass: !this.state.showPass })}}  transparent>
                      <Text
                        style={{
                          color: '#E20F0F',
                          fontFamily: 'PoppinsMedium',
                          fontSize: 12,
                          fontWeight: 'bold',
                        }}
                      >
                        Show
                      </Text>
                    </Button>
                    </Row>
                    </Item>
                <Row
                  style={{
                    marginTop: 40,
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Col style={{ maxWidth: 250 }}>
                    <Button
                      rounded
                      primary
                      block
                      onPress={() => this.onRegisterPress()}
                      style={{ backgroundColor: '#E20F0F', minHeight: 50 }}
                    >
                      <Text>Create Account</Text>
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Row
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <Col>
              <Text>Already a user?</Text>
            </Col>
            <Col>
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.navigate('Login')
                }}
              >
                <Text>Login now</Text>
              </Button>
            </Col>
          </Row>
        </Content>
      </Container>
    )
  }
}
export default RegisterScreen
