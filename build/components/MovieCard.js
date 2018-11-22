import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
class MovieCard extends Component {
    render() {
        let pic = {
            uri: 'http://www.gstatic.com/tv/thumb/v22vodart/12543972/p12543972_v_v8_ab.jpg'
        };
        const shapes = StyleSheet.create({
            card: {
                alignItems: 'center'
            },
            image: {
                width: 325,
                height: 338,
                borderRadius: 16,
            },
            text: {
                color: '#ffffff'
            }
        });
        return (React.createElement(View, { style: shapes.card },
            React.createElement(Image, { source: pic, style: shapes.image }),
            React.createElement(Text, { style: shapes.text }, "Wonder Women")));
    }
}
export default MovieCard;
//# sourceMappingURL=MovieCard.js.map