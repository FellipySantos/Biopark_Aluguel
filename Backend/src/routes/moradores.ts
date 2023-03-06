import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'

export async function moradoresRoutes(app: FastifyInstance) {
  app.get('/:id', async (req) => {
    const typeLocacao = z.object({
      id: z.string(),
    })
    const { id } = typeLocacao.parse(req.params)

    return knex('Moradores').where('id', id).first()
  })
  app.post('/', async (req, res) => {
    const typeMorador = z.object({
      documento: z.string(),
      nome: z.string(),
      email: z.string(),
      telefone: z.string(),
      morador: z.boolean(),
      dataEntrada: z.string().datetime({
        message: 'Expected date, received string',
      }),
      dataSaida: z.string().datetime({
        message: 'Expected date, received string',
      }),
    })

    const {
      documento,
      nome,
      email,
      telefone,
      morador,
      dataEntrada,
      dataSaida,
    } = typeMorador.parse(req.body)

    await knex('Moradores').insert({
      id: randomUUID(),
      documento,
      nome,
      email,
      telefone,
      morador,
      dataEntrada,
      dataSaida,
    })
    return res.status(201).send()
  })
}
