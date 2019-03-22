import React, { Component } from 'react'
import {
  Button,
  Icon,
  StyleProvider,
  Container,
  Content,
  Text,
  Header,
  H1,
  Grid,
  Row,
} from 'native-base'
import { TouchableOpacity } from 'react-native'
import getTheme from '../native-base-theme/components'
import mmdb from '../native-base-theme/variables/mmdb'
import { NavigationScreenProps, withNavigation } from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'
import Movie from '../api/Movie/Movie'
import { GenreContainer } from '../components'

class ReviewScreen extends Component<any, any> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      headerTransparent: true,
      headerBackgroundTransitionPreset: 'fade',
      headerLeft: (
        <StyleProvider style={getTheme(mmdb)}>
          <Button
            onPress={() => navigation.goBack()}
            transparent
            accessible
            accessibilityRole="button"
            accessibilityLabel="Go back"
            accessibilityHint="Double tap to go back to the previous screen."
          >
            <Icon
              type="Feather"
              name="chevron-left"
              style={{ color: '#fff' }}
            />
          </Button>
        </StyleProvider>
      ),
      headerTitle: (
        <StyleProvider style={getTheme(mmdb)}>
          <Text style={{ fontSize: 18, color: 'white' }}>Review</Text>
        </StyleProvider>
      ),
      headerRight: (
        <StyleProvider style={getTheme(mmdb)}>
          <TouchableOpacity
            onPress={() =>
              console.log('Clicked!', navigation.getParam('userId'))
            }
            style={{
              backgroundColor: '#E10F0F',
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Submit review"
            accessibilityHint="Double tap to go back to submit review."
          >
            <Icon type="Feather" name="check" style={{ color: '#fff' }} />
          </TouchableOpacity>
        </StyleProvider>
      ),
    }
  }

  constructor(props: any) {
    super(props)
  }

  render() {
    const { navigation } = this.props
    const movie: Movie = navigation.getParam('movie')
    return (
      <Container
        style={{
          backgroundColor: '#12152D',
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        <Header transparent translucent iosBarStyle="light-content" noShadow />
        <Content style={{ paddingTop: 20 }}>
          <Grid>
            <Row>
              <H1
                style={{
                  fontFamily: 'PoppinsSemiBold',
                  color: '#fff',
                  fontSize: 40,
                  padding: 5,
                  lineHeight: 50,
                  flex: 1,
                }}
              >
                {movie.getTitle()}
              </H1>
            </Row>
            <Row>
              <GenreContainer genres={movie.getGenres(true, 3)} />
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
}
export default withNavigation(ReviewScreen)
