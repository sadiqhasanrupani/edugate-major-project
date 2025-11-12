import { config } from "../../../../config/config";
import { SignOptions, VerifyOptions } from "jsonwebtoken";

export const JWT_CONFIG = {
  get SECRETS() {
    return config.get("JWT_SECRETS");
  },

  get SIGN_OPTIONS(): SignOptions {
    return {
      audience: config.get("JWT_AUDIENCE"),
      issuer: config.get("JWT_ISSUER"),
      expiresIn: config.getNumber("JWT_EXPIRES_IN"),
    };
  },

  get VERIFY_OPTIONS(): VerifyOptions {
    return {
      audience: config.get("JWT_AUDIENCE"),
      issuer: config.get("JWT_ISSUER"),
    };
  },
} as const;