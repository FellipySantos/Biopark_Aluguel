import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'

export async function apartamentoRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    return knex.select('*').from('Apartamentos')
  })
  app.post('/', async (req, res) => {
    const typeApartamento = z.object({
      andar: z.string(),
      tamanho: z.string(),
      valor: z.number(),
      predioId: z.string(),
      alugado: z.boolean(),
    })

    const { andar, tamanho, valor, predioId, alugado } = typeApartamento.parse(
      req.body,
    )
    await knex('Apartamentos').insert({
      id: randomUUID(),
      andar,
      tamanho,
      valor,
      predioId,
      alugado,
    })
    return res.status(201).send()
  })
}
