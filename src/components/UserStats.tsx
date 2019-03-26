import React from 'react'
import { StackedBarChart } from 'react-native-svg-charts'
import { View, Text } from 'native-base'
import { StyleSheet } from 'react-native'
import { Row, Col, Grid } from 'native-base'
import { withNavigation } from 'react-navigation'
import moment from 'moment'
import User from '../api/User/User'
import { Tooltip } from 'react-native-elements'

// given to StatsKey to provide circle colour, text next to circle and total watch in that section
interface IProps {
  text: string
  colour: string
  total: string
}
interface IPropsUser {
  userData: any
  userId: any
}
interface IState {
  completeCount: number
  watchingCount: number
  plannedCount: number
  droppedCount: number
  totalEntries: number
  totalRuntime: number
  totalHours: number
  totalDays: number
  followerCount: number
}

// colour wouldnt take props colour

// return circle with text and total eg <O completed      500>
function StatsKey(props: IProps) {
  const styles = StyleSheet.create({
    view: {
      width: 15,
      height: 15,
      borderRadius: 100 / 2,
      backgroundColor: props.colour,
      fontWeight: 'bold'
    },
    text: {
      color: 'white'
    }
  })
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={styles.view} />
      <Text
        style={{
          marginLeft: 10,
          flex: 3,
          fontFamily: 'PoppinsMedium',
          color: 'white'
        }}
      >
        {props.text}{' '}
      </Text>
      <Text style={styles.text}>{props.total}</Text>
    </View>
  )
}

class UserStats extends React.Component<IPropsUser, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      completeCount: 0,
      watchingCount: 0,
      plannedCount: 0,
      droppedCount: 0,
      totalEntries: 0,
      totalRuntime: 0,
      totalHours: 0,
      totalDays: 0,
      followerCount: 0
    }
  }

  checkifExist(check: any) {
    if (check) {
      return Object.keys(check).length
    }
    return 0
  }
  async componentDidMount() {
    const curUser = new User({ id: this.props.userId })
    const count = await curUser.getFollowersCount()
    this.setState({ followerCount: Object.keys(count).length })
  }
  async componentWillMount() {
    const { userData } = this.props
    let countComplete = this.checkifExist(userData.watchlist.completed)
    let countWatching = this.checkifExist(userData.watchlist.watching)
    let countPlanned = this.checkifExist(userData.watchlist.planned)
    let countDropped = this.checkifExist(userData.watchlist.dropped)

    let calResult = await this.calculateResults()

    this.setState({
      completeCount: countComplete,
      watchingCount: countWatching,
      plannedCount: countPlanned,
      droppedCount: countDropped,
      totalEntries: calResult.totalEntries,
      totalHours: calResult.totalHours,
      totalRuntime: calResult.totalMin,
      totalDays: calResult.totalDays
    })
  }

  async calculateResults() {
    let totalEntries = 0
    const list = this.props.userData.watchlist // containts all the watchlist as objects
    let totalRuntime = 0
    let totalHours = 0
    let days = 0

    for (const key in list) {
      for (const k in list[key]) {
        if (list[key][k].runtime) {
          totalRuntime += list[key][k].runtime
        }
        totalEntries += 1
      }
    }
    totalHours = Math.floor(totalRuntime / 60)
    days = Math.floor(totalHours / 24)
    const userDetails = {
      totalDays: days,
      totalEntries: totalEntries,
      totalHours: totalHours,
      totalMin: totalRuntime
    }
    return userDetails
  }

  render() {
    const style = StyleSheet.create({
      parent: { margin: 10 },
      text: {
        color: 'white',
        margin: 10
      },
      profileDetail: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#686C86',
        marginTop: 5,
        borderRadius: 10
      },
      detailContent: {
        margin: 5,
        alignItems: 'center'
      },
      title: {
        fontSize: 18,
        color: '#fff'
      },
      count: {
        fontSize: 16,
        color: '#fff'
      }
    })
    const data = [
      {
        Watching: this.state.watchingCount,
        Completed: this.state.completeCount,
        Dropped: this.state.droppedCount,
        PlanToWatch: this.state.plannedCount
      }
    ]

    const colors = ['#2A59FF', '#56CCF2', '#FF0000', '#C4C4C4']
    const keys: Array<'Watching' | 'Completed' | 'Dropped' | 'PlanToWatch'> = [
      'Watching',
      'Completed',
      'Dropped',
      'PlanToWatch'
    ]

    return (
      <View style={style.parent}>
        <View style={style.profileDetail}>
          <View style={style.detailContent}>
            <Text style={style.title}>Followers</Text>
            <Text style={style.count}>{this.state.followerCount}</Text>
          </View>
          <View style={style.detailContent}>
            <Text style={style.title}>Total Entries</Text>
            <Text style={style.count}>{this.state.totalEntries}</Text>
          </View>
          <View style={style.detailContent}>
            <Text style={style.title}>Review</Text>
            <Text style={style.count}>
              {this.checkifExist(this.props.userData.reviews)}
            </Text>
          </View>
        </View>
        <Row>
          <Col style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: 'white', marginTop: 5 }}>
              Joined: {moment(this.props.userData.joined).format('DD/MM/YY')}
            </Text>
          </Col>
        </Row>
        {/* <Grid>
          <Row>
            <Col>
              <Text style={{ color: 'white', marginTop: 5 }}>
                Total Entries:{this.state.totalEntries}
              </Text>
              <Text style={{ color: 'white', marginTop: 5 }}>
                Review:{this.checkifExist(this.props.userData.reviews)}
              </Text>
              <Text style={{ color: 'white', marginTop: 5, fontSize: 20 }}>
                Followers: {this.state.followerCount}
              </Text>
            </Col>

            <Col>
              <Text style={{ color: 'white', marginTop: 5 }}>
                Days:{this.state.totalDays}
              </Text>
              <Text style={{ color: 'white', marginTop: 5 }}>
                Hours:{this.state.totalHours}
              </Text>
              <Text style={{ color: 'white', marginTop: 5 }}>
                Minutes: {this.state.totalRuntime}
              </Text>
              <Text style={{ color: 'white', marginTop: 5 }}>
                Joined: {moment(this.props.userData.joined).format('DD/MM/YY')}
              </Text>
            </Col>
          </Row>
        </Grid> */}

        <StackedBarChart
          style={{ height: 40 }}
          keys={keys}
          colors={colors}
          data={data}
          showGrid={false}
          contentInset={{ top: 5, bottom: 5 }}
          horizontal={true}
        />

        <StatsKey
          text="Watching"
          colour="#2A59FF"
          total={this.state.watchingCount.toString()}
        />
        <StatsKey
          text="Completed"
          colour="#56CCF2"
          total={this.state.completeCount.toString()}
        />
        <StatsKey
          text="Dropped"
          colour="#FF0000"
          total={this.state.droppedCount.toString()}
        />
        <StatsKey
          text="Plan To Watch"
          colour="#C4C4C4"
          total={this.state.plannedCount.toString()}
        />

        <Col style={{ alignItems: 'flex-end' }}>
          <Tooltip
            popover={<Text>Total Minutes: {this.state.totalRuntime}</Text>}
          >
            <Text style={{ color: 'white', marginTop: 5 }}>
              Days:{this.state.totalDays}
            </Text>
            <Text style={{ color: 'white', marginTop: 5 }}>
              Hours:{this.state.totalHours}
            </Text>
            {/* <Text style={{ color: 'white', marginTop: 5 }}>
            Minutes: {this.state.totalRuntime}
          </Text> */}
          </Tooltip>
        </Col>
      </View>
    )
  }
}
export default withNavigation(UserStats as any)
