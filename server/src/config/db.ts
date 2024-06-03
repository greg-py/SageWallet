import { Sequelize, Dialect } from "sequelize";
import dotenv from "dotenv";

interface DatabaseParameters {
  dialect: Dialect;
  host: string;
  database: string;
  username: string;
  password: string;
}

export class DatabaseConnection {
  private static instance: Sequelize | null = null;
  private constructor() {}

  public static getInstance({
    dialect,
    host,
    database,
    username,
    password,
  }: DatabaseParameters): Sequelize {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new Sequelize({
        dialect,
        host,
        database,
        username,
        password,
        // dialectOptions: {
        //   ssl: {
        //     require: true,
        //   },
        // },
      });
      console.log("Database connection initialized");
    }
    return DatabaseConnection.instance;
  }

  public static async testConnection() {
    try {
      if (!DatabaseConnection.instance) {
        throw new Error("Database connection has not been initialized");
      }
      await DatabaseConnection.instance.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  public static async closeConnection() {
    if (DatabaseConnection.instance) {
      await DatabaseConnection.instance.close();
      DatabaseConnection.instance = null;
      console.log("Connection closed successfully.");
    }
  }
}

dotenv.config();

const databaseConfig = {
  dialect: process.env.DB_DIALECT as Dialect,
  host: process.env.DB_HOST || "",
  database: process.env.DB_DATABASE || "",
  username: process.env.DB_USERNAME || "",
  password: process.env.DB_PASSWORD || "",
};

export const db = DatabaseConnection.getInstance(databaseConfig);

export const syncTables = async () => {
  await db.sync({ force: true });
  console.log("All models were synchronized successfully.");
};
