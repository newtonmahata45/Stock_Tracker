import express from 'express';
import { authenticateJWT, authorization } from '../middlewares/authMiddleware';
import { getUserProfile, updateProfile } from '../controllers/user.controller';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = express.Router();

// Protected route: Requires a valid JWT token
router.get('/profile', authenticateJWT, authorization, getUserProfile);
router.put('/profile', authenticateJWT, authorization, updateProfile);

export default router;
