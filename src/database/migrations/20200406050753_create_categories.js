
exports.up = function(knex) {
  return knex.schema.createTable('categories', function(table){
    table.increments();
    table.string('name').notNullable();
    table.boolean('active').notNullable();
    table.string('image', 2000).notNullable();
    table.timestamp('created_at', {useTz: false})
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    
    table.timestamp('updated_at', {useTz: false})
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    
  })

};

exports.down = function(knex) {
  return knex.schema.dropTable('categories');
};
