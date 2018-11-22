import React, { Component } from 'react';
import { View, } from 'react-native';
import { Icon } from 'native-base';
import Upcoming from '../containers/Upcoming';

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
                <Upcoming/>
            </View>
        )
    }
}
export default HomeScreen;



