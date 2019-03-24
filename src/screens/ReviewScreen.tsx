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
  Textarea
} from 'native-base'
import { TouchableOpacity, Alert } from 'react-native'
import getTheme from '../native-base-theme/components'
import mmdb from '../native-base-theme/variables/mmdb'
import { NavigationScreenProps, withNavigation } from 'react-navigation'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'
import Movie from '../api/Movie/Movie'
import { GenreContainer } from '../components'
import SetOfUsers from '../api/Collection/SetOfUsers'
import DropdownAlert from 'react-native-dropdownalert'
import MessageStore from '../stores/MessageStore'
import { observer } from 'mobx-react'

@observer
class ReviewScreen extends Component<any, any> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    const { params = {} } = navigation.state
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
            onPress={() => params.onSubmit()}
            style={{
              alignItems: 'center',
              backgroundColor: '#E10F0F',
              borderRadius: 20,
              height: 40,
              justifyContent: 'center',
              marginRight: 15,
              width: 40
            }}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Submit review"
            accessibilityHint="Double tap to go back to submit review."
          >
            <Icon type="Feather" name="check" style={{ color: '#fff' }} />
          </TouchableOpacity>
        </StyleProvider>
      )
    }
  }

  private users = new SetOfUsers()
  private dropdown: any

  constructor(props: any) {
    super(props)
    this.state = {
      rating: 0,
      review: '',
      stars: ['star-o', 'star-o', 'star-o', 'star-o', 'star-o']
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onSubmit: this.onSubmit
    })
  }

  onSubmit = async () => {
    const { review, rating } = this.state
    const userId = this.props.navigation.getParam('userId')
    const movie: Movie = this.props.navigation.getParam('movie')
    const user = await this.users.getById(userId)
    if (!review && !rating) {
      this.dropdown.alertWithType(
        'error',
        'Error',
        `Please rate the movie and write a review.`
      )
    }
    if (!user) {
      Alert.alert(
        'Oops! Something went wrong.',
        'Please login before trying to review a movie'
      )
      return
    }
    try {
      await movie.addReview({
        user: {
          id: userId,
          name: user.name
        },
        review: {
          rating,
          content: review
        }
      })
      MessageStore.addToMessage({
        type: 'success',
        message: `You've successfully added a review to "${movie.getTitle()}".`
      })
      this.props.navigation.pop()
    } catch (err) {
      console.error(err)
      this.dropdown.alertWithType(
        'error',
        'Error',
        `Oops! Something went wrong when trying to add a review.`
      )
    }
  }

  onStarPress = (index: number) => {
    const { stars } = this.state
    let rating = 0
    stars.forEach((_item: string, _index: number) => {
      stars[_index] = 'star-o'

      if (index >= _index) {
        stars[_index] = 'star'
        rating += 1
      }
    })
    this.setState({
      rating,
      stars
    })
  }

  onReviewInputChange = (text: any) => {
    this.setState({
      review: text
    })
  }

  render() {
    const { navigation } = this.props
    const { stars, review } = this.state
    const movie: Movie = navigation.getParam('movie')
    return (
      <Container
        style={{
          backgroundColor: '#12152D',
          paddingLeft: 20,
          paddingRight: 20
        }}
      >
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
        <Header
          transparent={true}
          translucent={true}
          iosBarStyle="light-content"
          noShadow={true}
        />
        <Content style={{ paddingTop: 20 }}>
          <Grid>
            <Row>
              <H1
                style={{
                  color: '#fff',
                  flex: 1,
                  fontFamily: 'PoppinsSemiBold',
                  fontSize: 36,
                  lineHeight: 50,
                  padding: 5
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
                rowSpan={8}
                autoCapitalize="sentences"
                autoFocus
                blurOnSubmit
                maxLength={500}
                multiline
                placeholder="Write your review here."
                onChangeText={this.onReviewInputChange}
                value={review}
                style={{
                  backgroundColor: '#2D3041',
                  flex: 1,
                  borderRadius: 12,
                  paddingTop: 30,
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingBottom: 30,
                  fontSize: 16,
                  fontFamily: 'PoppinsMedium',
                  color: 'white'
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
