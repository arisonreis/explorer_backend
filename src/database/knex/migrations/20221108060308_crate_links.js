export async function up(Knex) {
 await Knex.schema.createTable("links", (table) => {
    table.increments("id");
    table.text("yrl").notNullable();
    table
      .integer("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE");
    table.timestamp("created_at").default(Knex.fn.now());
  });
}

export function down(Knex) {
  Knex.schema.dropTable("links");
}
