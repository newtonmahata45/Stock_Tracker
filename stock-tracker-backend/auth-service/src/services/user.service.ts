import User from "../models/user.model";
import { decrypt, encrypt } from "../utils/crypto.utils";


const getDecryptedUser = async (userId: number) => {
  try {
    const user = await User.findByPk(userId,{
      attributes: ['id', 'firstname', 'lastname', 'email', 'timezone', 'dateformat', 'createdAt'],
    });
    if (!user) return null;
  
    user.firstname = decrypt(user.firstname);
    user.lastname = decrypt(user.lastname);
    return user;

  } catch (error: any) {
    throw new Error(error.message);
  }
};

const updateUserProfile = async (userId: string, updates: any) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Update only allowed fields
  if (updates.firstname) user.firstname = encrypt(updates.firstname);
  if (updates.lastname) user.lastname = encrypt(updates.lastname);
  if (updates.timezone) user.timezone = updates.timezone;
  if (updates.dateformat) user.dateformat = updates.dateformat;

  let updated_user = await user.save();

  return {
    message: 'Profile updated successfully',
    user_id: user.id,
    updated_user
  };
};

export {
  getDecryptedUser,
  updateUserProfile,
};