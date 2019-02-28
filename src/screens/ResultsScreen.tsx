import React, { Component } from 'react'
import {
  Container,
  Header,
  Content,
  Spinner,
  Row,
  Col,
  Text,
} from 'native-base'
import { navigationOptions } from '../helpers/header'
import SetOfMovies from '../api/Collection/SetOfMovies'
import { IResultsScreenState as IState } from '../state/ResultsScreenState'
import Search from '../api/Search'
import Movie from '../api/Movie/Movie'
import { View, FlatList, Image } from 'react-native'
import FitImage from 'react-native-fit-image'

class ResultsScreen extends Component<any, IState> {
  static navigationOptions = navigationOptions

  private setOfMovies: SetOfMovies
  private search: Search

  constructor(props: any) {
    super(props)
    this.setOfMovies = new SetOfMovies()
    this.search = new Search()
  }

  async componentWillMount() {
    this.setState({
      isLoading: true,
    })
    try {
      const query = await this.props.navigation.getParam('query')
      const results = await this.search.search(query)
      results.forEach((result: any) => {
        if (result.title && result.poster_path)
          this.setOfMovies.addMovie(result)
      })
      this.setState({
        movies: this.setOfMovies,
      })
    } catch (err) {
      console.error(err)
    }
    this.setState({
      isLoading: false,
    })
  }

  render() {
    const { navigation } = this.props
    return (
      <Container
        style={{
          backgroundColor: '#12152D',
        }}
      >
        <Header transparent />
        <Content style={{ padding: 20 }}>
          {this.state.isLoading ? (
            <Spinner />
          ) : this.state.movies ? (
            <Movies
              query={navigation.getParam('query')}
              data={this.setOfMovies}
            />
          ) : (
            ''
          )}
        </Content>
      </Container>
    )
  }
}
class Movies extends React.Component<any, any> {
  _renderItem = ({ item }: { item: Movie }) => {
    return (
      <View style={{ flex: 1 }}>
        <FitImage
          source={{ uri: item.getPoster() }}
          resizeMethod="scale"
          resizeMode="contain"
          borderRadius={24}
        />
        <Text
          style={{
            marginBottom: 10,
            color: '#fff',
            textAlign: 'center',
          }}
        >
          {item.getTitle(7)}
        </Text>
        {/* <Row>{this._renderStars(item.getPopularity())}</Row> */}
      </View>
    )
  }

  _renderStars = (stars: number) => {
    let starsArray = []

    for (let i = 0; i < 5; i++) {
      if (stars <= i) {
        starsArray.push(
          <Image source={require('../../assets/EmptyStar.png')} />
        )
      } else {
        starsArray.push(<Image source={require('../../assets/Star.png')} />)
      }
    }

    return starsArray
  }

  render() {
    return (
      <View>
        <Row>
          <Col>
            <Row
              style={{ flexWrap: 'wrap', alignItems: 'flex-start', flex: 1 }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginRight: 10,
                }}
              >
                Showing {this.props.data.length} results for:
              </Text>
              <Text
                style={{
                  textTransform: 'capitalize',
                  color: '#E20F0F',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
              >
                {this.props.query}
              </Text>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: 30 }}>
          <FlatList
            contentContainerStyle={
              {
                // flex: 1,
                // justifyContent: 'space-around', // Seems to not work and doesn't show anything
                // alignItems: 'center',
              }
            }
            numColumns={3}
            data={this.props.data}
            keyExtractor={item => item.getId().toString()}
            renderItem={this._renderItem}
          />
        </Row>
      </View>
    )
  }
}

export default ResultsScreen
