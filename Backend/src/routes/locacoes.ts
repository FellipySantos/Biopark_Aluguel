import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'

export async function locacoesRoutes(app: FastifyInstance) {
  app.get('/:apartamentoId', async (req) => {
    const typeLocacao = z.object({
      apartamentoId: z.string(),
    })

    const { apartamentoId } = typeLocacao.parse(req.params)

    const idMorador = knex('Aluguel')
      .select('moradorId')
      .where('apartamentoId', apartamentoId)
      .first()
    const morador = knex('Moradores').where('id', idMorador)

    return morador
  })
  app.get('/', async () => {
    return knex.select('*').from('Aluguel')
  })
  app.post('/', async (req, res) => {
    const typeLocacao = z.object({
      apartamentoId: z.string(),
      moradorId: z.string(),
      alugadoEm: z.string().datetime({
        message: 'Expected date, received string',
      }),
      alugadoAte: z.string().datetime({
        message: 'Expected date, received string',
      }),
    })

    const { apartamentoId, moradorId, alugadoEm, alugadoAte } =
      typeLocacao.parse(req.body)
    await knex('Apartamentos')
      .where('id', apartamentoId)
      .update({ alugado: true })

    await knex('Aluguel').insert({
      id: randomUUID(),
      apartamentoId,
      moradorId,
      alugado_em: alugadoEm,
      alugado_ate: alugadoAte,
    })

    return res.status(201).send()
  })

  app.post('/Desocupar', async (req, res) => {
    const typeLocacao = z.object({
      apartamentoId: z.string(),
      moradorId: z.string(),
    })

    const { apartamentoId, moradorId } = typeLocacao.parse(req.body)
    await knex('Moradores')
      .where('id', moradorId)
      .update({ morador: false, dataSaida: Date.now() })

    await knex('Apartamentos')
      .where('id', apartamentoId)
      .update({ alugado: false })

    await knex('Aluguel')
      .where('apatamentoId', apartamentoId)
      .update({ alugado_ate: Date.now() })

    return res.status(201).send()
  })
}
