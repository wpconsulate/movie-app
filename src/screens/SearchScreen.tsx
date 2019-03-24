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
  Dimensions
} from 'react-native'
import { withNavigation } from 'react-navigation'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

import Search from '../api/Search'
import ResultItem from '../components/ResultItem'
import { navigationOptions } from '../helpers/header'
import { SearchScreenState as State } from '../state/SearchScreenState'
import MovieSlider from '../components/MovieSlider'
import Pill from '../components/Pill'
import SetOfMovies from '../api/Collection/SetOfMovies'

const deviceHeight = Dimensions.get('window').height
const redboxHeight = deviceHeight / 4

const styles = StyleSheet.create({
  headerView: {
    maxHeight: '20%',
    backgroundColor: '#E20F0F',
    width: '100%',
    zIndex: 3
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
    flexWrap: 'wrap'
  },
  topSection: {
    flex: 0.25,
    backgroundColor: '#E20F0F',
    position: 'relative',
    maxHeight: redboxHeight
  },
  bottomSection: {
    flex: 0.7,
    zIndex: -1
  },
  mainSection: {
    flex: 1,
    maxWidth: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  root: {
    backgroundColor: '#12152D', // Use this color
    flex: 1
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
    flexDirection: 'row'
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
    zIndex: 1
  },
  qrButton: {
    position: 'relative',
    bottom: -12.5,
    alignSelf: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E20F0F',
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class SearchScreen extends Component<any, State> {
  static navigationOptions = navigationOptions

  private search: Search
  private setOfMovies: SetOfMovies

  constructor(props: any) {
    super(props)

    this.state = {
      searchInput: '',
      isLoading: false,
      results: undefined,
      tmpResults: undefined,
      searchHistory: [],
      showClearBtn: false,
      suggestions: []
    }
    this.setOfMovies = new SetOfMovies()
    this.search = new Search()
  }

  async componentDidMount() {
    const searchHistory = await this.getSearchHistory()
    this.setState({
      searchHistory,
      suggestions: await this.setOfMovies.getTrending()
    })
  }

  keyboardDidHide = () => {
    this.onBottomSectionPress()
  }

  onChange = async (text: string) => {
    this.setState({
      searchInput: text,
      showClearBtn: true
    })
    if (text) {
      this.setState({
        isLoading: true
      })
      try {
        const results = await this.search.searchAutocomplete(text)
        this.setState({
          results,
          isLoading: false
        })
      } catch (err) {
        console.error(err)
      }
    }
  }

  onPressItem = async (id: number, title: string) => {
    await this.addToSearchHistory(title)
    this.props.navigation.push('Movie', { movieId: id })
  }

  getSearchHistory = async () => {
    try {
      const items = (await AsyncStorage.getItem('history')) as string
      return JSON.parse(items)
    } catch (err) {
      console.error(err)
    }
  }

  searchHistoryItemExist = (items: Array<string>, title: string) => {
    return items.find(item => item === title)
  }

  addToSearchHistory = async (movieTitle: string) => {
    try {
      let items = await this.getSearchHistory()
      if (!items) {
        items = []
      }
      if (!this.searchHistoryItemExist(items, movieTitle)) {
        items.push(movieTitle)
        this.setState({
          searchHistory: items
        })
        await AsyncStorage.setItem('history', JSON.stringify(items))
      }
    } catch (err) {
      console.error(err)
    }
  }

  _renderItem = ({ item }: any) => (
    <ResultItem
      id={item.id}
      onPress={() => this.onPressItem(item.id, item.name)}
      releaseDate={item.release_date}
      name={item.name}
    />
  )

  onSubmit = async () => {
    const { searchInput } = this.state
    await this.addToSearchHistory(searchInput)
    this.props.navigation.push('Results', { query: searchInput })
  }

  searchHistoryOnPress = (text: string) => {
    this.setState({
      searchInput: text
    })
  }

  clearSearchHistory = async () => {
    await AsyncStorage.removeItem('history')
    this.setState({ searchHistory: [] })
  }

  onBottomSectionPress = () => {
    this.setState({
      tmpResults: this.state.results,
      results: []
    })
    Keyboard.dismiss()
  }

  onClearPress = () => {
    this.setState({
      results: [],
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
              {this.state.showClearBtn && (
                <TouchableOpacity
                  onPress={this.onClearPress}
                  style={{ paddingRight: 15 }}
                >
                  <MaterialIcons name="close" color="#12152D" size={20} />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.scrollContainer}>
              <ScrollView style={{ maxHeight: 250 }}>
                <FlatList
                  data={this.state.results}
                  keyExtractor={(item: any) => item.id.toString()}
                  renderItem={this._renderItem}
                />
              </ScrollView>
              <TouchableOpacity style={styles.qrButton}>
                <FontAwesomeIcon name="qrcode" size={26} color="white" />
              </TouchableOpacity>
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
                <View style={{ flex: 1 }}>
                  {/* <Suggestions /> */}
                  <Row
                    style={{
                      maxHeight: 50,
                      alignItems: 'center',
                      marginBottom: 15
                    }}
                  >
                    <Col size={75}>
                      <Text
                        style={{
                          fontSize: 26,
                          color: 'white',
                          fontFamily: 'PoppinsBold'
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
                            fontSize: 16,
                            textAlign: 'right',
                            fontFamily: 'Poppins'
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
                            return (
                              <TouchableOpacity
                                key={e}
                                onPress={() => this.searchHistoryOnPress(e)}
                              >
                                <Pill
                                  text={e}
                                  textColour="#4F547E"
                                  colour="#26293E"
                                />
                              </TouchableOpacity>
                            )
                          })
                        : undefined}
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
export function Suggestions(props: any) {
  return (
    <View>
      <Row
        style={{
          maxHeight: 50,
          alignItems: 'center',
          marginBottom: 15
        }}
      >
        <Col size={75}>
          <Text
            style={{
              fontSize: 26,
              color: 'white',
              fontFamily: 'PoppinsBold'
            }}
          >
            Suggestions
          </Text>
        </Col>
        <Col size={25}>
          <TouchableOpacity onPress={props.onPress}>
            <Text
              style={{
                color: '#E20F0F',
                fontSize: 16,
                textAlign: 'right',
                fontFamily: 'Poppins'
              }}
            >
              View all
            </Text>
          </TouchableOpacity>
        </Col>
      </Row>
      <MovieSlider data={props.data} title="Suggestions" />
    </View>
  )
}
export default withNavigation(SearchScreen)
