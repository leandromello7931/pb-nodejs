
exports.up = function(knex) {
  return knex.schema.createTable('categoriesxitems', function(table){
    table.increments();
    table.integer('id_category').notNullable();
    table.integer('id_item').notNullable();

    table.foreign('id_category').references('categories.id');
    table.foreign('id_item').references('items.id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('categoriesxitems');
};
