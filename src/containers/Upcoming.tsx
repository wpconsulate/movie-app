import React, { Component } from 'react';
import Card from '../components/Card';
import { View } from 'native-base';
import Movie from '../api/Movie/Movie';

class Upcoming extends Component {

    _renderItem(item: Movie) {
        return (
            <Card title={item.getTitle()} bgImage="" height={0} />
        )
    }

    render() {
        return (
            <View>
                <Card title="title 1" bgImage="" height={0} />
                <Card title="title 2" bgImage="" height={0} />
                <Card title="text 3" bgImage="" height={0} />
            </View>
        )
    }
}

export default Upcoming;