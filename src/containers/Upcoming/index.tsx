import React from 'react'
import { View, StyleSheet } from 'react-native';
import Pill from '../../components/pill';
import MovieCard from '../../components/MovieCard';
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
                <MovieCard text="this is a card when movie picture will be stored"/>
            </View>
        );
    }
} 


export default Upcoming;