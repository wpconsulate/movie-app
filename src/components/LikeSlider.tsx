import React, { Component } from 'react'
import { Modal, ScrollView, View, Image, TouchableOpacity } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import { ActionSheet } from 'native-base';

interface IDataParams {
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

const OPTIONS = [
  "Like",
  'Cancel',
]

class LikeSlider extends Component<IProps, IState> {
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
          flexDirection: 'row',
          marginTop: 10,
        }}
      >
        <ScrollView horizontal={true}>
          {images
            ? images.map((item: IDataParams, index: number) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.onPress(index)}
                    onLongPress={() =>
                      ActionSheet.show(
                        {
                          options: OPTIONS,
                          cancelButtonIndex: 4,
                          title: 'Like Menu Options',
                        },
                        buttonIndex => {
                          const option = OPTIONS[buttonIndex].toLowerCase()
                          if(option !== "Cancel")
                          {
                            console.log(option)
                          }  
                        }
                      )
                    }
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
export default LikeSlider
