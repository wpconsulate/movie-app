import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';

interface IProps {
    colour: string
    textColour?: string
    text?: string
}

class Pill extends Component<IProps> {
    
    
    render() {
        const shapes = StyleSheet.create({
            pill: {
                justifyContent: "center",
                backgroundColor: this.props.colour,
                borderRadius: 16,
                paddingLeft: 12,
                paddingRight: 12,
                height: 32,
                margin: 4
                
            }
        });

        return (
            <View style={[shapes.pill]}>
                <Text style={{color: this.props.textColour}}>{this.props.text}</Text>
            </View>
        )
    }
}

export default Pill;