import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { logger } from '../utils/logger.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIResponse {
  content: string;
  tokens: { input: number; output: number };
}

export const getAIResponse = async (
  options: {
    messages: Message[];
    model: string;
    systemPrompt?: string;
  }
): Promise<AIResponse> => {
  try {
    const { messages, model, systemPrompt } = options;

    if (model.startsWith('gpt')) {
      return await getOpenAIResponse(messages, model, systemPrompt);
    } else if (model.startsWith('claude')) {
      return await getAnthropicResponse(messages, model, systemPrompt);
    } else {
      throw new Error(`Unsupported model: ${model}`);
    }
  } catch (error) {
    logger.error('AI response error:', error);
    throw error;
  }
};

const getOpenAIResponse = async (
  messages: Message[],
  model: string,
  systemPrompt?: string
): Promise<AIResponse> => {
  const systemMessages: Message[] = systemPrompt
    ? [{ role: 'user', content: systemPrompt }]
    : [];

  const response = await openai.chat.completions.create({
    model,
    messages: [...systemMessages, ...messages] as any,
    temperature: 0.7,
    max_tokens: 2000,
  });

  return {
    content: response.choices[0]?.message?.content || 'No response',
    tokens: {
      input: response.usage?.prompt_tokens || 0,
      output: response.usage?.completion_tokens || 0,
    },
  };
};

const getAnthropicResponse = async (
  messages: Message[],
  model: string,
  systemPrompt?: string
): Promise<AIResponse> => {
  const response = await anthropic.messages.create({
    model,
    max_tokens: 2000,
    system: systemPrompt,
    messages: messages as any,
  });

  return {
    content:
      response.content[0].type === 'text' ? response.content[0].text : 'No response',
    tokens: {
      input: response.usage?.input_tokens || 0,
      output: response.usage?.output_tokens || 0,
    },
  };
};
