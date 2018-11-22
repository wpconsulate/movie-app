import React, { Component } from 'react'
import { View, ViewStyle, StyleSheet } from 'react-native';
import Home from './screens/Home';

class App extends Component {
    render() {
        return (
            <View style={styles.HomeView}>
                <Home />
            </View>
        )
    }
}

interface IStyles{
    HomeView: ViewStyle
}
const styles = StyleSheet.create<IStyles>({
    HomeView: {
        flex:1,
        paddingTop: 25,
        backgroundColor: '#000000',
    }
  });

export default App;