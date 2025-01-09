import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import sequelize from './config/database';

const app = express();


declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Database connection
sequelize.sync()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection failed:', err));

export default app;
