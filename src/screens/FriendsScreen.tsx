import * as React from 'react'
import { Container, Grid, Row, Col, Text, Content } from 'native-base'
export default class FriendsList extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row>
              <Col>
                <Text>Show me the money</Text>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
}
