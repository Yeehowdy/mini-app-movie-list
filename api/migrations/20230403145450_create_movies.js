/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('movies', table => {
    table.increments('id')
    table.string('title').notNullable();
    table.boolean('watched').defaultTo(false)
    table.boolean('watchList').defaultTo(false)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('movies');
};
