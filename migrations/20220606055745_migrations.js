/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Navgurukul',(table)=>{
        table.increments('id');
        table.string('name');
        table.string('email').unique();
        table.string('state');
        table.string('current_topic');
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Navgurukul_details')
  
};
