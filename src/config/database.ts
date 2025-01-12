import { Sequelize } from "sequelize-typescript";
import Session from "@/models/session";

const sequelize: any = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  dialect: "mysql",
  dialectModule: require("mysql2"),
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  logging: false,
  benchmark: true,
  models: [Session],
});

export default sequelize;
