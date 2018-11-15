import React from "react";
import { StyleSheet, View } from "react-native";
import Hello from "./components/Hello";
export default class App extends React.Component {
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(Hello, { name: "Luke", enthusiasmLevel: 2 })));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});
//# sourceMappingURL=App.js.map