import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Icon } from 'native-base';

interface IProps {
    navigation: any
}

class HomeScreen extends Component<IProps> {

    static navigationOptions = {
        headerLeft: <Icon name="fas fa-user" />,
        title: "mmdb",
        headerRight: <Icon name="fas fa-search" />,

    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>HomeScreen</Text>
                <Button title="Go to login" onPress={() => navigate('Login')} />
            </View>
        )
    }
}
export default HomeScreen;