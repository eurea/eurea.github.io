import React from 'react'
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import strings from '../helpers/localization'

// import { CharacterData, RankData, WeaponData } from '../helpers/constants'

class ExperienceCalculator extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col xs="4" md="3" lg="2">
            <label className="no-wrap" htmlFor="levelFrom">{strings.levelFrom}</label>
            <input
              min="1"
              max="225"
              type="number"
              className="input-sm form-control"
              id="levelFrom"
              name="levelFrom"
              defaultValue="1"
              onClick={this.selectField}
              onChange={this.handleChange} />
          </Col>
          <Col xs="4" md="3" lg="2">
            <label className="no-wrap" htmlFor="levelTo">{strings.levelTo}</label>
            <input
              min="1"
              max="225"
              type="number"
              className="input-sm form-control"
              id="levelTo"
              name="levelTo"
              defaultValue="1"
              onClick={this.selectField}
              onChange={this.handleChange} />
          </Col>
          <Col xs="4" md="3" lg="2">
            <label className="no-wrap" htmlFor="toNextLevel">{strings.toNextLevel}</label>
            <input
              min="0"
              step="100"
              type="number"
              className="input-sm form-control"
              id="toNextLevel"
              name="toNextLevel"
              defaultValue="0"
              onClick={this.selectField}
              onChange={this.handleChange} />
          </Col>
          <Col xs="4" md="3" lg="2">
            <OverlayTrigger overlay={<Tooltip>{strings.crystals}</Tooltip>}>
              <label className="no-wrap" htmlFor="bonusExp">&#128712;{strings.bonusExp}</label>
            </OverlayTrigger>
            <input
              min="0"
              type="number"
              className="input-sm form-control"
              id="bonusExp"
              name="bonusExp"
              defaultValue="10"
              onClick={this.selectField}
              onChange={this.handleChange} />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default ExperienceCalculator
