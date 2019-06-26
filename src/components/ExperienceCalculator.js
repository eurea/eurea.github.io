import React from 'react'
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import '../styles/ExperienceCalculator.scss'
import strings from '../helpers/localization'
import infoIcon from '../icons/info-filled.svg'
import { ExperienceTypes } from '../helpers/constants'
import { ExperienceData } from '../helpers/constants'

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
    maxLevel: ExperienceData[ExperienceTypes.Weapon].maxLevel,
    experienceTable: ExperienceData[ExperienceTypes.Weapon].experienceTable
  }

  componentDidMount() {
    this.recalculateExperience()
  }

  recalculateExperience = () => {
    this.setState({
      ...ExperienceData[this.state.expType]
    }, () => {
      const getRequiredItemsCount = (totalExperience, itemExperience) => {
        return Math.ceil(totalExperience / (itemExperience + Math.floor(itemExperience * (this.state.bonusExp / 100))))
      }

      if (this.state.levelFrom > this.state.maxLevel
        || this.state.levelTo > this.state.maxLevel) {
        // TODO: displayError()
        return
      }

      if (this.state.levelFrom > this.state.levelTo) {
        // TODO: displayError()
        return
      }

      const archangelExp = this.state.sameType ? 750 : 500
      const vesselExp = 30000
      let currentExperience = 0
      if (this.state.toNextLevel > 0) {
        currentExperience = (this.state.experienceTable[this.state.levelFrom + 1]
          - this.state.experienceTable[this.state.levelFrom]) - this.state.toNextLevel
      }
      let totalExperience = this.state.experienceTable[this.state.levelTo]
        - this.state.experienceTable[this.state.levelFrom] - currentExperience
      if (this.state.expType !== ExperienceTypes.Rank) {
        const vessels = getRequiredItemsCount(totalExperience, vesselExp)
        const archangelItems = getRequiredItemsCount(totalExperience, archangelExp)
        this.setState({ vessels, archangelItems })
      }
      this.setState({ totalExperience })
    })
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
    this.setState({ [e.target.name]: e.target.checked }, () => {
      this.recalculateExperience()
    })
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col xs="4" md="3" lg="2">
            <label className="no-wrap" htmlFor="levelFrom">{strings.levelFrom}</label>
            <input
              min="0"
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
              min="0"
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
          {/* TODO: add top margin on small screens*/}
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
