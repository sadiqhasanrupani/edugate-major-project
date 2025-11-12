import { config } from "../../../../config/config";

export const EMAIL_CONFIG = {
  get CREATE_TRANSPORTER() {
    return {
      service: config.get('SERVICE'),
      auth: {
        user: config.get('EMAIL'),
        pass: config.get('PASS'),
      },
    }
  },
  ORGANIZATION_NAME: config.get('ORGANIZATION_NAME'),
  EMAIL: config.get('EMAIL'),
  PASS: config.get('PASS'),
  SERVICE: config.get('SERVICE'),
} as const;