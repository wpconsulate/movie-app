import React from 'react'
import { View , StyleSheet, ViewStyle} from 'react-native';
import Upcoming from '../../containers/Upcoming';

function Home() {
    return (
        <View style= {styles.HomeView}>
            <Upcoming />
        </View>
    )
}
interface IStyles{
    HomeView: ViewStyle
}
const styles = StyleSheet.create<IStyles>({
    HomeView: {
    }
  });
export default Home;