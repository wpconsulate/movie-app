import { Card, CardItem, Col, Grid, Input, Row, Spinner, Text } from 'native-base';
import React, { Component } from 'react';
import {
  AsyncStorage, FlatList, ScrollView, StyleSheet, TouchableOpacity, View, StatusBar
} from 'react-native';
import { withNavigation } from 'react-navigation';

import Search from '../api/Search';
import ResultItem from '../components/ResultItem';
import { navigationOptions } from '../helpers/header';
import { SearchScreenState as State } from '../state/SearchScreenState';

const styles = StyleSheet.create({
  headerView: {
    maxHeight: '20%',
    backgroundColor: '#E20F0F',
    width: '100%',
    zIndex: 3,
  },
  searchContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'white',
    minHeight: 60,
    alignSelf: 'center',
    bottom: -10,
    borderRadius: 8,
    zIndex: 1,
    flexWrap: 'wrap',
  },
  topSection: {
    flex: 0.3,
    backgroundColor: '#E20F0F',
    position: 'relative',
  },
  mainSection: {
    flex: 1
  },
  root: {
    backgroundColor: '#12152D', // Use this color
    flex: 1
  },
  searchInput: {
    width: '100%',
  },
  searchInputContainer: {
    flex: 1,
    alignItems: 'center',
    minHeight: 50,
    width: '100%',
    marginTop: 5,
    flexDirection: 'row',
  },
  scrollContainer: {
    minHeight: 70,
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  }
})

class SearchScreen extends Component<any, State> {
  static navigationOptions = navigationOptions

  private search: Search

  constructor(props: any) {
    super(props)

    this.state = {
      searchInput: '',
      isLoading: false,
      results: null,
      searchHistory: null,
    }

    this.search = new Search()
  }

  onChange = async (text: string) => {
    const { searchInput } = this.state

    this.setState({
      searchInput: text,
    })

    if (searchInput.trim().length <= 2) {
      this.setState({
        results: null,
      })
    }
    if (searchInput.trim().length > 2) {
      this.setState({
        isLoading: true,
      })
      try {
        const results = await this.search.searchAutocomplete(searchInput)
        this.setState({
          results,
          isLoading: false,
        })
      } catch (err) {
        console.error(err)
      }
    }
  }

  onPressItem = (id: number) => {
    console.log('Clicked')
    this.props.navigation.push('Movie', { movieId: id })
  }

  _renderItem = ({ item }: any) => (
    <ResultItem
      id={item.id}
      onPress={this.onPressItem}
      releaseDate={item.release_date}
      name={item.name}
    />
  )

  onSubmit = () => {
    const { searchInput } = this.state
    this.props.navigation.push('Results', { query: searchInput })
  }

  searchHistoryOnPress = (text: string) => {
    this.setState({
      searchInput: text,
    })
  }

  clearSearchHistory = async () => {
    await AsyncStorage.multiRemove(this.state.searchHistory)
    this.setState({ searchHistory: [] })
  }

  render() {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="light-content" />
        <View style={styles.topSection}>
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Input
                placeholder="Search for a movie, actor or a user..."
                value={this.state.searchInput}
                onChangeText={this.onChange}
                returnKeyType="search"
                onSubmitEditing={() => this.onSubmit()}
                style={styles.searchInput}
              />
              {this.state.isLoading && <Spinner />}
            </View>
            <View style={styles.scrollContainer}>
              <ScrollView style={{ maxHeight: 200 }}>
                <View>
                  <FlatList
                    data={this.state.results}
                    keyExtractor={(item: any) => item.id.toString()}
                    renderItem={this._renderItem}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
        <View style={styles.mainSection} />
      </View>
    )
  }
}
// @ts-ignore
const Main = (props: any) => (
  <View style={styles.mainSection}>
    <Grid>
      <Row>
        <Col>
          <Text
            style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}
          >
            Search History
      </Text>
        </Col>
        <Col>
          <TouchableOpacity onPress={props.clearSearchHistory}>
            <Text
              style={{
                color: 'red',
                fontSize: 20,
                alignSelf: 'flex-end',
                fontWeight: '200',
              }}
            >
              Clear
        </Text>
          </TouchableOpacity>
        </Col>
      </Row>
      <Row>
        {/* <ScrollView horizontal>
      {this.state.searchHistory
        ? this.state.searchHistory.map((e: any) => {
            return (
              <TouchableOpacity
                key={e}
                onPress={() => this.searchHistoryOnPress(e)}
              >
                <Pill
                  text={e}
                  colour={'#4F547E'}
                  textColour={'white'}
                />
              </TouchableOpacity>
            )
          })
        : ''}
    </ScrollView> */}
      </Row>
    </Grid>
  </View>
)
//@ts-ignore
const SearchHeader = (props: any) => (
  <View style={styles.headerView}>
    <View
      style={styles.searchContainer}
    >
      <Card
        style={{
          maxWidth: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 18,
        }}
      >
        <CardItem
          header
          style={{
            paddingLeft: 0,
            paddingBottom: 0,
            paddingRight: 0,
            paddingTop: 0,
            alignSelf: 'center',
            borderRadius: 18,
          }}
        >

        </CardItem>
      </Card>
    </View>
  </View>
)

export default withNavigation(SearchScreen)
