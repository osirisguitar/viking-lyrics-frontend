import axios from 'axios'

const getLyrics = async (initialText, length, temperature) => {
  const pre = Date.now()
  const { data } = await axios.get(`http://viking-gpt2:8866/generate?text=${initialText}&length=${length}&temperature=${temperature}`)
  const duration = Math.floor((Date.now() - pre)/1000)

  return { 
    lyrics: data,
    duration
  }
}

export default {
  getLyrics
}