import { Request, Response } from 'express';
import { getDecryptedUser } from '../utils/helper.util';


export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id; // JWT payload contains user ID
    const user = await getDecryptedUser(userId);

    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
