import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'

export async function prediosRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    return knex.select('*').from('Predios')
  })
  app.post('/', async (req, res) => {
    const typePredio = z.object({
      nome: z.string(),
    })

    const { nome } = typePredio.parse(req.body)
    await knex('Predios').insert({
      id: randomUUID(),
      nome,
    })
    return res.status(201).send()
  })
}
