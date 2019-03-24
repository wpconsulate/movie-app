import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'
import { Constants, BarCodeScanner, Permissions } from 'expo'

interface IProps {
    show: boolean
}

interface IState {
    hasCameraPermission: boolean
}

export default class App extends Component <IProps, IState> {
    constructor(props: any) {
        super(props)    
        this.state = {
            hasCameraPermission: false
        }    
    }

  componentDidMount() {
    this._requestCameraPermission()
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermission: status === 'granted'
    })
  }

  _handleBarCodeRead = data => {
    Alert.alert(
      'Scan successful!',
      JSON.stringify(data)
    )
    const test = JSON.stringify(data)
    console.log(test)
  }

  render() {
    const { show } = this.props

    if (!show){
        return(
            <View/>
        )
    }

    return (
      <View style={{ backgroundColor: '#12152D' }}>
        {this.state.hasCameraPermission === undefined ?
          <Text>Requesting for camera permission</Text> :
          this.state.hasCameraPermission === false ?
            <Text>Camera permission is not granted</Text> :
            <BarCodeScanner
                onBarCodeScanned={this._handleBarCodeRead}
                style={{ height: 300, width: 300 }}
            />
        }
      </View>
    )
  }
}
