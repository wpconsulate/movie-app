import React, { Component } from "react";
import { View, Text } from "react-native";

class SearchScreen extends Component {
  static navigationOptions = {
    title: "Search"
  };
  render() {
    return (
      <View>
        <Text>Search Screen</Text>
      </View>
    );
  }
}

export default SearchScreen;
