import User from "../models/user";
import { decrypt } from "./cryptoUtils";

export const getDecryptedUser = async (userId: number) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
  
    return {
      id: user.id,
      firstname: decrypt(user.firstname),
      lastname: decrypt(user.lastname),
      email: decrypt(user.email),
      timezone: user.timezone,
      dateformat: user.dateformat,
      created_at: user.created_at,
    };
  };