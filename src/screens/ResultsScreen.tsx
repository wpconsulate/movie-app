import React, { Component } from 'react'
import {
  Container,
  Content,
  Spinner,
  Row,
  Col,
  Text,
  Grid
} from 'native-base'
import SetOfMovies from '../api/Collection/SetOfMovies'
import { IResultsScreenState as IState } from '../state/ResultsScreenState'
import Search from '../api/Search'
import { TouchableOpacity, StatusBar } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather'
import Movies from '../containers/Movies';
import { Header } from 'native-base';
import { withNavigation } from 'react-navigation';
import Algolia from './../api/Algolia';
const navigationOptions: any = () => ({
  headerTransparent: true,
  headerMode: 'none',
  header: null as any
})

class ResultsScreen extends Component<any, IState> {
  static navigationOptions = navigationOptions
  private setOfMovies: SetOfMovies
  private search: Search
  private algolia: Algolia

  constructor(props: any) {
    super(props)
    this.setOfMovies = new SetOfMovies()
    this.search = new Search()
    this.algolia = new Algolia('users')
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
      const users = await this.algolia.search({ query })
      console.log('user index', users)
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
        <StatusBar barStyle="light-content" />
        {
          this.state.isLoading ?
            <Spinner />
            :
            <React.Fragment>
              <Header transparent iosBarStyle="light-content" style={{ flexDirection: 'row' }}>
                <Grid>
                  <Row style={{ marginTop: 5, alignItems: 'center', height: '100%', width: '100%', flex: 1 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                      accessible
                      accessibilityRole="button"
                      accessibilityLabel="Go back"
                      accessibilityHint="Double tap to go back to the search screen."
                    >
                      <FeatherIcon name="chevron-left" size={30} color="white" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        alignSelf: 'center',
                        marginRight: 5,
                        flex: 1
                      }}
                    >Showing {this.state.movies.length} results for</Text>
                  </Row>
                </Grid>
              </Header>
              <Content style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Grid>
                  <Row style={{ alignItems: 'center', width: '100%' }}>
                    <Col>
                      <Text style={{ alignSelf: 'center', textTransform: 'capitalize', fontSize: 24, fontWeight: 'bold', color: '#E20F0F' }}>Star Wars</Text>
                    </Col>
                  </Row>
                </Grid>
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
            </React.Fragment>
        }
      </Container>
    )
  }
}

export default withNavigation(ResultsScreen)
