import Koa from 'koa'
const app = new Koa()
import koaRouter from '@koa/router'
const router = koaRouter()
import serve from 'koa-static'
import bodyParser from 'koa-bodyparser'
import { routes as lyricsRoutes } from './services/lyricsService/index.js'

const port = process.env.port || 8877

const start = () => {
  app.use(bodyParser())

  lyricsRoutes(router)

  app
    .use(serve('lib/static', { extensions: true }))
    .use(router.routes())
    .use(router.allowedMethods())

  const server = app.listen(port)
  server.timeout = 5 * 60 * 1000
  console.log('Server listening on port', port)
}

export default {
  start
}