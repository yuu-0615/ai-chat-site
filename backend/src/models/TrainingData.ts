import { Schema, model } from 'mongoose';

interface ITrainingData {
  _id?: string;
  adminId: string;
  name: string;
  description: string;
  fileUrl: string;
  fileSize: number;
  dataType: 'prompt' | 'dataset' | 'feedback';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  result?: Record<string, any>;
  error?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const trainingDataSchema = new Schema<ITrainingData>(
  {
    adminId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    fileUrl: String,
    fileSize: Number,
    dataType: {
      type: String,
      enum: ['prompt', 'dataset', 'feedback'],
      default: 'dataset',
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    result: Schema.Types.Mixed,
    error: String,
  },
  { timestamps: true }
);

export const TrainingData = model<ITrainingData>('TrainingData', trainingDataSchema);
export type { ITrainingData };
