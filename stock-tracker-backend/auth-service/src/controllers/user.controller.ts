import { Request, Response } from 'express';
import { getDecryptedUser, updateUserProfile } from '../services/user.service';


const getUserProfile = async (req: Request, res: Response) : Promise<any> => {
  try {
    const userId = Number(req.query.user_id); // JWT payload contains user ID

    const user = await getDecryptedUser(userId);
    if (!user) {
      return res.status(404).json({ status:false, message: 'User not found' });
    }

    return res.status(200).json({ status: true, user });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const updateProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user.id; // Extracted from JWT middleware
    const updates = req.body;

    await updateUserProfile(userId, updates);
    return res.status(200).json({ status: true, message: 'Profile updated successfully' });
  } catch (error:any) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export {
  getUserProfile,
  updateProfile,
}