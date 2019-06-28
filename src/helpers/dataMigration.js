export default function () {
  const newState = {
    languageCode: localStorage.getItem('lang') || 'en',
    crystals: localStorage.getItem('crystals') || 0,
    singleTickets: localStorage.getItem('singles') || 0,
    grandTickets: localStorage.getItem('tens') || 0
  }
  localStorage.clear()

  return newState
}
