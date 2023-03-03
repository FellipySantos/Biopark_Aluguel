import fastify from 'fastify'
import { prediosRoutes } from './routes/predios'

const app = fastify()

app.register(prediosRoutes, {
  prefix: 'Predios',
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server starting')
  })
