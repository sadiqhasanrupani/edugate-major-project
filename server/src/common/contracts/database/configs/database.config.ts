import { Options } from "sequelize";
import { config } from "../../../../config/config";


export const DATABASE_CONFIG = {
  dialect: config.get('SQL_DIALECT') as Options['dialect'],
  database: config.get('SQL_DATABASE'),
  port: config.getNumber('SQL_PORT'),
  password: config.get('SQL_PASSWORD'),
  user: config.get('SQL_USER'),
  host: config.get('SQL_HOST'),

  get CREATE_POOL() {
    return {
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
      port: this.port,
    };
  },

  get SEQUELIZE_CONFIG(): Options {
    return {
      dialect: this.dialect || 'mysql',
      host: this.CREATE_POOL.host,
      port: this.CREATE_POOL.port,
      logging: config.getBoolean('SQL_LOGGING'),
    };
  },
} as const;