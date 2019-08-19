import React from 'react'
import { Alert, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import '../styles/ExperienceCalculator.scss'
import strings from '../helpers/localization'
import infoIcon from '../icons/info-filled.svg'
import { ExperienceTables, ExperienceTypes } from '../helpers/constants'

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
    showError: false,
    maxLevel: ExperienceTables[ExperienceTypes.Weapon].length - 1,
    experienceTable: ExperienceTables[ExperienceTypes.Weapon]
  }

  componentDidMount() {
    this.recalculateExperience()
  }

  recalculateExperience = () => {
    const { levelFrom, levelTo } = this.state
    const maxLevel = ExperienceTables[this.state.expType].length - 1

    this.setState({
      experienceTable: ExperienceTables[this.state.expType],
      levelFrom: levelFrom > maxLevel ? maxLevel : levelFrom,
      levelTo: levelTo > maxLevel ? maxLevel : levelTo,
      maxLevel
    }, () => {
      const { bonusExp, experienceTable, expType, levelFrom, levelTo, sameType, toNextLevel } = this.state
      const archangelExp = sameType ? 750 : 500
      const vesselExp = 30000
      let currentExperience = 0
      let archangelItems = 0

      const getRequiredItemsCount = (totalExperience, itemExperience) => {
        return Math.ceil(totalExperience / (itemExperience + Math.floor(itemExperience * (bonusExp / 100))))
      }

      if (levelFrom > levelTo) {
        this.setState({ showError: true })
        return
      }
      this.setState({ showError: false })
      if (toNextLevel > 0) {
        currentExperience = (experienceTable[levelFrom + 1] - experienceTable[levelFrom]) - toNextLevel
      }
      const totalExperience = experienceTable[levelTo] - experienceTable[levelFrom] - currentExperience
      if (expType !== ExperienceTypes.Rank) {
        const vessels = getRequiredItemsCount(totalExperience, vesselExp)
        archangelItems = getRequiredItemsCount(totalExperience, archangelExp)
        this.setState({ vessels })
      } else {
        archangelItems = (experienceTable[levelFrom] / experienceTable[experienceTable.length - 1] * 100).toFixed(2)
      }
      this.setState({ archangelItems, totalExperience })
    })
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: parseInt(e.target.value) || '' }, () => {
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
              max={this.state.maxLevel}
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
          <Col xs="4" md="3" lg="2" className="will-hide tooltip-col"
               hidden={this.state.expType === ExperienceTypes.Rank}>
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
              id="sameType"
              name="sameType"
              className="checkbox-input"
              checked={this.state.sameType}
              onChange={this.handleCheckbox} />
            <label htmlFor="sameType" className="checkbox-label mb-0">
              <span className="checkbox" />
            </label>
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
          <Col xs="4" md="3" lg="2">
            <label className="no-wrap" htmlFor="archangelItems">
              {this.state.expType !== ExperienceTypes.Rank ? strings.archangelItems : strings.rpPercentage}
            </label>
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
        <Alert variant="danger" className="mb-0 mt-3" show={this.state.showError}>
          <strong className="align-middle">{strings.error}: </strong><span
          className="align-middle">{strings.cantDowngrade}</span>
        </Alert>
      </React.Fragment>
    )
  }
}

export default ExperienceCalculator
