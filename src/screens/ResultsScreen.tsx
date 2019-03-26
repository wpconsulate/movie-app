import React, { Component } from 'react'
import { Container, Content, Spinner, Row, Col, Text, Grid } from 'native-base'
import SetOfMovies from '../api/Collection/SetOfMovies'
import { IResultsScreenState as IState } from '../state/ResultsScreenState'
import Search from '../api/Search'
import { TouchableOpacity, StatusBar } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Movies from '../containers/Movies'
import { Header } from 'native-base'
import { withNavigation } from 'react-navigation'
import Algolia from './../api/Algolia'
import UserIcon from '../components/userIcon'

const navigationOptions: any = () => ({
  header: null,
  headerMode: 'none',
  headerTransparent: true,
  headerBack: null
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
      isLoading: true
    })
    const header: string = await this.props.navigation.getParam('query')
    if ((await this.props.navigation.getParam('setOfMovie')) !== undefined) {
      try {
        const query = await this.props.navigation.getParam('setOfMovie')
        this.setOfMovies = query
        this.setState({
          movies: this.setOfMovies
        })
      } catch (err) {
        console.error(err)
      }
    } else {
      try {
        const query = await this.props.navigation.getParam('query')
        const results = await this.search.search(query)
        results.forEach((result: any) => {
          if (result.title && result.poster_path) {
            this.setOfMovies.addMovie(result)
          }
        })
        const users = await this.algolia.search({ query })
        let foundUser: Array<any> = []
        users.hits.forEach(element => {
          if (foundUser !== undefined) {
            foundUser.push({
              id: element.id,
              username: element.username,
              userInitials: element.userInitials,
              userAvatarColour: element.userAvatarColour
            })
          } else {
            foundUser = [
              {
                id: element.id,
                username: element.username,
                userInitials: element.userInitials,
                userAvatarColour: element.userAvatarColour
              }
            ]
          }
          console.log(element.id)
          console.log(element.username)
        })
        // console.log('user index', users)
        this.setState({
          movies: this.setOfMovies,
          user: foundUser
        })
      } catch (err) {
        console.error(err)
      }
    }

    this.setState({
      isLoading: false,
      title: header
    })
  }

  render() {
    return (
      <Container
        style={{
          backgroundColor: '#12152D'
        }}
      >
        <StatusBar barStyle="light-content" />
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <Header
              transparent={true}
              iosBarStyle="light-content"
              style={{ flexDirection: 'row' }}
            >
              <Grid>
                <Row
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    height: '100%',
                    marginTop: 5,
                    width: '100%'
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel="Go back"
                    accessibilityHint="Double tap to go back to the search screen."
                  >
                    <FeatherIcon name="chevron-left" size={30} color="white" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      alignSelf: 'center',
                      color: 'white',
                      flex: 1,
                      fontSize: 14,
                      fontWeight: 'bold',
                      marginRight: 5,
                      textAlign: 'center'
                    }}
                  >
                    Showing {this.state.movies.length} results for
                  </Text>
                </Row>
              </Grid>
            </Header>
            <Content
              style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}
            >
              <Grid>
                <Row style={{ alignItems: 'center', width: '100%' }}>
                  <Col>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: '#E20F0F',
                        fontSize: 24,
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                      }}
                    >
                      {this.state.title}
                    </Text>
                  </Col>
                </Row>
              </Grid>
              {this.state.isLoading ? (
                <Spinner />
              ) : this.state.movies ? (
                <Movies data={this.setOfMovies} />
              ) : (
                ''
              )}

              <Grid>
                {this.state.user
                  ? this.state.user.map((e: any) => {
                      return (
                        <UserIcon
                          key={e.id}
                          userId={e.id}
                          username={e.username}
                          userInnitial={e.userInitials}
                          avatarColour={e.userAvatarColour}
                        />
                      )
                    })
                  : undefined}
              </Grid>
            </Content>
          </React.Fragment>
        )}
      </Container>
    )
  }
}

export default withNavigation(ResultsScreen)
