import { Response, NextFunction } from 'express';
import Design from '../models/Design.model';
import User from '../models/User.model';
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

    // Get user name for designerName
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    const design = await Design.create({
      title,
      description,
      image,
      tags: Array.isArray(tags) ? tags : [],
      tools,
      designer: userId,
      designerName: user.name
    });

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
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const designs = await Design.find()
      .populate('designer', 'name avatar')
      .sort({ createdAt: -1 });

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
    const design = await Design.findById(req.params.id)
      .populate('designer', 'name avatar bio');

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

    const design = await Design.findById(designId);
    if (!design) {
      const error = new Error('Design not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    // Check if user owns the design or is admin
    if (design.designer.toString() !== userId && req.user?.role !== 'admin') {
      const error = new Error('Not authorized to update this design') as AppError;
      error.statusCode = 403;
      throw error;
    }

    design.title = title || design.title;
    design.description = description || design.description;
    design.image = image || design.image;
    design.tags = Array.isArray(tags) ? tags : design.tags;
    design.tools = tools || design.tools;

    await design.save();

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

    const design = await Design.findById(designId);
    if (!design) {
      const error = new Error('Design not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    // Check if user owns the design or is admin
    if (design.designer.toString() !== userId && req.user?.role !== 'admin') {
      const error = new Error('Not authorized to delete this design') as AppError;
      error.statusCode = 403;
      throw error;
    }

    await Design.findByIdAndDelete(designId);

    res.status(200).json({
      success: true,
      message: 'Design deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

