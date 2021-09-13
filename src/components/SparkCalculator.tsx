import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import strings from '../helpers/localization';
import { SET_SPARK_DATA } from '../store/actions';
import { RootState } from '../store/types';

/* eslint-disable no-bitwise */
const SparkCalculator = () => {
  const dispatch = useDispatch();
  const { crystals, singleTickets, grandTickets } = useSelector((state: RootState) => ({
    crystals: state.crystals,
    singleTickets: state.singleTickets,
    grandTickets: state.grandTickets,
  }));
  const [totalRollsValue, setTotalRollsValue] = useState('0');
  const [percentageValue, setPercentageValue] = useState('');

  useEffect(() => {
    const totalRolls = ~~(
      (parseInt(crystals, 10) / 300)
      + parseInt(singleTickets, 10)
      + (parseInt(grandTickets, 10) * 10)
    );
    setTotalRollsValue(totalRolls.toString());
    setPercentageValue(`${~~((totalRolls / 300) * 100)}%`);
  }, [crystals, singleTickets, grandTickets]);

  const handleFieldClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SET_SPARK_DATA,
      payload: { [e.target.name]: e.target.value },
    });
  };

  return (
    <>
      <Row>
        <Col xs="4" md="3" lg="2">
          <label className="no-wrap" htmlFor="crystals">{strings.crystals}</label>
          <input
            min="0"
            step="100"
            max="999999"
            type="number"
            className="input-sm form-control disable-ff-shadow"
            id="crystals"
            name="crystals"
            value={crystals}
            onClick={handleFieldClick}
            onChange={handleChange}
          />
        </Col>
        <Col xs="4" md="3" lg="2">
          <label className="no-wrap" htmlFor="singleTickets">{strings.singleTickets}</label>
          <input
            min="0"
            max="9999"
            type="number"
            className="input-sm form-control"
            id="singleTickets"
            name="singleTickets"
            value={singleTickets}
            onClick={handleFieldClick}
            onChange={handleChange}
          />
        </Col>
        <Col xs="4" md="3" lg="2">
          <label className="no-wrap" htmlFor="grandTickets">{strings.grandTickets}</label>
          <input
            min="0"
            max="999"
            type="number"
            className="input-sm form-control"
            id="grandTickets"
            name="grandTickets"
            value={grandTickets}
            onClick={handleFieldClick}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row className="pt-2">
        <Col xs="4" md="3" lg="2">
          <label className="no-wrap" htmlFor="totalRolls">{strings.totalRolls}</label>
          <input
            disabled
            type="text"
            className="input-sm form-control"
            id="totalRolls"
            name="totalRolls"
            value={totalRollsValue}
          />
        </Col>
        <Col xs="4" md="3" lg="2">
          <label className="no-wrap" htmlFor="percentage">{strings.percentage}</label>
          <input
            disabled
            type="text"
            className="input-sm form-control"
            id="percentage"
            name="percentage"
            value={percentageValue}
          />
        </Col>
      </Row>
    </>
  );
};

export default SparkCalculator;
