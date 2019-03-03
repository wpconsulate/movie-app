import React from 'react'
import { StackedBarChart } from 'react-native-svg-charts'
import { View, Text } from 'native-base'
import { StyleSheet } from 'react-native'
import {Row, Col} from 'native-base'

//given to StatsKey to provide circle colour, text next to circle and total watch in that section
interface IProps {
  text: String
  colour: string
  total: string
}

//colour wouldnt take props colour

//return circle with text and total eg <O completed      500>
function StatsKey(props: IProps) {
  const styles = StyleSheet.create({
    view: {
      width: 15,
      height: 15,
      borderRadius: 100 / 2,
      backgroundColor: props.colour,
    },
    text: {
      color: 'white',
    },
  })
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={styles.view} />
      <Text
        style={
          { marginLeft: 10, flex: 3, fontFamily: 'PoppinsMedium' , color: "white"}}
      >
        {props.text}{' '}
      </Text>
      <Text style={styles.text}>{props.total}</Text>
    </View>
  )
}

export default class UserStats extends React.PureComponent {
  render() {
    const style = StyleSheet.create({
      parent: {
        flex: 1,
        marginLeft: 10
      },
    })
    const data = [
      {
        Watching: 500,
        Completed: 100,
        Dropped: 7,
        PlanToWatch: 15,
      },
    ]

    const colors = ['#2A59FF', '#56CCF2', '#FF0000', '#C4C4C4']
    const keys: Array<'Watching' | 'Completed' | 'Dropped' | 'PlanToWatch'> = [
      'Watching',
      'Completed',
      'Dropped',
      'PlanToWatch',
    ]
    return (
      <View style={style.parent}>
        <StackedBarChart
          style={{ height: 40 }}
          keys={keys}
          colors={colors}
          data={data}
          showGrid={false}
          contentInset={{ top: 5, bottom: 5 }}
          horizontal={true}
        />

        <StatsKey text="Watching" colour="#2A59FF" total="500" />
        <StatsKey text="Completed" colour="#56CCF2" total="100" />
        <StatsKey text="Dropped" colour="#FF0000" total="7" />
        <StatsKey text="Plan To Watch" colour="#C4C4C4" total="15" />
        {/* <Container> */}
        <Row>
          <Col>
          <Text>Total Entries:{data[0].Completed + data[0].Watching + data[0].Dropped + data[0].PlanToWatch}</Text>
          <Text>Review:19</Text>
          </Col>

          <Col >
          <Text>Days:200</Text>
          <Text>Hours:1400</Text> 
          <Row>
         <Col>
          <Text>Online: Now</Text>
          <Text>Joined: 12/02/2019</Text>
         </Col>
        </Row>       
          </Col>
          
        </Row>
        
        {/* </Container> */}
        
      </View>
    )
  }
}
