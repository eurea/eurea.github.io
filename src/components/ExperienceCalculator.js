import React from 'react'
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import '../styles/ExperienceCalculator.scss'
import strings from '../helpers/localization'
import infoIcon from '../icons/info-filled.svg'
import { ExperienceTypes } from '../helpers/constants'

// import { CharacterData, RankData, WeaponData } from '../helpers/constants'

class ExperienceCalculator extends React.Component {
  state = {
    expType: 'weapon'
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

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
            <OverlayTrigger overlay={<Tooltip>{strings.bonusExpInfo}</Tooltip>}>
              <label className="no-wrap" htmlFor="bonusExp">
                <img src={infoIcon} alt="info icon" width="16" /> {strings.bonusExp}
              </label>
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
        <Row>
          <div className="radio-tile-group">
            <div className="input-container">
              <input
                id="weaponExperience"
                type="radio"
                name="expType"
                className="radio-button"
                value={ExperienceTypes.Weapon}
                checked={this.state.expType === ExperienceTypes.Weapon}
                onChange={this.handleChange} />
              <div className="radio-tile">
                <label
                  htmlFor="weaponExperience"
                  className="radio-tile-label">
                  {strings.weaponSummon}
                </label>
              </div>
            </div>
            <div className="input-container">
              <input
                id="characterExperience"
                type="radio"
                name="expType"
                className="radio-button"
                value={ExperienceTypes.Character}
                checked={this.state.expType === ExperienceTypes.Character}
                onChange={this.handleChange} />
              <div className="radio-tile">
                <label
                  htmlFor="characterExperience"
                  className="radio-tile-label">
                  {strings.character}
                </label>
              </div>
            </div>
            <div className="input-container">
              <input
                id="rankExperience"
                type="radio"
                name="expType"
                className="radio-button"
                value={ExperienceTypes.Rank}
                checked={this.state.expType === ExperienceTypes.Rank}
                onChange={this.handleChange} />
              <div className="radio-tile">
                <label
                  htmlFor="rankExperience"
                  className="radio-tile-label">
                  {strings.rank}
                </label>
              </div>
            </div>
          </div>
        </Row>
      </React.Fragment>
    )
  }
}

export default ExperienceCalculator
