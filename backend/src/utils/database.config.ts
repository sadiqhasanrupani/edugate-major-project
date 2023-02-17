import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  "edugate_db",
  process.env.USER as string,
  process.env.PASSWORD,
  {
    dialect: "mysql",
    host: process.env.HOST,
    port: Number(process.env.MYSQL_PORT),
  }
);

export default sequelize;
