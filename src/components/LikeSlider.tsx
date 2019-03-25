import React, { Component } from 'react'
import { Modal, ScrollView, View, Image, TouchableOpacity, Alert } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import { ActionSheet } from 'native-base';
import { User } from '../api';

interface IDataParams {
  url: string
  width?: number
  height?: number
}

interface IProps {
  images: Array<IDataParams>
  userid : string
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
    this.user = new User(this.props.userid)
  }
  user : User

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

  async componentWillMount() {
    
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
                            if(this.props.userid == null)
                          {
                            Alert.alert("Please Login First!")
                          } else{
                            const stringed = JSON.stringify(item.url);
                            let removeSpeech = stringed.substring(1, stringed.length-1);
                            removeSpeech = removeSpeech.substring(0, removeSpeech.indexOf('?'));
                            this.user.addFavActor(removeSpeech, this.props.userid)
                          }
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
