import fastify from 'fastify'
import { prediosRoutes } from './routes/predios'
import { apartamentoRoutes } from './routes/apartamentos'
import { locacoesRoutes } from './routes/locacoes'
import { moradoresRoutes } from './routes/moradores'
const app = fastify()

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
  prefix: 'Aluguel',
})
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server starting')
  })
