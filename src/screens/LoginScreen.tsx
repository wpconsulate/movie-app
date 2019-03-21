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
import { Dimensions, Alert, TouchableWithoutFeedback } from 'react-native'
import { Authentication } from '../api'
import UserStore from '../stores/UserStore';
import {Keyboard} from 'react-native'

interface IState {
  email: string
  password: string
  showPass: boolean
}
interface IProps extends NavigationScreenProps { }

class LoginScreen extends Component<IProps, IState> {
  public navigationOptions = ({ navigation }: NavigationScreenProps) => {
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
  private auth: Authentication

  constructor(props: NavigationScreenProps) {
    super(props)
    this.state = {
      email: null,
      password: null,
      showPass: true,
    }
    this.auth = new Authentication()
  }

  onLoginPress() {

    const { email, password } = this.state
    this.auth
      .login(email, password)
      .then(() => {
        Alert.alert('Successfully logged in!')
        this.props.navigation.navigate("Profile", {
          userId: this.auth.getCurrentUser().uid,
        })
        UserStore.setIsLoggedIn(true)
      })
      .catch((error: any) => {
        Alert.alert(error.message)
      })
  }

  render() {
    const { email, password } = this.state
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Content style={{ marginTop: 60, paddingHorizontal: 30 }}>
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
                Login
              </Text>
            </Col>
            <Col>
              <Text
                style={{
                  fontFamily: 'PoppinsMedium',
                  fontSize: 14,
                  color: 'black',
                  fontWeight: 'bold'
                }}
              >
                Sign in to your account
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
                      fontWeight: 'bold'
                    }}
                  >
                    EMAIL@
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
                    PASSWORD*
                  </Label>
                  <Row>
                    <Input
                      label="PASSWORD"
                      keyboardType="default"
                      secureTextEntry={this.state.showPass}
                      value={password}
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
                      onPress={() => this.onLoginPress()}
                      style={{ backgroundColor: '#E20F0F', minHeight: 50 }}
                    >
                      <Text>LOGIN</Text>
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
              <Text style= {{ fontFamily: 'PoppinsMedium'}}>Don't have an account?</Text>
            </Col>
            <Col>
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.navigate('Register')
                }}
              >
                <Text style= {{ fontFamily: 'PoppinsMedium'}}>Register Now</Text>
              </Button>
            </Col>
          </Row>
        </Content>
        </TouchableWithoutFeedback>
      </Container>
    )
  }
}
export default LoginScreen
