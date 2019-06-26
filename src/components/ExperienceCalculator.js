import React from 'react'
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import '../styles/ExperienceCalculator.scss'
import strings from '../helpers/localization'
import infoIcon from '../icons/info-filled.svg'
import { ExperienceTypes } from '../helpers/constants'
import { CharacterData, RankData, WeaponData } from '../helpers/constants'

class ExperienceCalculator extends React.Component {
  state = {
    expType: ExperienceTypes.Weapon,
    bonusExp: 10,
    sameType: false,
    totalExperience: 0,
    archangelItems: 0,
    vessels: 0,
    levelTo: 40,
    levelFrom: 1,
    toNextLevel: 0,
    maxLevel: WeaponData.maxLevel,
    expTable: WeaponData.experienceTable
  }

  componentDidMount() {
    this.recalculateExperience()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.expType !== this.state.expType) {
      switch (this.state.expType) {
        case ExperienceTypes.Weapon: {
          this.setState({ ...WeaponData })
          break
        }
        case ExperienceTypes.Character: {
          this.setState({ ...CharacterData })
          break
        }
        case ExperienceTypes.Rank: {
          this.setState({ ...RankData })
          break
        }
        default: {
          this.setState({ ...WeaponData })
          break
        }
      }
    }
  }

  recalculateExperience = () => {
    if (this.state.levelFrom > this.state.maxLevel) {
      this.setState({ levelFrom: 1 })
    }

    if (this.state.levelTo > this.state.maxLevel) {
      this.setState({ levelTo: this.state.maxLevel })
    }

    if (this.state.levelFrom <= this.state.levelTo) {
      const archangelExp = this.state.sameType ? 750 : 500
      const vesselExp = 30000
      let currentExp = (this.state.expTable[this.state.levelFrom + 1] - this.state.expTable[this.state.levelFrom]) - this.state.toNextLevel
      let totalExperience = this.state.expTable[this.state.levelTo] - this.state.expTable[this.state.levelFrom] - currentExp
      if (this.state.expType !== ExperienceTypes.Rank) {
        let vessels = Math.ceil(totalExperience / (vesselExp + Math.floor(vesselExp * (this.state.bonusExp / 100))))
        let archangelItems = Math.ceil(totalExperience / (archangelExp + Math.floor(archangelExp * (this.state.bonusExp / 100))))
        this.setState({ vessels, archangelItems })
      }
      this.setState({ totalExperience })
    } else {
      this.setState({ levelFrom: 1, levelTo: 40 })
    }
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: parseInt(e.target.value) }, () => {
      this.recalculateExperience()
    })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.recalculateExperience()
    })
  }

  handleCheckbox = (e) => {
    this.setState({ [e.target.name]: e.target.checked })
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
              value={this.state.levelFrom}
              onChange={this.handleInputChange} />
          </Col>
          <Col xs="4" md="3" lg="2">
            <label className="no-wrap" htmlFor="levelTo">{strings.levelTo}</label>
            <input
              min="1"
              max={this.state.maxLevel}
              type="number"
              className="input-sm form-control"
              id="levelTo"
              name="levelTo"
              value={this.state.levelTo}
              onChange={this.handleInputChange} />
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
              value={this.state.toNextLevel}
              onChange={this.handleInputChange} />
          </Col>
          <Col xs="4" md="3" lg="2" className="will-hide" hidden={this.state.expType === ExperienceTypes.Rank}>
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
              value={this.state.bonusExp}
              onChange={this.handleInputChange} />
          </Col>
        </Row>
        <Row className="mt-3">
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
          <Col
            md="2"
            className="align-items-center checkbox-col will-hide"
            hidden={this.state.expType === ExperienceTypes.Rank}>
            <label htmlFor="sameType" className="m-0 pr-2 no-wrap">{strings.sameType}</label>
            <input
              type="checkbox"
              name="sameType"
              id="sameType"
              checked={this.state.sameType}
              onChange={this.handleCheckbox} />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs="4" md="3" lg="2">
            <label className="no-wrap" htmlFor="totalExperience">{strings.totalExperience}</label>
            <input
              disabled
              type="number"
              id="totalExperience"
              name="totalExperience"
              className="input-sm form-control"
              value={this.state.totalExperience}
              onChange={this.handleChange} />
          </Col>
          <Col xs="4" md="3" lg="2" className="will-hide" hidden={this.state.expType === ExperienceTypes.Rank}>
            <label className="no-wrap" htmlFor="archangelItems">{strings.archangelItems}</label>
            <input
              disabled
              type="number"
              id="archangelItems"
              name="archangelItems"
              className="input-sm form-control"
              value={this.state.archangelItems}
              onChange={this.handleChange} />
          </Col>
          <Col xs="4" md="3" lg="2" className="will-hide" hidden={this.state.expType === ExperienceTypes.Rank}>
            <label className="no-wrap" htmlFor="vessels">{strings.vessels}</label>
            <input
              disabled
              type="number"
              id="vessels"
              name="vessels"
              value={this.state.vessels}
              className="input-sm form-control"
              onChange={this.handleChange} />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default ExperienceCalculator
