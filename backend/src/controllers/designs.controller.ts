import { Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { Design } from '../entities/Design.entity';
import { User } from '../entities/User.entity';
import { AuthRequest, AppError } from '../middleware/auth';

// Create new design
export const createDesign = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, image, tags, tools } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      const error = new Error('Authentication required') as AppError;
      error.statusCode = 401;
      throw error;
    }

    const userRepository = AppDataSource.getRepository(User);
    const designRepository = AppDataSource.getRepository(Design);

    // Get user name for designerName
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      const error = new Error('User not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    const design = designRepository.create({
      title,
      description,
      image,
      tags: Array.isArray(tags) ? tags : [],
      tools,
      designerId: userId,
      designerName: user.name
    });

    await designRepository.save(design);

    res.status(201).json({
      success: true,
      data: { design }
    });
  } catch (error) {
    next(error);
  }
};

// Get all designs
export const getAllDesigns = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const designRepository = AppDataSource.getRepository(Design);
    const designs = await designRepository.find({
      relations: ['designer'],
      order: { createdAt: 'DESC' }
    });

    res.status(200).json({
      success: true,
      data: { designs }
    });
  } catch (error) {
    next(error);
  }
};

// Get design by ID
export const getDesignById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const designRepository = AppDataSource.getRepository(Design);
    const design = await designRepository.findOne({
      where: { id: req.params.id },
      relations: ['designer']
    });

    if (!design) {
      const error = new Error('Design not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: { design }
    });
  } catch (error) {
    next(error);
  }
};

// Update design
export const updateDesign = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, image, tags, tools } = req.body;
    const userId = req.user?.id;
    const designId = req.params.id;

    const designRepository = AppDataSource.getRepository(Design);
    const design = await designRepository.findOne({
      where: { id: designId },
      relations: ['designer']
    });

    if (!design) {
      const error = new Error('Design not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    // Check if user owns the design or is admin
    if (design.designerId !== userId && req.user?.role !== 'admin') {
      const error = new Error('Not authorized to update this design') as AppError;
      error.statusCode = 403;
      throw error;
    }

    if (title) design.title = title;
    if (description) design.description = description;
    if (image) design.image = image;
    if (Array.isArray(tags)) design.tags = tags;
    if (tools) design.tools = tools;

    await designRepository.save(design);

    res.status(200).json({
      success: true,
      data: { design }
    });
  } catch (error) {
    next(error);
  }
};

// Delete design
export const deleteDesign = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const designId = req.params.id;

    const designRepository = AppDataSource.getRepository(Design);
    const design = await designRepository.findOne({ where: { id: designId } });

    if (!design) {
      const error = new Error('Design not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    // Check if user owns the design or is admin
    if (design.designerId !== userId && req.user?.role !== 'admin') {
      const error = new Error('Not authorized to delete this design') as AppError;
      error.statusCode = 403;
      throw error;
    }

    await designRepository.remove(design);

    res.status(200).json({
      success: true,
      message: 'Design deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
