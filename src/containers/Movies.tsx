import * as React from 'react';
import { Col, Text, Row } from 'native-base';
import Movie from '../api/Movie/Movie';
import { TouchableOpacity, View, FlatList } from 'react-native';
import FitImage from 'react-native-fit-image';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { withNavigation } from 'react-navigation';

const numOfColumns = 4
class Movies extends React.Component<any, any> {

    formatData = (data: any, numColumns: any) => {
        const numberOfFullRows = Math.floor(data.length / numColumns);

        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
            numberOfElementsLastRow++;
        }

        return data;
    }

    _renderStars = (stars: number) => {
        let starsArray = []

        for (let i = 0; i < 5; i++) {
            if (stars <= i) {
                starsArray.push(<FontAwesomeIcon key={i} name="star-o" size={10} color="white" />)
            } else {
                starsArray.push(<FontAwesomeIcon key={i} name="star" size={10} color="white" />)
            }
        }
        return starsArray
    }

    onPressItem = (movieId: string) => {
        this.props.navigation.push('Movie', { movieId })
    }

    onLongPressItem = () => {
        // Show popup
    }

    _renderItem = ({ item, index }: { item: Movie | any, index: number }) => {
        if (item.empty) {
            return <Col size={3} style={{ marginLeft: 10, marginRight: 10, marginBottom: 15 }} key={index.toString()} />
        }
        return (
            <Col size={3} style={{ marginLeft: 10, marginRight: 10, marginBottom: 15 }} key={index.toString()}>
                <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel={`${item.getTitle()} is rated ${item.getPopularity()} out of 5 stars.`}
                    accessibilityHint="Navigates to the movie screen."
                    onPress={() => this.onPressItem(item.getId().toString())}
                    onLongPress={this.onLongPressItem}>
                    <FitImage
                        source={{ uri: item.getPoster() }}
                        resizeMethod="scale"
                        resizeMode="contain"
                        borderRadius={8}
                    />
                    <Text
                        style={{
                            marginTop: 5,
                            color: '#fff',
                            textAlign: 'center',
                            fontSize: 10
                        }}
                    >
                        {item.getTitle()}
                    </Text>
                    <Row style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        {this._renderStars(item.getPopularity())}
                    </Row>
                </TouchableOpacity>
            </Col>
        )
    }

    render() {
        return (
            <View>
                <FlatList
                    numColumns={numOfColumns}
                    data={this.formatData(this.props.data, numOfColumns)}
                    keyExtractor={(index: number) => index.toString()}
                    renderItem={this._renderItem}
                    style={{ marginTop: 30 }}
                />
            </View>
        )
    }
}
export default withNavigation(Movies)