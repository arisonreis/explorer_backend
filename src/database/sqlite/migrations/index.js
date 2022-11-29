import { sqliteConection } from '../../sqlite/index.js';
import {CreateUsers} from '../migrations/createUsers.js'
const migrationsRunning  =  async ()=>{
    const schemas = [
        CreateUsers,
    ].join('');
  await sqliteConection().then(db=> db.exec(schemas))
  .catch(Err=>{return Err})
}
export {migrationsRunning}