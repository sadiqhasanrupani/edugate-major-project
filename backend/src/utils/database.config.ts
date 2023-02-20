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
//   process.env.DATABASE as string,
//   process.env.USER as string,
//   process.env.PASSWORD,
//   {
//     host: process.env.HOST,
//     dialect: "mysql",
//     dialectOptions: {
//       ssl: {
//         rejectUnauthorized: true
//       },
//     },
//   }
// );

export default sequelize;
