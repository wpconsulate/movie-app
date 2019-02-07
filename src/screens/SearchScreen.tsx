import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, FlatList } from 'react-native'
import { navigationOptions } from '../helpers/header'
import { Input, Text, Spinner, Card, CardItem, Button } from 'native-base'
import { SearchScreenState as State } from '../state/SearchScreenState'
import axios from 'axios'
import { Url } from '../api/Url'

const styles = StyleSheet.create({
  headerView: {
    minHeight: '20%',
    backgroundColor: '#E20F0F',
  },
})

class ResultItem extends Component<any, any> {
  onPress = (e: any) => {
    e.preventDefault()
    this.props.onPress(this.props.id)
    console.log('pressed...', this.props)
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

  private url: Url

  constructor(props: any) {
    super(props)

    this.state = {
      searchInput: '',
      isLoading: false,
      results: null,
    }

    this.url = new Url()
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
      const url = this.url.getUrl('search/multi', [
        {
          param: 'query',
          value: searchInput,
        },
      ])
      this.setState({
        isLoading: true,
      })
      try {
        const response = await axios.get(url)
        const data = response.data.results
        let results:
          | any[]
          | { name: any; release_date: string; id: number }[] = []
        data.forEach((item: any) => {
          if (item.media_type === 'movie') {
            results.push({
              name: item.title,
              id: item.id,
              release_date: item.release_date
                ? new Date(item.release_date).getFullYear().toString()
                : null,
            })
          } else if (item.media_type === 'person') {
            item.known_for.forEach((subItem: any) => {
              if (subItem.media_type === 'movie') {
                results.push({
                  name: subItem.title,
                  id: subItem.id,
                  release_date: subItem.release_date
                    ? new Date(subItem.release_date).getFullYear().toString()
                    : null,
                })
              } else {
                results.push({
                  name: subItem.name,
                  id: subItem.id,
                  release_date: subItem.release_date
                    ? new Date(subItem.release_date).getFullYear().toString()
                    : null,
                })
              }
            })
          } else {
            results.push({
              name: item.name,
              id: item.id,
              release_date: item.release_date
                ? new Date(item.release_date).getFullYear().toString()
                : null,
            })
          }
        })
        this.setState({
          results: results,
          isLoading: false,
        })
      } catch (err) {
        console.error(err)
      }
    }
  }

  onPressItem = (id: number) => {
    console.log('SearchScreen::onPressItem()', id)
  }

  _renderItem = ({ item }: any) => (
    <ResultItem
      id={item.id}
      onPress={this.onPressItem}
      releaseDate={item.release_date}
      name={item.name}
    />
  )

  render() {
    const { searchInput, isLoading, results } = this.state
    return (
      <View>
        <View style={styles.headerView}>
          {/* Search card */}
          <View
            style={{
              marginTop: 100,
              position: 'absolute',
              left: '50%',
              translateX: '-50%',
              width: '90%',
            }}
          >
            <Card
              style={{
                maxWidth: '80%',
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
                  style={{
                    height: '100%',
                    alignSelf: 'center',
                  }}
                />
                {isLoading && <Spinner color="red" />}
              </CardItem>
              <ScrollView>
                <View>
                  <FlatList
                    data={results}
                    keyExtractor={(item: any) => item.id}
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

export default SearchScreen
