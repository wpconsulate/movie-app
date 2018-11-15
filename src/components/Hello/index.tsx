import React from "react";
import { Text, View } from "react-native";

export interface Props {
  name: string;
  enthusiasmLevel: number;
}

interface State {
  enthusiasmLevel: number;
}

class Hello extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    if ((props.enthusiasmLevel || 0) <= 0) {
      throw new Error("You could be a little more enthusiastic. :D");
    }

    this.state = {
      enthusiasmLevel: props.enthusiasmLevel || 1
    };
  }

  onIncrement = () =>
    this.setState({ enthusiasmLevel: this.state.enthusiasmLevel + 1 });

  onDecrement = () =>
    this.setState({ enthusiasmLevel: this.state.enthusiasmLevel - 1 });

  getExclamationMarks = (numChars: number) => Array(numChars + 1).join("!");

  render() {
    return (
      <View>
        <Text>
          Hello,{" "}
          {this.props.name +
            this.getExclamationMarks(this.state.enthusiasmLevel)}
        </Text>
      </View>
    );
  }
}
export default Hello;
