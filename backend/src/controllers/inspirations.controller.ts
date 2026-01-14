import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { Design } from '../entities/Design.entity';
import { User } from '../entities/User.entity';
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

    const designRepository = AppDataSource.getRepository(Design);
    
    const [designs, total] = await designRepository.findAndCount({
      relations: ['designer'],
      order: { createdAt: 'DESC' },
      skip,
      take: limit
    });

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

    const designRepository = AppDataSource.getRepository(Design);
    const queryBuilder = designRepository
      .createQueryBuilder('design')
      .leftJoinAndSelect('design.designer', 'designer');

    // Text search
    if (q) {
      const searchTerm = `%${q}%`;
      queryBuilder.where(
        '(design.title ILIKE :searchTerm OR design.description ILIKE :searchTerm OR :searchTag = ANY(design.tags))',
        { searchTerm, searchTag: (q as string).toLowerCase() }
      );
    }

    // Tag filter
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      queryBuilder.andWhere('design.tags && :tags', { tags: tagArray });
    }

    // Tools filter
    if (tools) {
      queryBuilder.andWhere('design.tools ILIKE :tools', { tools: `%${tools}%` });
    }

    queryBuilder
      .orderBy('design.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    const [designs, total] = await queryBuilder.getManyAndCount();

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

    const designRepository = AppDataSource.getRepository(Design);
    const userRepository = AppDataSource.getRepository(User);
    
    const design = await designRepository.findOne({
      where: { id: designId },
      relations: ['likedBy']
    });

    if (!design) {
      const error = new Error('Design not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      const error = new Error('User not found') as AppError;
      error.statusCode = 404;
      throw error;
    }

    const isLiked = design.likedBy.some(u => u.id === userId);
    
    if (isLiked) {
      // Unlike - remove user from likedBy array
      design.likedBy = design.likedBy.filter(u => u.id !== userId);
      design.likes = Math.max(0, design.likes - 1);
    } else {
      // Like - add user to likedBy array
      design.likedBy.push(user);
      design.likes += 1;
    }

    await designRepository.save(design);

    res.status(200).json({
      success: true,
      data: {
        design,
        isLiked: !isLiked
      }
    });
  } catch (error) {
    next(error);
  }
};

