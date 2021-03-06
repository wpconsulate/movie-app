import React, { Component } from 'react'
import { Modal, ScrollView, View, Image, TouchableOpacity, Text } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'

export interface IDataParams {
  url: string
  width?: number
  height?: number
}

interface IProps {
  images: Array<IDataParams>
  borderRadius?: number
  width?: number | string
  height?: number | string
}
interface IState {
  isModalOpened: boolean
  currentImageIndex: number
}

class ProfileSlider extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      currentImageIndex: 0,
      isModalOpened: false
    }
  }

  openModal(index: number) {
    this.setState({
      isModalOpened: true,
      currentImageIndex: index,
    })
  }

  closeModal(index: number) {
    this.setState({
      currentImageIndex: index,
      isModalOpened: false
    })
  }

  onPress(index: number) {
    this.openModal(index)
  }

  render() {
    const { borderRadius, images, height, width } = this.props
    return (
      <View
        style={{
            flex: 1,
            // flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20
          }}
      ><Text style={{
        color: 'white',
        fontSize: 20,
        marginLeft: 10,
        fontFamily: 'PoppinsBold',
        marginBottom:30,
      }}>
      Actor's Liked</Text>
      
        <ScrollView style={{}} horizontal={true}>
          {images
            ? images.map((item: IDataParams, index: number) => {
                let ice = JSON.stringify(item.url);
                if (ice.charAt(0) === '"' && ice.charAt(ice.length -1) === '"')
                {
                    item.url = ice.substr(1,ice.length -2);
                }
              return (
                  <TouchableOpacity
                    onPress={() => this.onPress(index)}
                    key={index}
                  >
                    <Image
                      source={{ uri: item.url }}
                      style={{
                        height: height ? height : 75,
                        width: width ? width : 100,
                        marginRight: 15,
                        borderRadius: borderRadius ? borderRadius : 0,
                      }}
                    />
                  </TouchableOpacity>
                )
              })
            : ''}
          <Modal
            visible={this.state.isModalOpened}
            transparent={true}
            onRequestClose={() => this.closeModal}
          >
            <ImageViewer
              imageUrls={this.props.images}
              enableSwipeDown
              enableImageZoom
              onSwipeDown={() => this.closeModal(this.state.currentImageIndex)}
              index={this.state.currentImageIndex}
            />
          </Modal>
        </ScrollView>
      </View>
    )
  }
}
export default ProfileSlider
