import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ViewStyle, ImageStyle, TextStyle } from 'react-native';

interface IProps {
    colour?: string
    text: string
}
interface IStyles {
    card: ViewStyle,
    image: ImageStyle,
    text: TextStyle
}
class MovieCard extends Component<IProps> {
    
    
    render() {
        let pic = {
            uri: 'http://www.gstatic.com/tv/thumb/v22vodart/12543972/p12543972_v_v8_ab.jpg'
          };
        const shapes = StyleSheet.create<IStyles>({
            card: { 
                alignItems: 'center'
            },
            image: {
                width: 325, 
                height: 338,
                borderRadius: 16,
            },
            text:{
                color: '#ffffff'
            }
        });

        return (
            <View style={shapes.card}>
                <Image source={pic} style={shapes.image}/>
                <Text style={shapes.text}>Wonder Women</Text>
            </View>
        )
    }
}

export default MovieCard;