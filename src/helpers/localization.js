import LocalizedStrings from 'react-localization'

const english = 'English'
const japanese = '日本語'

export default new LocalizedStrings({
  en: {
    SparkCalc: 'Spark Calc',
    ExpRpCalc: 'RP&EXP Calc',
    crystals: 'Crystals:',
    singleTickets: 'Single tickets:',
    grandTickets: '10x tickets:',
    totalRolls: 'Total rolls:',
    percentage: 'Percentage:',
    levelFrom: 'From:',
    levelTo: 'To:',
    toNextLevel: 'To next level:',
    bonusExp: 'Bonus Exp (%):',
    bonusExpInfo: 'Usually comes from Wonders and Elemental Skills.',
    english,
    japanese
  },
  jp: {
    SparkCalc: '蒼光の御印の計算',
    ExpRpCalc: 'RPとEXPの計算',
    crystals: '宝晶石:',
    singleTickets: 'チケット:',
    grandTickets: '10連チケット:',
    totalRolls: '合計:',
    percentage: '%:',
    levelFrom: 'から:',
    levelTo: 'まで:',
    toNextLevel: '次のLvまで:',
    bonusExp: ' ボーナスEXP (%):',
    bonusExpInfo: '普通に大事なものと属性強化スキルから',
    english,
    japanese
  }
})
