import axios from 'axios'

const getLyrics = async (initialText, length, temperature) => {
  const { data } = await axios.get(`https://vikinglyrics.metalcoder.dev/lyrics?length=${length}&temperature=${temperature}&start=${initialText}`)

  //data.lyrics = data.lyrics.slice(0, -2)

  return data
}

export default {
  getLyrics
}