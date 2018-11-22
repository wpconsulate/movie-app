import React, { Component } from "react";
import RootStack from "./Navigation";
import { createAppContainer } from "react-navigation";

const AppContainer = createAppContainer(RootStack);
class App extends Component {
  render() {
    return <AppContainer />;
  }
}

export default App;
