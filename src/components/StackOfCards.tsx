import React, { Component } from 'react';
import SetOfMovies from '../api/SetOfMovies';
import Movie from '../api/Movie/Movie';
import { View, Text } from 'native-base';

interface IProps {
    data: Array<any>|SetOfMovies
}

class StackOfCards extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    _renderItem(item: Movie) {
        return (
            <View>
                <Text>{item.getTitle()}</Text>
            </View>
        )
    }

}

export default StackOfCards;