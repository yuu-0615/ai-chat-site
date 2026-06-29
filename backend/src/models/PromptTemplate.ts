import { Schema, model } from 'mongoose';

interface IPromptTemplate {
  _id?: string;
  name: string;
  description: string;
  content: string;
  category: string;
  variables: string[];
  tags: string[];
  author: string;
  isPublic: boolean;
  usage: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const promptTemplateSchema = new Schema<IPromptTemplate>(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    variables: [String],
    tags: [String],
    author: String,
    isPublic: {
      type: Boolean,
      default: false,
    },
    usage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const PromptTemplate = model<IPromptTemplate>('PromptTemplate', promptTemplateSchema);
export type { IPromptTemplate };
