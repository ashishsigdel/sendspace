import { Sequelize } from "sequelize-typescript";
import Session from "@/models/session";

const sequelize: any = new Sequelize({
  host: "localhost",
  username: "root",
  password: "rocket5%",
  database: "sendspace",
  dialect: "mysql",
  dialectModule: require("mysql2"),
  logging: false,
  benchmark: true,
  models: [Session],
});

export default sequelize;
