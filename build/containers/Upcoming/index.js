import React from 'react';
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
        return (React.createElement(View, { style: style.container },
            React.createElement(Pill, { text: "gdfgfdgfdg" }),
            React.createElement(Pill, { text: "adssdsadsadasilfhaidufieau" }),
            React.createElement(Pill, { text: "rwe" }),
            React.createElement(MovieCard, { text: "this is a card when movie picture will be stored" })));
    }
}
export default Upcoming;
//# sourceMappingURL=index.js.map