import { Request, Response, NextFunction } from 'express';
import Design from '../models/Design.model';
import { AppError } from '../middleware/errorHandler';

// Get all inspirations (designs)
export const getAllInspirations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const designs = await Design.find()
      .populate('designer', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Design.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        designs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get inspiration by ID
export const getInspirationById = async (
  req: Request,
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

// Search inspirations
export const searchInspirations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { q, tags, tools } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    let query: any = {};

    // Text search
    if (q) {
      query.$or = [
        { title: { $regex: q as string, $options: 'i' } },
        { description: { $regex: q as string, $options: 'i' } },
        { tags: { $in: [(q as string).toLowerCase()] } }
      ];
    }

    // Tag filter
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      query.tags = { $in: tagArray };
    }

    // Tools filter
    if (tools) {
      query.tools = { $regex: tools as string, $options: 'i' };
    }

    const designs = await Design.find(query)
      .populate('designer', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Design.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        designs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Toggle like on inspiration
export const toggleLike = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const designId = req.params.id;
    const userId = (req as any).user?.id;

    if (!userId) {
      const error = new Error('Authentication required') as AppError;
      error.statusCode = 401;
      throw error;
    }

    const design = await Design.findById(designId);
    if (!design) {
      const error = new Error('Design not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    const likedIndex = design.likedBy.indexOf(userId);
    if (likedIndex > -1) {
      // Unlike
      design.likedBy.splice(likedIndex, 1);
      design.likes = Math.max(0, design.likes - 1);
    } else {
      // Like
      design.likedBy.push(userId);
      design.likes += 1;
    }

    await design.save();

    res.status(200).json({
      success: true,
      data: {
        design,
        isLiked: likedIndex === -1
      }
    });
  } catch (error) {
    next(error);
  }
};

