import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import strings from '../helpers/localization'
import { SET_SPARK_DATA } from '../store/actions'

const SparkCalculator = () => {
  const dispatch = useDispatch()
  const { crystals, singleTickets, grandTickets } = useSelector(state => ({
    crystals: state.crystals,
    singleTickets: state.singleTickets,
    grandTickets: state.grandTickets
  }))
  const [totalRolls, setTotalRolls] = useState('0')
  const [percentage, setPercentage] = useState('')

  useEffect(() => {
    const totalRolls = (
      (parseInt(crystals, 10) / 300) +
      parseInt(singleTickets, 10) +
      (parseInt(grandTickets, 10) * 10)
    ).toFixed()
    setTotalRolls(totalRolls.toString())
    setPercentage(`${~~(totalRolls / 300 * 100)}%`)
  }, [crystals, singleTickets, grandTickets])

  const handleFieldClick = (e) => {
    e.target.select()
  }

  const handleChange = (e) => {
    dispatch({
      type: SET_SPARK_DATA,
      payload: { [e.target.name]: e.target.value }
    })
  }

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
            value={crystals}
            onClick={handleFieldClick}
            onChange={handleChange}
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
            value={singleTickets}
            onClick={handleFieldClick}
            onChange={handleChange}
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
            value={grandTickets}
            onClick={handleFieldClick}
            onChange={handleChange}
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
            value={totalRolls}
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
            value={percentage}
          />
        </Col>
      </Row>
    </>
  )
}

export default SparkCalculator
