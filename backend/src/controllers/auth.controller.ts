import { Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User.entity';
import { AuthRequest, AppError } from '../middleware/auth';

// Generate JWT Token
const generateToken = (id: string, email: string, role: string): string => {
  const secret = process.env.JWT_SECRET || 'fallback-secret';
  if (!secret || typeof secret !== 'string') {
    throw new Error('JWT_SECRET is not configured');
  }
  const expiresIn = process.env.JWT_EXPIRE || '7d';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return jwt.sign(
    { id, email, role },
    secret,
    { expiresIn: expiresIn as any }
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

    const userRepository = AppDataSource.getRepository(User);

    // Check if user already exists
    const existingUser = await userRepository.findOne({ where: { email: email.toLowerCase() } });
    if (existingUser) {
      const error = new Error('User already exists') as AppError;
      error.statusCode = 400;
      throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = userRepository.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: (role || 'user') as any
    });

    await userRepository.save(user);

    // Generate token
    const token = generateToken(user.id, user.email, user.role);

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
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

    const userRepository = AppDataSource.getRepository(User);

    // Find user with password
    const user = await userRepository.findOne({
      where: { email: email.toLowerCase() },
      select: ['id', 'email', 'password', 'name', 'role', 'avatar', 'bio']
    });

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
    const token = generateToken(user.id, user.email, user.role);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
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
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: req.user?.id } });
    
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

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      const error = new Error('User not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;

    await userRepository.save(user);

    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

