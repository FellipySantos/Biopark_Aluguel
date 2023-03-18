import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Predios', (table) => {
    table.uuid('id').primary()
    table.text('nome').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
  await knex.schema.createTable('Apartamentos', (table) => {
    table.uuid('id').primary()
    table.text('andar').notNullable()
    table.text('tamanho').notNullable()
    table.decimal('valor').notNullable()
    table.text('predioId').references('id').inTable('Predios')
    table.boolean('alugado').notNullable().defaultTo(false)
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
  await knex.schema.createTable('Moradores', (table) => {
    table.uuid('id').primary()
    table.text('documento').notNullable().unique()
    table.text('nome').notNullable()
    table.text('email').notNullable()
    table.text('telefone').notNullable()
    table.boolean('morador').notNullable().defaultTo(true)
    table.timestamp('dataEntrada').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('dataSaida').defaultTo(knex.fn.now()).notNullable()
  })
  await knex.schema.createTable('Aluguel', (table) => {
    table.uuid('id').primary()
    table.text('apartamentoId').references('id').inTable('Apartamentos')
    table.text('moradorId').references('id').inTable('Moradores')
    table.timestamp('alugado_em').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('alugado_ate').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('Moradores')
  await knex.schema.dropTable('Aluguel')
  await knex.schema.dropTable('Apartamentos')
  await knex.schema.dropTable('Predios')
}
