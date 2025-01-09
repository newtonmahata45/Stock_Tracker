import { Sequelize } from 'sequelize';
import envConfig from "./env.config"

// Connect to the database
const sequelize = new Sequelize(
  envConfig.DB_NAME!,
  envConfig.DB_USER!,
  envConfig.DB_PASSWORD!,
  {
    host: envConfig.DB_HOST!,
    port: Number(envConfig.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false,
});

export default sequelize;
