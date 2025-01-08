import express from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { getUserProfile } from '../controllers/userController';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = express.Router();

// Protected route: Requires a valid JWT token
router.get('/profile', asyncHandler(authenticateJWT) , asyncHandler(getUserProfile));

export default router;
