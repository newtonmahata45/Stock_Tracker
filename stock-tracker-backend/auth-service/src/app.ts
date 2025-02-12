import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import sequelize from './config/database';
import userRoutes from './routes/user.route';

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
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

// Database connection
sequelize.sync()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection failed:', err));

export default app;
