import { Schema, model } from 'mongoose';

interface IMessage {
  role: 'user' | 'assistant';
  content: string;
  model: string;
  tokens: {
    input: number;
    output: number;
  };
  createdAt?: Date;
}

interface IChat {
  _id?: string;
  userId: string;
  title: string;
  messages: IMessage[];
  model: string;
  systemPrompt: string;
  context: Record<string, any>;
  isPublic: boolean;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const messageSchema = new Schema<IMessage>({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true,
  },
  content: String,
  model: String,
  tokens: {
    input: { type: Number, default: 0 },
    output: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
});

const chatSchema = new Schema<IChat>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: 'New Chat',
    },
    messages: [messageSchema],
    model: {
      type: String,
      default: 'gpt-4-turbo',
    },
    systemPrompt: String,
    context: Schema.Types.Mixed,
    isPublic: {
      type: Boolean,
      default: false,
    },
    tags: [String],
  },
  { timestamps: true }
);

export const Chat = model<IChat>('Chat', chatSchema);
export type { IChat, IMessage };
