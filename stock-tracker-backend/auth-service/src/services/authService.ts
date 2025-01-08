import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { decrypt, encrypt } from '../utils/cryptoUtils';

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
  const encryptedEmail = encrypt(email);

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const user = await User.create({
    firstname: encryptedFirstname,
    lastname: encryptedLastname,
    email: encryptedEmail,
    password: hashedPassword,
    timezone,
    dateformat,
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
    // Encrypt the email for lookup since the email is stored encrypted
    const encryptedEmail = encrypt(email);
  
    // Find user by encrypted email
    const user = await User.findOne({ where: { email: encryptedEmail } });
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
    const decryptedEmail = decrypt(user.email);
  
    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: decryptedEmail, firstname: decryptedFirstname },
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
        email: decryptedEmail,
        timezone: user.timezone,
        dateformat: user.dateformat,
        created_at: user.created_at,
      },
    };
};
