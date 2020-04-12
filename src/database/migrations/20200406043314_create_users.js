
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('name').notNullable();
    table.string('login').notNullable();
    table.string('password').notNullable();
    table.boolean('active').notNullable();
    table.timestamp('created_at', {useTz: false})
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    
    table.timestamp('updated_at', {useTz: false})
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    
    
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
