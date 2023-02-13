import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.USERNAME);


const sequelize = new Sequelize(
  "edugate_db",
  "root",
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    port: Number(process.env.MYSQL_PORT),
  }
);

export default sequelize;
