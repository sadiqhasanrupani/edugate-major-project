import { config } from "../../../../config/config";

export const SERVER_CONFIG = {
  PORT: config.get('PORT', 8082),
  HOST: config.get('HOST'),
  PROTOCOL: config.get('PROTOCOL', 'http'),
  ORIGIN: config.get('ORIGIN'),
  get HOST_SITE() {
    return `${this.PROTOCOL}://${this.HOST}:${this.PORT}`;
  }
} as const;