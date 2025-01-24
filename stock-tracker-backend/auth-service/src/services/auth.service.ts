import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { decrypt, encrypt } from '../utils/crypto.utils';

export const registerUser = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  timezone: string,
  dateformat: string
) => {
  // Encrypt sensitive fields
  const encryptedFirstname = encrypt(firstname);
  const encryptedLastname = encrypt(lastname);

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const user = await User.create({
    firstname: encryptedFirstname,
    lastname: encryptedLastname,
    email,
    password: hashedPassword,
    timezone,
    dateformat,
  });
  if (!user) {
    throw new Error('User registration failed');
  }
  user.firstname = firstname;
  user.lastname = lastname;
  user.email = email;
  delete (user as any).password;
  return user;
};

export const loginUser = async (email: string, password: string) => {
    // Encrypt the email for lookup since the email is stored encrypted

    // Find user by encrypted email
    const user = await User.findOne({ where: { id: 3 } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error('Invalid email or password');
    }
  
    // Decrypt the firstname, lastname, and email for the response
    const decryptedFirstname = decrypt(user.firstname);
    const decryptedLastname = decrypt(user.lastname);
  
    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, firstname: decryptedFirstname },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
  
    // Return the token and user details
    return {
      token,
      user: {
        id: user.id,
        firstname: decryptedFirstname,
        lastname: decryptedLastname,
        email: user.email,
        timezone: user.timezone,
        dateformat: user.dateformat,
        createdAt: user.createdAt,
      },
    };
};
