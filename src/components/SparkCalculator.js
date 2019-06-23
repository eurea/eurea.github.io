import React from 'react'
import strings from '../helpers/localization'
import { SET_SPARK_DATA } from '../helpers/actions'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'

class SparkCalculator extends React.Component {
  state = {
    crystals: 0,
    singleTickets: 0,
    grandTickets: 0
  }

  componentWillMount() {
    this.setState({
      crystals: this.props.crystals,
      singleTickets: this.props.singleTickets,
      grandTickets: this.props.grandTickets,
    })
  }

  selectFieldData = (e) => {
    e.target.select()
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.props.dispatch({ type: SET_SPARK_DATA, payload: this.state })
    })
  }

  render() {
    return (
      <React.Fragment>
        <Row className="justify-content-start">
          <Col xs="4" md="3" lg="2">
            <label className="no-wrap" htmlFor="crystals">{strings.crystals}</label>
            <input
              type="number"
              className="input-sm form-control"
              name="crystals"
              defaultValue={this.state.crystals}
              onClick={this.selectFieldData}
              onChange={this.handleChange} />
          </Col>
          <Col xs="4" md="3" lg="2">
            <label className="no-wrap" htmlFor="singleTickets">{strings.singleTickets}</label>
            <input
              type="number"
              className="input-sm form-control"
              name="singleTickets"
              defaultValue={this.state.singleTickets}
              onClick={this.selectFieldData}
              onChange={this.handleChange} />
          </Col>
          <Col xs="4" md="3" lg="2">
            <label className="no-wrap" htmlFor="grandTickets">{strings.grandTickets}</label>
            <input
              type="number"
              className="input-sm form-control"
              name="grandTickets"
              defaultValue={this.state.grandTickets}
              onClick={this.selectFieldData}
              onChange={this.handleChange} />
          </Col>
        </Row>
        <Row>
          <Col xs="4" md="3" lg="2">
            <label className="no-wrap" htmlFor="totalRolls">{strings.totalRolls}</label>
            <input
              disabled
              type="text"
              className="input-sm form-control"
              name="totalRolls"
              defaultValue={this.state.totalRolls}
              onClick={this.selectFieldData}
              onChange={this.handleChange} />
          </Col>
          <Col xs="4" md="3" lg="2">
            <label className="no-wrap" htmlFor="percentage">{strings.percentage}</label>
            <input
              disabled
              type="text"
              className="input-sm form-control"
              name="percentage"
              defaultValue={this.state.percentage}
              onClick={this.selectFieldData}
              onChange={this.handleChange} />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default connect((state) => ({
  crystals: state.crystals,
  singleTickets: state.singleTickets,
  grandTickets: state.grandTickets
}))(SparkCalculator)
