import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Home from './screens/Home';
class App extends Component {
    render() {
        return (React.createElement(View, { style: styles.HomeView },
            React.createElement(Home, null)));
    }
}
const styles = StyleSheet.create({
    HomeView: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: '#000000',
    }
});
export default App;
//# sourceMappingURL=App.js.map