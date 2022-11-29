import sqlite3 from  "sqlite3";
import {open} from "sqlite";
// importando database
// path para ajudar nas pastas para n ter problema em outros sistemas operacionais-
async function sqliteConection() {
  const database = await open({
    filename: "./src/database/database.db", //localização do db
    driver: sqlite3.Database,
    // configurando o driver a ser usado
  });
  return database;
}
export { sqliteConection };