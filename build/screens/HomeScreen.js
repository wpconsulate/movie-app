import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Icon } from 'native-base';
class HomeScreen extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (React.createElement(View, null,
            React.createElement(Text, null, "HomeScreen"),
            React.createElement(Button, { title: "Go to login", onPress: () => navigate('Login') })));
    }
}
HomeScreen.navigationOptions = {
    headerLeft: React.createElement(Icon, { name: "fas fa-user" }),
    title: "mmdb",
    headerRight: React.createElement(Icon, { name: "fas fa-search" }),
};
export default HomeScreen;
//# sourceMappingURL=HomeScreen.js.map