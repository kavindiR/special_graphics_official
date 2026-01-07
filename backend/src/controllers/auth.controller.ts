import { Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.model';
import { AuthRequest, AppError } from '../middleware/auth';

// Generate JWT Token
const generateToken = (id: string, email: string, role: string): string => {
  return jwt.sign(
    { id, email, role },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Register new user
export const register = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed') as AppError;
      error.statusCode = 400;
      throw error;
    }

    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('User already exists') as AppError;
      error.statusCode = 400;
      throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    // Generate token
    const token = generateToken(user._id.toString(), user.email, user.role);

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// Login user
export const login = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed') as AppError;
      error.statusCode = 400;
      throw error;
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      const error = new Error('Invalid credentials') as AppError;
      error.statusCode = 401;
      throw error;
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error('Invalid credentials') as AppError;
      error.statusCode = 401;
      throw error;
    }

    // Generate token
    const token = generateToken(user._id.toString(), user.email, user.role);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          bio: user.bio
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get current user
export const getCurrentUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id);
    if (!user) {
      const error = new Error('User not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

// Update profile
export const updateProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, bio, avatar } = req.body;
    const userId = req.user?.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, bio, avatar },
      { new: true, runValidators: true }
    );

    if (!user) {
      const error = new Error('User not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

