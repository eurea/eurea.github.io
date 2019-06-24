export default function () {
  if (localStorage.getItem('crystals')
    || localStorage.getItem('singles')
    || localStorage.getItem('tens')
    || localStorage.getItem('lang')) {
    const newState = {
      languageCode: localStorage.getItem('lang') || 'en',
      crystals: localStorage.getItem('crystals') || 0,
      singleTickets: localStorage.getItem('singles') || 0,
      grandTickets: localStorage.getItem('tens') || 0
    }
    localStorage.clear()

    return newState
  } else {
    return {
      languageCode: 'en',
      crystals: 0,
      singleTickets: 0,
      grandTickets: 0
    }
  }
}
