import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  port: process.env.PORT,
  cors: process.env.CORS,
  mongo_uri: process.env.MONGO_URI,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires: process.env.JWT_EXPIRES,
};
