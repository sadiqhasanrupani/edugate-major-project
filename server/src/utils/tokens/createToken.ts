import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../../common/contracts/jwt/configs/jwt.config";

interface TokenData {
  email?: string;
  id?: string;
  isTeacher?: string;
  isStudent?: string;
}

const createToken = (tokenData: TokenData) => {
  const token = jwt.sign(tokenData, JWT_CONFIG.SECRETS, JWT_CONFIG.SIGN_OPTIONS);
  return token;
};

export default createToken;
