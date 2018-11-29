import React, { Component } from 'react'
import {
  Text,
  Container,
  Content
} from "native-base";

interface IProps {
  navigation: Object
}
export default class ProfileScreen extends Component<IProps> {
  
  render() {
    return (
      <Container
        style={{
          backgroundColor: '#000000',
          paddingHorizontal: 25,
        }}
      >
        <Content>
            <Text>dsfsafdsfdsafdsa</Text>
        </Content>
      </Container>
    )
  }
}
