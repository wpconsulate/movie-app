import React, { Component } from 'react'
import SvgUri from 'react-native-svg-uri'
import {
  Container,
  Header,
  Row,
  Content
} from 'native-base'
import {
  Dimensions,
  ActivityIndicator,
  View
} from 'react-native'
import { navigationOptions } from '../helpers/header'
import { NavigationScreenProps } from 'react-navigation'
import QrReader from '../components/QrReader'

interface IState {
    isLoading: boolean
}
interface IProps extends NavigationScreenProps {}

class QrScreen extends Component<IProps, IState> {
  static navigationOptions = navigationOptions

  constructor(props: NavigationScreenProps) {
    super(props)
    this.state = {
      isLoading: true
    }
  }
  componentDidMount() {
    this.setState({ isLoading: false })
  }

  render() {
    const { isLoading } = this.state
    const { width, height } = Dimensions.get('window')
    const maxWidth = width / 3.5
    const maxHeight = height / 4.5

    if ( isLoading ) {
      return(
        <Container style={{ backgroundColor: '#12152D' }} >
          <ActivityIndicator/>
        </Container>
      )
    }

    return (
      <Container style={{ backgroundColor: '#12152D' }} >
        <Header
          transparent
          translucent={true}
          noShadow={true}
          iosBarStyle="light-content"
          // style={{
          //   position: 'absolute',
          //   zIndex: -2,
          //   top: 0,
          //   width: '100%',
          //   height: Constants.statusBarHeight
          // }}
        >
          <View
            style={{
              position: 'absolute',
              width: maxWidth,
              height: maxHeight,
              right: 0,
              top: -34
            }}
          >
            <SvgUri
              source={require('../../assets/red-blob.svg')}
              width="100%"
              height="100%"
            />
          </View>
        </Header>
        <Content style={{ backgroundColor: '#12152D' }}  >
          <Row style={{  }} >
            <QrReader />
          </Row>
        </Content>
      </Container>
    )
  }
}
export default QrScreen
