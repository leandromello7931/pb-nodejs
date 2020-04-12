
exports.up = function(knex) {
  return knex.schema.createTable('items', function(table){
    table.increments();
    table.string('name').notNullable();
    table.string('description');
    table.string('image', 2000).notNullable();
    table.float('price', 10, 2).notNullable();
    table.boolean('active').notNullable();
    table.timestamp('created_at', {useTz: false})
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    
    table.timestamp('updated_at', {useTz: false})
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('items');
};
