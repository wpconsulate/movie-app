import React, { Component } from "react";
import {
  Button,
  Icon,
  Text,
  StyleProvider,
  Container,
  Header,
  Content
} from "native-base";
import { NavigationScreenProps } from "react-navigation";
import getTheme from "../native-base-theme/components";
import mmdb from "../native-base-theme/variables/mmdb";
import { Card } from '../components';

interface IProps {
  navigation: Object;
}

class HomeScreen extends Component<IProps> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      headerTransparent: true,
      headerBackgroundTransitionPreset: "fade",
      headerLeft: (
        <StyleProvider style={getTheme(mmdb)}>
          <Button onPress={() => navigation.navigate("Login")} transparent>
            <Icon name="person" style={{ color: "#fff" }} />
          </Button>
        </StyleProvider>
      ),
      headerTitle: (
        <StyleProvider style={getTheme(mmdb)}>
          <Button onPress={() => navigation.navigate("Home")} transparent>
            <Text
              style={{ fontFamily: "PoppinsBold", color: "#fff", fontSize: 18 }}
            >
              mmdb
            </Text>
          </Button>
        </StyleProvider>
      ),
      headerRight: (
        <StyleProvider style={getTheme(mmdb)}>
          <Button onPress={() => navigation.navigate("Search")} transparent>
            <Icon name="search" style={{ color: "#fff" }} />
          </Button>
        </StyleProvider>
      )
    };
  };
  render() {
    return (
      <Container
        style={{
          backgroundColor: "#181F52"
        }}
      >
        <Header transparent />
        <Content style={{ marginTop: 25 }}>
          <Card title="Star Wars: The Last Jedi" bgImage="https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg" height={400}  />
        </Content>
      </Container>
    );
  }
}
export default HomeScreen;
