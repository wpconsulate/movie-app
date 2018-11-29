import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Pill, MovieCard } from '../components';

class Upcoming extends React.Component {
    render() {
        const style = StyleSheet.create({
            container: {
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center"
            }
        });

        return (
            <View style={style.container}>
                <Pill text="gdfgfdgfdg"/>
                <Pill text="adssdsadsadasilfhaidufieau"/>
                <Pill text="rwe"/>
                <MovieCard text="Wonder Women"/>
            </View>
        );
    }
} 


export default Upcoming
