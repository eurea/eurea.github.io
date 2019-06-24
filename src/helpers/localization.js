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
    english,
    japanese
  }
})
