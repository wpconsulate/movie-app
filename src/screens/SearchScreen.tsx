import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, FlatList } from 'react-native'
import { navigationOptions } from '../helpers/header'
import { Input, Text, Spinner, Card, CardItem, Button } from 'native-base'
import { SearchScreenState as State } from '../state/SearchScreenState'
import { withNavigation } from 'react-navigation'
import Search from '../api/Search'

const styles = StyleSheet.create({
  headerView: {
    minHeight: '20%',
    backgroundColor: '#E20F0F',
    zIndex: 3,
  },
})

class ResultItem extends Component<any, any> {
  onPress = (e: any) => {
    e.preventDefault()
    this.props.onPress(this.props.id)
  }

  render() {
    return (
      <Button block transparent onPress={this.onPress}>
        <Text>
          {this.props.name}{' '}
          {this.props.releaseDate ? `(${this.props.releaseDate})` : null}
        </Text>
      </Button>
    )
  }
}

class SearchScreen extends Component<any, State> {
  static navigationOptions = navigationOptions

  private search: Search

  constructor(props: any) {
    super(props)

    this.state = {
      searchInput: '',
      isLoading: false,
      results: null,
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

  render() {
    const { searchInput, isLoading, results } = this.state
    return (
      <View>
        <View style={styles.headerView}>
          {/* Search card */}
          <View
            style={
              {
                marginTop: 100,
                position: 'absolute',
                width: '90%',
                justifyContent: 'center',
                alignSelf: 'center',
              } as any
            }
          >
            <Card
              style={{
                maxWidth: '100%',
                justifyContent: 'center',
                alignItems: 'center',
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
                }}
              >
                <Input
                  placeholder="Search for a movie, actor or a user..."
                  value={searchInput}
                  onChangeText={this.onChange}
                  returnKeyType="search"
                  onSubmitEditing={() => this.onSubmit()}
                  style={{
                    height: '100%',
                    alignSelf: 'center',
                    minHeight: 50,
                  }}
                />
                {isLoading && <Spinner color="red" />}
              </CardItem>
              <ScrollView>
                <View>
                  <FlatList
                    data={results}
                    keyExtractor={(item: any) => item.id.toString()}
                    renderItem={this._renderItem}
                  />
                </View>
              </ScrollView>
            </Card>
          </View>
        </View>
        <View>
          <Text>Suggestions & Search History Here...</Text>
        </View>
      </View>
    )
  }
}

export default withNavigation(SearchScreen)
