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
  Textarea,
} from 'native-base'
import { TouchableOpacity } from 'react-native'
import getTheme from '../native-base-theme/components'
import mmdb from '../native-base-theme/variables/mmdb'
import { NavigationScreenProps, withNavigation } from 'react-navigation'
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
              marginRight: 15,
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
    this.state = {
      stars: ['star-o', 'star-o', 'star-o', 'star-o', 'star-o'],
    }
  }

  onStarPress = (index: number) => {
    const { stars } = this.state

    stars.forEach((_item: string, _index: number) => {
      stars[_index] = 'star-o'

      if (index >= _index) {
        stars[_index] = 'star'
      }
    })
    this.setState({
      stars,
    })
  }

  render() {
    const { navigation } = this.props
    const { stars } = this.state
    const movie: Movie = navigation.getParam('movie')
    return (
      <Container
        style={{
          backgroundColor: '#12152D',
          paddingLeft: 20,
          paddingRight: 20,
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
                  fontSize: 36,
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
            <Row style={{ marginTop: 30 }}>
              {stars.map((item: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={{ marginRight: 10 }}
                  onPress={() => this.onStarPress(index)}
                >
                  <FontAwesomeIcons name={item} color="white" size={50} />
                </TouchableOpacity>
              ))}
            </Row>
            <Row style={{ marginTop: 60 }}>
              <Textarea
                rowSpan={5}
                autoCapitalize="sentences"
                autoFocus
                blurOnSubmit
                maxLength={500}
                multiline
                placeholder="Write your review here."
                style={{
                  backgroundColor: '#2D3041',
                  flex: 1,
                  borderRadius: 12,
                  padding: 20,
                }}
              />
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
}
export default withNavigation(ReviewScreen)
