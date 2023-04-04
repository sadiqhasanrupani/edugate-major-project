import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.SQL_DATABASE as string,
  process.env.SQL_USER as string,
  process.env.SQL_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.SQL_HOST,
    port: Number(process.env.SQL_PORT)
  }
);

// const sequelize = new Sequelize(
//   process.env.MAIN_DATABASE as string,
//   process.env.MAIN_USER as string,
//   process.env.MAIN_PASSWORD,
//   {
//     host: process.env.MAIN_HOST,
//     dialect: "mysql",
//     dialectOptions: {
//       ssl: {
//         rejectUnauthorized: true
//       },
//     },
//   }
// );

// const sequelize = new Sequelize(
//   process.env.DEV_DATABASE as string,
//   process.env.DEV_USER as string,
//   process.env.DEV_PASSWORD,
//   {
//     port: Number(process.env.DEV_MYSQL_PORT),
//     host: process.env.DEV_HOST,
//     dialect: "mysql",
//     dialectOptions: {
//       ssl: {
//         rejectUnauthorized: true,
//       },
//     },
//   }
// );

export default sequelize;
