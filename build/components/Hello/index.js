import React from "react";
import { Text, View } from "react-native";
class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.onIncrement = () => this.setState({ enthusiasmLevel: this.state.enthusiasmLevel + 1 });
        this.onDecrement = () => this.setState({ enthusiasmLevel: this.state.enthusiasmLevel - 1 });
        this.getExclamationMarks = (numChars) => Array(numChars + 1).join("!");
        if ((props.enthusiasmLevel || 0) <= 0) {
            throw new Error("You could be a little more enthusiastic. :D");
        }
        this.state = {
            enthusiasmLevel: props.enthusiasmLevel || 1
        };
    }
    render() {
        return (React.createElement(View, null,
            React.createElement(Text, null,
                "Hello,",
                " ",
                this.props.name +
                    this.getExclamationMarks(this.state.enthusiasmLevel))));
    }
}
export default Hello;
//# sourceMappingURL=index.js.map