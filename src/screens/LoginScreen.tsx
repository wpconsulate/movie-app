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
import { Dimensions } from 'react-native'
interface IState {}
interface IProps {}
class LoginScreen extends Component<IProps, IState> {
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
        <Content
          style={{ position: 'relative', top: '10%', paddingHorizontal: 30 }}
        >
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
                  fontSize: 12,
                  color: '#696969',
                }}
              >
                Sign in to your account
              </Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <Item floatingLabel style={{ marginLeft: 0, marginTop: 30 }}>
                  <Label>EMAIL</Label>
                  <Input label="EMAIL" autoFocus keyboardType="email-address" />
                </Item>
                <Item floatingLabel style={{ marginLeft: 0, marginTop: 30 }}>
                  <Label>PASSWORD</Label>
                  <Input
                    label="PASSWORD"
                    keyboardType="visible-password"
                    secureTextEntry
                  />
                </Item>
              </Form>
            </Col>
          </Row>
        </Content>
      </Container>
    )
  }
}

export default LoginScreen
