import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface TokenData {
  email?: string;
  id?: string;
  isTeacher?: string;
  isStudent?: string;
}

const createToken = (tokenData: TokenData) => {
  const token = jwt.sign(
    {
      email: tokenData.email,
      id: tokenData.id,
      isTeacher: tokenData.isTeacher,
      isStudent: tokenData.isStudent,
    },
    process.env.SECRET_TOKEN as string,
    {
      expiresIn: "10000h",
    }
  );
  return token;
};

export default createToken;
