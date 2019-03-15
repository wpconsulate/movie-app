import { Input, Spinner, Grid, Row, Col, Text } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import React, { Component } from 'react'
import {
  AsyncStorage,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from 'react-native'
import { withNavigation } from 'react-navigation'

import Search from '../api/Search'
import ResultItem from '../components/ResultItem'
import { navigationOptions } from '../helpers/header'
import { SearchScreenState as State } from '../state/SearchScreenState'

import Pill from '../components/Pill'
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
    bottom: 30,
    borderRadius: 8,
    zIndex: 2,
    flexWrap: 'wrap',
  },
  topSection: {
    flex: 0.25,
    backgroundColor: '#E20F0F',
    position: 'relative',
  },
  bottomSection: {
    flex: 0.7,
    zIndex: -1,
  },
  mainSection: {
    flex: 1,
    maxWidth: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  root: {
    backgroundColor: '#12152D', // Use this color
    flex: 1,
  },
  searchInput: {
    width: '100%',
    fontFamily: 'PoppinsLight',
    fontSize: 14,
    paddingLeft: 15,
    color: '#12152D'
  },
  searchInputContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
    flexDirection: 'row',
  },
  scrollContainer: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    position: 'absolute',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignSelf: 'center',
    top: 50,
    zIndex: 1,
  },
})

class SearchScreen extends Component<any, State> {
  static navigationOptions = navigationOptions

  private search: Search
  private keyboardDidHideListener: any

  constructor(props: any) {
    super(props)

    this.state = {
      searchInput: '',
      isLoading: false,
      results: null,
      tmpResults: null,
      searchHistory: null,
      showClearBtn: false
    }

    this.search = new Search()
  }

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide
    )
  }

  keyboardDidHide = () => {
    this.onBottomSectionPress()
  }

  onChange = async (text: string) => {
    const { searchInput } = this.state

    this.setState({
      searchInput: text,
      showClearBtn: true
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
    this.props.navigation.push('Movie', { movieId: id })
  }

  _storeData = async (userInput: string) => {
    try {
      await AsyncStorage.setItem(userInput, userInput);
      let previousSearch = this.state.searchHistory
      previousSearch.push(userInput)
      this.setState({ searchHistory: previousSearch })
    } catch (error) {
      console.log(error)
    }
  };
  _retrieveData = async (userInput: string) => {
    try {
      const value = await AsyncStorage.getItem(userInput);
      if (value === null) {
        this._storeData(userInput)
      }
    } catch (error) {
      // Error retrieving data
      console.log("retrieve didn't work")

    }
  };

  _renderItem = ({ item }: any) => (
    <ResultItem
      id={item.id}
      onPress={this.onPressItem}
      releaseDate={item.release_date}
      name={item.name}
    />
  )

  onSubmit = async () => {
    const { searchInput } = this.state
    await this._retrieveData(searchInput)
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

  onBottomSectionPress = () => {
    this.setState({
      tmpResults: this.state.results,
      results: [],
    })
    Keyboard.dismiss()
  }

  onClearPress = () => {
    this.setState({
      results: null,
      searchInput: '',
      showClearBtn: false
    })
    Keyboard.dismiss()
  }

  render() {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="light-content" />
        <View style={styles.topSection}>
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Input
                accessible
                accessibilityRole="search"
                accessibilityLabel="Search"
                accessibilityHint="Search for a movie, actor or a user. Press enter on your keypad to search."
                placeholder="Search for a movie, actor or a user..."
                value={this.state.searchInput}
                onChangeText={this.onChange}
                returnKeyType="search"
                onSubmitEditing={() => this.onSubmit()}
                placeholderTextColor="#B3B3B3"
                style={styles.searchInput}
              />
              {this.state.showClearBtn ?
                <TouchableOpacity onPress={this.onClearPress} style={{ paddingRight: 15 }}>
                  <MaterialIcons name="close" color="#12152D" size={20} />
                </TouchableOpacity>
                :
                null
              }
              {this.state.isLoading && (
                <Spinner style={{ width: 10, height: 10 }} />
              )}
            </View>
            <View style={styles.scrollContainer}>
              <ScrollView style={{ maxHeight: 250, position: 'relative' }}>
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
        <TouchableWithoutFeedback
          onPress={this.onBottomSectionPress}
          accessible={false}
        >
          <View style={styles.bottomSection}>
            <View style={styles.mainSection}>
              <Grid style={{ width: '100%', marginTop: 50 }}>
                <View style={{ flex: 1, maxHeight: '50%' }}>
                  <Row
                    style={{
                      maxHeight: 50,
                      alignItems: 'center',
                      marginBottom: 15,
                    }}
                  >
                    <Col size={75}>
                      <Text
                        style={{
                          fontSize: 27,
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      >
                        Search History
                    </Text>
                    </Col>
                    <Col size={25}>
                      <TouchableOpacity onPress={this.clearSearchHistory}>
                        <Text
                          style={{
                            color: '#E20F0F',
                            fontSize: 20,
                            textAlign: 'right',
                            fontWeight: '200',
                          }}
                        >
                          Clear
                      </Text>
                      </TouchableOpacity>
                    </Col>
                  </Row>
                  <Row>
                    <ScrollView horizontal>
                      {this.state.searchHistory
                        ? this.state.searchHistory.map((e: any) => {
                          console.log('searchHistory', e)
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
                        : null}
                    </ScrollView>
                  </Row>
                </View>
              </Grid>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default withNavigation(SearchScreen)
