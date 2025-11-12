import { Sequelize } from "sequelize";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import { DATABASE_CONFIG } from "../common/contracts/database/configs/database.config";

const sequelize = new Sequelize(
  DATABASE_CONFIG.database,
  DATABASE_CONFIG.user,
  DATABASE_CONFIG.password,
  DATABASE_CONFIG.SEQUELIZE_CONFIG
);

const poolConnection = mysql.createPool(DATABASE_CONFIG.CREATE_POOL);

export const db = drizzle({ client: poolConnection });
export default sequelize;
