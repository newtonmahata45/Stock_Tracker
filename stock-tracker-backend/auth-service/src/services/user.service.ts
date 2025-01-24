import User from "../models/user.model";
import { decrypt } from "../utils/crypto.utils";


export const getDecryptedUser = async (userId: number) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) return null;
  
    return {
      id: user.id,
      firstname: decrypt(user.firstname),
      lastname: decrypt(user.lastname),
      email: user.email,
      timezone: user.timezone,
      dateformat: user.dateformat,
      createdAt: user.createdAt,
    };

  } catch (error: any) {
    throw new Error(error.message);
  }
  };