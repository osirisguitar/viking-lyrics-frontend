import axios from 'axios'

const getLyrics = async (initialText, length, temperature) => {
  const { data } = await axios.get(`http://viking-gpt2:8866/generate?text=${initialText}&length=${length}&temperature=${temperature}`)

  return { lyrics: data }
}

export default {
  getLyrics
}