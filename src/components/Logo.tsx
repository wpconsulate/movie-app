import React from 'react';
import { Text, TextStyle } from 'react-native';

interface PropsInterface {
    style?: TextStyle
}

function Logo(props: PropsInterface) {
    return (
        <Text style={props.style}>mmdb</Text>
    );
}

export default Logo;