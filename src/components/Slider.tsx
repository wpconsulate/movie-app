import React from 'react'
import { Modal } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'

interface IDataParams {
  url: string
  width?: number
  height?: number
}

interface IProps {
  images: Array<IDataParams>
}

function Slider(props: IProps) {
  return (
    <Modal visible={false} transparent={true}>
      <ImageViewer imageUrls={props.images} enableSwipeDown enablePreload />
    </Modal>
  )
}

export default Slider
