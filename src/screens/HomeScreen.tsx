import React, { Component } from 'react';
import { View, } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import Upcoming from '../containers/Upcoming';
import { NavigationActions } from 'react-navigation';
import { Font } from 'expo';

interface IProps {
    navigation: any
}

class HomeScreen extends Component<IProps> {

    static navigationOptions = (navigation) => {
        return {
            headerLeft: (
                <Button onPress={() => NavigationActions.navigate({ routeName:  'Login'})}>
                    <Icon name='person' />
                </Button>
            ),
            headerTitle: (
                <Button onPress={() => NavigationActions.navigate({ routeName:  'Home'})}>
                    <Text>mmdb</Text>
                </Button>
            ),
            headerRight: (
                <Button onPress={() => NavigationActions.navigate({ routeName:  'Search'})}>
                    <Icon name='search' />
                </Button>
            ),
        };
    };

    async componentWillMount() {
        await Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
      }
      

    render() {
        // const { navigate } = this.props.navigation;
        return (
            <View>
                <Upcoming/>
            </View>
        )
    }
}
export default HomeScreen;



