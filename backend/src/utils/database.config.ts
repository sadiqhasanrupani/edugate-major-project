import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// const sequelize = new Sequelize(
//   "edugate_db",
//   process.env.USER as string,
//   process.env.PASSWORD,
//   {
//     dialect: "mysql",
//     host: process.env.HOST,
//   }
// );

const sequelize = new Sequelize(
  process.env.DATABASE as string,
  process.env.USER as string,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
      },
    },
  }
);

export default sequelize;
