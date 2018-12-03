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
  View,
} from 'native-base'
import AutoHeightImage from 'react-native-auto-height-image'
import getTheme from '../native-base-theme/components'
import mmdb from '../native-base-theme/variables/mmdb'
import { NavigationScreenProps } from 'react-navigation'
import { Dimensions } from 'react-native'
interface IState {}
interface IProps {}

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

  render() {
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
                  <Input label="EMAIL" keyboardType="email-address" />
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
                    />
                    <Button transparent>
                      <Text
                        style={{
                          color: '#E20F0F',
                          fontFamily: 'PoppinsMedium',
                          fontSize: 12,
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
                  <Input
                    label="CONFIRM PASSWORD"
                    keyboardType="visible-password"
                    secureTextEntry
                  />
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
              <Button transparent>
                <Text>Login now</Text>
              </Button>
            </Col>
          </Row>
          <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Col>
              <View />
            </Col>
            <Col>
              <Text>OR WITH</Text>
            </Col>
            <Col>
              <View />
            </Col>
          </Row>
          <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Col>
              <Button rounded primary>
                <Icon type="FontAwesome" name="facebook" />
              </Button>
            </Col>
            <Col>
              <Button rounded primary>
                <Icon type="FontAwesome" name="google-plus" />
              </Button>
            </Col>
            <Col>
              <Button rounded primary>
                <Icon type="FontAwesome" name="twitter" />
              </Button>
            </Col>
          </Row>
        </Content>
      </Container>
    )
  }
}
export default RegisterScreen
