import React, { PropTypes } from 'react'
import { Router, browserHistory } from 'react-router'
import Header  from './main/header'
import {Grid} from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'

export default class App extends React.Component {
  render() { //all comps go here
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={12}>
              <div>
                <h1>React Lab</h1>
                <Header />
                <div className="s20" />
                {this.props.children}
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
}
