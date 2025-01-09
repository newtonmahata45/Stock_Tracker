import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/authService';

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { firstname, lastname, email, password, timezone, dateformat } = req.body;

    if (!firstname || !lastname || !email || !password || !timezone || !dateformat) {
      return res.status(400).json({ status: false, message: 'All fields are required' });
    }

    const user = await registerUser(firstname, lastname, email, password, timezone, dateformat);

    return res.status(201).json({ status: true, message: 'User registered successfully', user });
  } catch (error: any) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const { token, user } = await loginUser(email, password);

    return res.status(200).json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
};
