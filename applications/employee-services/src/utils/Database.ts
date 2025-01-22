import { createDatabaseConnection } from '@hr-application/database';

class Database {
  private static instance;

  static getInstance = async () => {
    if(!Database.instance) {
      Database.instance = await createDatabaseConnection()
    }
    return Database.instance;
    
  }
}

export default Database;