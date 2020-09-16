import Knex from "knex";

export async function up(knex: Knex) {
  // up: cria a tabela
  return knex.schema.createTable("point_items", (table) => {
    table.increments("id").primary();
    table.integer("point_id").notNullable().references("in").inTable("points");
    table.integer("item_id").notNullable().references("in").inTable("items");
  });
}

export async function down(knex: Knex) {
  // down: deleta a tabela
  return knex.schema.dropTable("point_items");
}
