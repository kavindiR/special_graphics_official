import mongoose, { Schema, Document } from 'mongoose';

export interface IDesign extends Document {
  title: string;
  designer: mongoose.Types.ObjectId;
  designerName: string;
  description: string;
  image: string;
  tags: string[];
  tools: string;
  likes: number;
  likedBy: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const DesignSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    designer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    designerName: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    image: {
      type: String,
      required: [true, 'Image URL is required']
    },
    tags: [{
      type: String,
      trim: true
    }],
    tools: {
      type: String,
      required: true,
      trim: true
    },
    likes: {
      type: Number,
      default: 0
    },
    likedBy: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true
  }
);

// Index for search functionality
DesignSchema.index({ title: 'text', description: 'text', tags: 'text' });

export default mongoose.model<IDesign>('Design', DesignSchema);

