export async function up(Knex) {
   await Knex.schema.createTable("tags", (table) => {
      table.increments("id");
      table.text("name").notNullable();
      table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
      table.integer("user_id").references("id").inTable("users");
    });
  }
  
  export function down(Knex) {
    Knex.schema.dropTable("tags");
  }
  