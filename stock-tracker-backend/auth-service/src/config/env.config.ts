import dotenv from "dotenv";
dotenv.config();

// Load environment variables from.env file
export default {
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_PASSWORD: process.env.DB_PASSWORD,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
    SMTP_HOST: process.env.SMTP_HOST,
}