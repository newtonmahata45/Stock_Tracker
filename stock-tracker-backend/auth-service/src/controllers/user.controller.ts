import { Request, Response } from 'express';
import { getDecryptedUser } from '../services/user.service';



export const getUserProfile = async (req: Request, res: Response) : Promise<any> => {
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
