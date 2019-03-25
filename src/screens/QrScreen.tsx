import React, { Component } from 'react'
import {
  Container,
  Header,
  Row,
  Content
} from 'native-base'
import {
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
  View
} from 'react-native'
import { navigationOptions } from '../helpers/header'
import { NavigationScreenProps } from 'react-navigation'
import AutoHeightImage from 'react-native-auto-height-image'
import QrReader from '../components/QrReader'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface IState {
    isLoading: boolean
    show: boolean
}
interface IProps extends NavigationScreenProps {}

class QrScreen extends Component<IProps, IState> {
  static navigationOptions = navigationOptions

  constructor(props: NavigationScreenProps) {
    super(props)
    this.state = {
      isLoading: true,
      show: false
    }
  }
  componentDidMount() {
    this.setState({ isLoading: false })
  }

  render() {
    const { isLoading, show } = this.state

    if ( isLoading ) {
      return(
        <Container style={{ backgroundColor: '#12152D' }} >
          <ActivityIndicator/>
        </Container>
      )
    }

    return (
      <Container style={{ backgroundColor: '#12152D' }} >
        <Header transparent translucent iosBarStyle="light-content" noShadow />
        <AutoHeightImage
          source={require('../../assets/header.png')}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: '15%',
          }}
          width={Dimensions.get('window').width}
        />
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
