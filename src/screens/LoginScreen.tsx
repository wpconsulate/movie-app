import React, { Component } from 'react'
import {
  Container,
  Text,
  Body,
  Header,
  Row,
  Col,
  StyleProvider,
  Button,
  Icon,
} from 'native-base'
import AutoHeightImage from 'react-native-auto-height-image'
import getTheme from '../native-base-theme/components'
import mmdb from '../native-base-theme/variables/mmdb'
import { NavigationScreenProps } from 'react-navigation'
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
            zIndex: -1,
          }}
          width={100}
        />
        <Body style={{ marginTop: 50 }}>
          <Row>
            <Col>
              <Text>Login</Text>
            </Col>
            <Col>
              <Text>Sign in to your account</Text>
            </Col>
          </Row>
        </Body>
      </Container>
    )
  }
}

export default LoginScreen
