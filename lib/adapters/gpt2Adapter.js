import axios from 'axios'

const getLyrics = async (initialText, length, temperature) => {
  const { data } = await axios.get(`https://viking-gpt2.metalcoder.dev/generate?text=${initialText}&length=${length}&temperature=${temperature}`)

  return { lyrics: data }
}

export default {
  getLyrics
}