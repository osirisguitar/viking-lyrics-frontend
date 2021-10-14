import axios from 'axios'

const getLyrics = async (initialText, length, temperature) => {
  const { data } = await axios.get(`http://viking-lyrics:8899/lyrics?length=${length}&temperature=${temperature}&start=${initialText}`)

  return data
}

export default {
  getLyrics
}