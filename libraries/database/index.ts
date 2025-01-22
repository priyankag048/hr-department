import Pool from 'pg-pool';
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path';
import { Umzug } from 'umzug';
import config from './config.ts';


export const createDatabaseConnection = async () => {
  const pool = new Pool(config);
  try{
    return await pool.connect();
  } catch(error) {
    console.log('Connection failed: ', error);
    await pool.end()
  }
}


const execute = async () => {
  try{
    const client = await createDatabaseConnection();
    const umzug = new Umzug({
      migrations: {
        glob: 'migrations/*-up.sql',
        resolve: ({name, path = ''})=>({
          name,
          up: async ()=>{
            const sql = await readFile(resolve(path), {encoding: 'utf-8'});
            return client?.query(sql)
          },
          down: async ()=> {}
        })
      },
      logger: console
    });
  
    umzug.up();
    client?.release();
    // TODO: check why not able to exit by its own ??
    // process.exit();
  } catch(error){
    console.error(error)
  }
}

execute();