import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
class Pill extends Component {
    render() {
        const shapes = StyleSheet.create({
            pill: {
                justifyContent: "center",
                backgroundColor: "red",
                borderRadius: 16,
                paddingLeft: 12,
                paddingRight: 12,
                height: 32,
                margin: 4
            }
        });
        return (React.createElement(View, { style: [shapes.pill] },
            React.createElement(Text, null, this.props.text)));
    }
}
export default Pill;
//# sourceMappingURL=pill.js.map