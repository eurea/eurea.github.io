import React from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import strings from '../helpers/localization'
import { SET_SPARK_DATA } from '../actions'

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
      grandTickets: this.props.grandTickets
    }, this.recalculateRolls)
  }

  handleFieldClick = (e) => {
    e.target.select()
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.props.dispatch({
        type: SET_SPARK_DATA,
        payload: {
          crystals: this.state.crystals,
          singleTickets: this.state.singleTickets,
          grandTickets: this.state.grandTickets
        }
      })
      this.recalculateRolls()
    })
  }

  recalculateRolls = () => {
    const { crystals, singleTickets, grandTickets } = this.state
    const totalRolls = ((parseInt(crystals, 10) / 300) +
      parseInt(singleTickets, 10) +
      (parseInt(grandTickets, 10) * 10)
    ).toFixed()
    const percentage = ~~(totalRolls / 300 * 100) + '%'
    this.setState({ totalRolls, percentage })
  }

  render() {
    return (
      <>
        <Row>
          <Col xs='4' md='3' lg='2'>
            <label className='no-wrap' htmlFor='crystals'>{strings.crystals}</label>
            <input
              min='0'
              step='100'
              max='999999'
              type='number'
              className='input-sm form-control disable-ff-shadow'
              id='crystals'
              name='crystals'
              defaultValue={this.state.crystals}
              onClick={this.handleFieldClick}
              onChange={this.handleChange}
            />
          </Col>
          <Col xs='4' md='3' lg='2'>
            <label className='no-wrap' htmlFor='singleTickets'>{strings.singleTickets}</label>
            <input
              min='0'
              max='9999'
              type='number'
              className='input-sm form-control'
              id='singleTickets'
              name='singleTickets'
              defaultValue={this.state.singleTickets}
              onClick={this.handleFieldClick}
              onChange={this.handleChange}
            />
          </Col>
          <Col xs='4' md='3' lg='2'>
            <label className='no-wrap' htmlFor='grandTickets'>{strings.grandTickets}</label>
            <input
              min='0'
              max='999'
              type='number'
              className='input-sm form-control'
              id='grandTickets'
              name='grandTickets'
              defaultValue={this.state.grandTickets}
              onClick={this.handleFieldClick}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
        <Row className='pt-2'>
          <Col xs='4' md='3' lg='2'>
            <label className='no-wrap' htmlFor='totalRolls'>{strings.totalRolls}</label>
            <input
              disabled
              type='text'
              className='input-sm form-control'
              id='totalRolls'
              name='totalRolls'
              defaultValue={this.state.totalRolls}
              onClick={this.handleFieldClick}
              onChange={this.handleChange}
            />
          </Col>
          <Col xs='4' md='3' lg='2'>
            <label className='no-wrap' htmlFor='percentage'>{strings.percentage}</label>
            <input
              disabled
              type='text'
              className='input-sm form-control'
              id='percentage'
              name='percentage'
              defaultValue={this.state.percentage}
              onClick={this.handleFieldClick}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
      </>
    )
  }
}

export default connect((state) => ({
  crystals: state.crystals,
  singleTickets: state.singleTickets,
  grandTickets: state.grandTickets
}))(SparkCalculator)
