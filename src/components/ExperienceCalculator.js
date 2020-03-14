import React, { useEffect, useState } from 'react'
import { Alert, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import '../styles/ExperienceCalculator.scss'
import strings from '../helpers/localization'
import infoIcon from '../assets/info-filled.svg'
import { ExperienceTables, ExperienceTypes } from '../helpers/constants'

const ExperienceCalculator = () => {
  const [levelFrom, setLevelFrom] = useState(1)
  const [levelTo, setLevelTo] = useState(40)
  const [toNextLevel, setToNextLevel] = useState(0)
  const [bonusExp, setBonusExp] = useState(10)

  const [expType, setExpType] = useState(ExperienceTypes.Weapon)
  const [sameType, setSameType] = useState(false)

  const [totalExperience, setTotalExperience] = useState(0)
  const [archangelItems, setArchangelItems] = useState('0')
  const [vessels, setVessels] = useState(0)

  const [showError, setShowError] = useState(false)
  const [maxLevel, setMaxLevel] = useState(ExperienceTables[ExperienceTypes.Weapon].length - 1)
  const [experienceTable, setExperienceTable] = useState(ExperienceTables[ExperienceTypes.Weapon])

  useEffect(() => {
    setMaxLevel(ExperienceTables[expType].length - 1)
    setExperienceTable(ExperienceTables[expType])
    setLevelFrom(levelFrom > maxLevel ? maxLevel : levelFrom)
    setLevelTo(levelTo > maxLevel ? maxLevel : levelTo)

    const archangelExp = sameType ? 750 : 500
    const vesselExp = 30000
    let currentExperience = 0
    let archangelItems = 0

    const getRequiredItemsCount = (totalExperience, itemExperience) => {
      return Math.ceil(totalExperience / (itemExperience + Math.floor(itemExperience * (bonusExp / 100))))
    }

    if (levelFrom > levelTo) {
      setShowError(true)
      return
    }
    setShowError(false)
    if (toNextLevel > 0) {
      currentExperience = (experienceTable[levelFrom + 1] - experienceTable[levelFrom]) - toNextLevel
    }
    const totalExperience = experienceTable[levelTo] - experienceTable[levelFrom] - currentExperience
    if (expType !== ExperienceTypes.Rank) {
      const vessels = getRequiredItemsCount(totalExperience, vesselExp)
      archangelItems = getRequiredItemsCount(totalExperience, archangelExp)
      setVessels(vessels)
    } else {
      archangelItems = (experienceTable[levelFrom] / experienceTable[experienceTable.length - 1] * 100).toFixed(2)
    }
    setArchangelItems(archangelItems.toString())
    setTotalExperience(totalExperience)
  }, [levelFrom, levelTo, toNextLevel, bonusExp, expType, sameType, experienceTable, maxLevel])

  const handleExperienceTypeChange = (e) => {
    setExpType(e.target.value)
  }

  return (
    <>
      <Row>
        <Col xs='4' md='3' lg='2'>
          <label className='no-wrap' htmlFor='levelFrom'>{strings.levelFrom}</label>
          <input
            min='0'
            max={maxLevel}
            type='number'
            className='input-sm form-control'
            id='levelFrom'
            name='levelFrom'
            value={levelFrom}
            onChange={(e) => setLevelFrom(parseInt(e.target.value))}
          />
        </Col>
        <Col xs='4' md='3' lg='2'>
          <label className='no-wrap' htmlFor='levelTo'>{strings.levelTo}</label>
          <input
            min='0'
            max={maxLevel}
            type='number'
            className='input-sm form-control'
            id='levelTo'
            name='levelTo'
            value={levelTo}
            onChange={(e) => setLevelTo(parseInt(e.target.value))}
          />
        </Col>
        <Col xs='4' md='3' lg='2'>
          <label className='no-wrap' htmlFor='toNextLevel'>{strings.toNextLevel}</label>
          <input
            min='0'
            step='100'
            type='number'
            className='input-sm form-control'
            id='toNextLevel'
            name='toNextLevel'
            value={toNextLevel}
            onChange={(e) => setToNextLevel(parseInt(e.target.value))}
          />
        </Col>
        <Col xs='4' md='3' lg='2' className='will-hide tooltip-col' hidden={expType === ExperienceTypes.Rank}>
          <OverlayTrigger overlay={<Tooltip id='bonus-info-tooltip'>{strings.bonusExpInfo}</Tooltip>}>
            <label className='no-wrap' htmlFor='bonusExp'>
              <img src={infoIcon} alt='info icon' width='16' /> {strings.bonusExp}
            </label>
          </OverlayTrigger>
          <input
            min='0'
            type='number'
            className='input-sm form-control'
            id='bonusExp'
            name='bonusExp'
            value={bonusExp}
            onChange={(e) => setBonusExp(parseInt(e.target.value))}
          />
        </Col>
      </Row>
      <Row className='mt-3'>
        <div className='radio-tile-group'>
          <div className='input-container'>
            <input
              id='weaponExperience'
              type='radio'
              name='expType'
              className='radio-button'
              value={ExperienceTypes.Weapon}
              checked={expType === ExperienceTypes.Weapon}
              onChange={handleExperienceTypeChange}
            />
            <div className='radio-tile'>
              <label htmlFor='weaponExperience' className='radio-tile-label'>
                {strings.weaponSummon}
              </label>
            </div>
          </div>
          <div className='input-container'>
            <input
              id='characterExperience'
              type='radio'
              name='expType'
              className='radio-button'
              value={ExperienceTypes.Character}
              checked={expType === ExperienceTypes.Character}
              onChange={handleExperienceTypeChange}
            />
            <div className='radio-tile'>
              <label
                htmlFor='characterExperience'
                className='radio-tile-label'
              >
                {strings.character}
              </label>
            </div>
          </div>
          <div className='input-container'>
            <input
              id='rankExperience'
              type='radio'
              name='expType'
              className='radio-button'
              value={ExperienceTypes.Rank}
              checked={expType === ExperienceTypes.Rank}
              onChange={handleExperienceTypeChange}
            />
            <div className='radio-tile'>
              <label htmlFor='rankExperience' className='radio-tile-label'>
                {strings.rank}
              </label>
            </div>
          </div>
        </div>
        <Col md='2' className='align-items-center checkbox-col will-hide' hidden={expType === ExperienceTypes.Rank}>
          <label htmlFor='sameType' className='m-0 pr-2 no-wrap'>{strings.sameType}</label>
          <input
            type='checkbox'
            id='sameType'
            name='sameType'
            className='checkbox-input'
            checked={sameType}
            onChange={(e) => setSameType(e.target.checked)}
          />
          <label htmlFor='sameType' className='checkbox-label mb-0'>
            <span className='checkbox' />
          </label>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col xs='4' md='3' lg='2'>
          <label className='no-wrap' htmlFor='totalExperience'>{strings.totalExperience}</label>
          <input
            disabled
            type='number'
            id='totalExperience'
            name='totalExperience'
            className='input-sm form-control'
            value={totalExperience}
          />
        </Col>
        <Col xs='4' md='3' lg='2'>
          <label className='no-wrap' htmlFor='archangelItems'>
            {expType !== ExperienceTypes.Rank ? strings.archangelItems : strings.rpPercentage}
          </label>
          <input
            disabled
            type='text'
            id='archangelItems'
            name='archangelItems'
            className='input-sm form-control'
            value={archangelItems}
          />
        </Col>
        <Col xs='4' md='3' lg='2' className='will-hide' hidden={expType === ExperienceTypes.Rank}>
          <label className='no-wrap' htmlFor='vessels'>{strings.vessels}</label>
          <input
            disabled
            type='number'
            id='vessels'
            name='vessels'
            value={vessels}
            className='input-sm form-control'
          />
        </Col>
      </Row>
      <Alert variant='danger' className='mb-0 mt-3' show={showError}>
        <strong className='align-middle'>{strings.error}: </strong>
        <span className='align-middle'>{strings.cantDowngrade}</span>
      </Alert>
    </>
  )
}

export default ExperienceCalculator
