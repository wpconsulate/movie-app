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
import Upcoming from "../containers/Upcoming";
import { NavigationScreenProps } from "react-navigation";
import getTheme from "../native-base-theme/components";
import mmdb from "../native-base-theme/variables/mmdb";
import SetOfMovies from '../api/SetOfMovies';
import Movie from '../api/Movie/Movie';

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

  private movies = new SetOfMovies();

  async renderMovies() {
    const setOfMovies = await this.movies.getUpcomingMovies();
    console.log(setOfMovies);
  }

  componentDidMount() {
    this.renderMovies();
  }

  render() {
    return (
      <Container
        style={{
          backgroundColor: "#181F52"
        }}
      >
        <Header transparent />
        <Content style={{ marginTop: 25 }}>
          <Upcoming />
        </Content>
      </Container>
    );
  }
}
export default HomeScreen;
