import React, { Component } from "react";
import { Container, Content, Text } from "native-base";

class LoginScreen extends Component {
  static navigationOptions = {
    title: "Login"
  };
  render() {
    return (
      <Container>
        <Content>
          <Text>Login Screen</Text>
        </Content>
      </Container>
    );
  }
}

export default LoginScreen;
