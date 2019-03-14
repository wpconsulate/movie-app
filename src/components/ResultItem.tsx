import React, { Component } from 'react';
import { Button, Text } from 'native-base';


class ResultItem extends Component<any, any> {
    onPress = (e: any) => {
        e.preventDefault()
        this.props.onPress(this.props.id)
    }

    render() {
        return (
            //@ts-ignore
            <Button block transparent onPress={this.onPress}>
                <Text>
                    {this.props.name}{' '}
                    {this.props.releaseDate ? `(${this.props.releaseDate})` : null}
                </Text>
            </Button>
        )
    }
}
export default ResultItem