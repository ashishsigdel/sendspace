import { Sequelize } from "sequelize-typescript";
import Session from "@/models/session";

const sequelize: any = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: "mysql",
  dialectModule: require("mysql2"),
  logging: false,
  benchmark: true,
  models: [Session],
});

export default sequelize;
