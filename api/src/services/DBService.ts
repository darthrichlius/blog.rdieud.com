import { Sequelize } from "sequelize";

export class SQLiteDBService {
  static init(pathToDb: string) {
    const connection = new Sequelize({
      dialect: "sqlite",
      storage: pathToDb, // Path to the file that will store the SQLite DB.
    });

    return connection;
  }
}
