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
import { AirbnbRating } from 'react-native-ratings'
import { View, FlatList } from 'react-native';
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
      // const query = await this.props.navigation.getParam('query')
      const results = await this.search.search('test')
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

const numOfColumns = 4
class Movies extends React.Component<any, any> {

  _renderItem = ({ item }: { item: Movie }) => {
    return (
      <Col size={3} style={{ margin: 5 }}>
        <FitImage
          source={{ uri: item.getPoster() }}
          resizeMethod="scale"
          resizeMode="contain"
          borderRadius={8}
        />
        <Text
          style={{
            marginTop: 5,
            marginBottom: 10,
            color: '#fff',
            textAlign: 'center',
            fontSize: 10
          }}
        >
          {item.getTitle()}
        </Text>
        {/* <Row>{this._renderStars(item.getPopularity())}</Row> */}
        <Row style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <AirbnbRating
            showRating={false}
            defaultRating={item.getPopularity()}
          />
        </Row>
      </Col>
    )
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
        <FlatList
          numColumns={numOfColumns}
          data={this.props.data}
          keyExtractor={(item: Movie) => item.getId().toString()}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

export default ResultsScreen
