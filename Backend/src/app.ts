import fastify from 'fastify'
import { prediosRoutes } from './routes/predios'
import { apartamentoRoutes } from './routes/apartamentos'
import { locacoesRoutes } from './routes/locacoes'
import { moradoresRoutes } from './routes/moradores'
import cors from '@fastify/cors'
const app = fastify()
app.register(cors, {
  origin: '*',
})
app.register(prediosRoutes, {
  prefix: 'Predios',
})
app.register(apartamentoRoutes, {
  prefix: 'Apartamentos',
})
app.register(locacoesRoutes, {
  prefix: 'Aluguel',
})
app.register(moradoresRoutes, {
  prefix: 'Moradores',
})
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server starting')
  })
