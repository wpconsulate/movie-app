import React, { Component } from 'react'
import { Modal, ScrollView, View, Image, TouchableOpacity } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'

interface IDataParams {
  url: string
  width?: number
  height?: number
}

interface IProps {
  images: Array<IDataParams>
}
interface IState {
  isModalOpened: boolean
  currentImageIndex: number
}
class Slider extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      isModalOpened: false,
      currentImageIndex: 0,
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
      isModalOpened: false,
      currentImageIndex: index,
    })
  }

  onPress(index: number) {
    this.openModal(index)
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
        }}
      >
        <ScrollView horizontal={true}>
          {this.props.images.map((item: IDataParams, index: number) => {
            return (
              <TouchableOpacity onPress={() => this.onPress(index)} key={index}>
                <Image
                  source={{ uri: item.url }}
                  style={{
                    height: item.height ? item.height : 100,
                    width: item.width ? item.width : 50,
                  }}
                />
              </TouchableOpacity>
            )
          })}
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
export default Slider
