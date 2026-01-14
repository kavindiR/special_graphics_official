import { Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User.entity';
import { AuthRequest, AppError } from '../middleware/auth';

// Get all users
export const getAllUsers = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find({
      select: ['id', 'name', 'email', 'role', 'avatar', 'bio', 'isVerified', 'createdAt', 'updatedAt'],
      order: { createdAt: 'DESC' }
    });

    res.status(200).json({
      success: true,
      data: { users }
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID
export const getUserById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: req.params.id },
      select: ['id', 'name', 'email', 'role', 'avatar', 'bio', 'isVerified', 'createdAt', 'updatedAt']
    });

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

// Update user
export const updateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, bio, avatar, role } = req.body;
    const userId = req.params.id;
    const currentUserId = req.user?.id;

    // Only allow users to update their own profile, or admins to update anyone
    if (userId !== currentUserId && req.user?.role !== 'admin') {
      const error = new Error('Not authorized') as AppError;
      error.statusCode = 403;
      throw error;
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      const error = new Error('User not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (avatar) user.avatar = avatar;
    if (role && req.user?.role === 'admin') user.role = role as any;

    await userRepository.save(user);

    // Remove password from response
    const { password, ...userResponse } = user;

    res.status(200).json({
      success: true,
      data: { user: userResponse }
    });
  } catch (error) {
    next(error);
  }
};

// Delete user
export const deleteUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.params.id;
    const currentUserId = req.user?.id;

    // Only allow users to delete their own account, or admins to delete anyone
    if (userId !== currentUserId && req.user?.role !== 'admin') {
      const error = new Error('Not authorized') as AppError;
      error.statusCode = 403;
      throw error;
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      const error = new Error('User not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    await userRepository.remove(user);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
