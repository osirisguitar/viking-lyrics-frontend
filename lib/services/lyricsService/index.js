import gpt2Adapter from '../../adapters/gpt2Adapter.js'
import torchRnnAdapter from '../../adapters/torchRnnAdapter.js'
import fs from 'fs/promises'

export const routes = (router) => {
  router.get('/lyrics', async (ctx) => {
    const lyrics = await getLyrics(
      ctx.request.query.model,
      ctx.request.query.text,
      ctx.request.query.length,
      ctx.request.query.temperature,
    )

    ctx.body = lyrics
  })

  router.get('/lastlyrics', async (ctx) => {
    const lyrics = await getLastLyrics()

    ctx.body = lyrics
  })
}

const getLyrics = async (model, intitalText, length, temperature) => {
  if (model === 'gpt2') {
    const lyrics = await gpt2Adapter.getLyrics(intitalText, length, temperature)
    await saveLastLyrics(lyrics)
    return lyrics
  } else {
    return await torchRnnAdapter.getLyrics(intitalText, length, temperature)
  }
}

const getLastLyrics = async () => {
  try
  {
    var lastLyrics = await fs.readFile('lastLyrics.json')
    return JSON.parse(lastLyrics)
  }
  catch (err) {
    return []
  }
}

const saveLastLyrics = async (lyrics) => {
  await fs.writeFile('lastLyrics.json', JSON.stringify(lyrics))
}

export default {
  getLyrics
}
