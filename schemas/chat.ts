import { z } from 'zod';

import { LLMProviderSchema } from '@/schemas/provider';

export const ChatRoleSchema = z.enum(['user', 'assistant']);
export type ChatRole = z.infer<typeof ChatRoleSchema>;

export const ChatMessageSchema = z.object({
  role: ChatRoleSchema,
  content: z.string(),
  timestamp: z.number().optional(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const StreamChunkSchema = z.object({
  token: z.string(),
  ttft: z.number().optional(),
  isComplete: z.boolean(),
});
export type StreamChunk = z.infer<typeof StreamChunkSchema>;

export const APIErrorKindSchema = z.enum([
  'invalid_api_key',
  'rate_limited',
  'server_error',
  'timeout',
  'unknown',
]);
export type APIErrorKind = z.infer<typeof APIErrorKindSchema>;

export const APIErrorSchema = z.object({
  kind: APIErrorKindSchema,
  statusCode: z.number().optional(),
  message: z.string(),
  provider: LLMProviderSchema.optional(),
  originalText: z.string().optional(),
});
export type APIError = z.infer<typeof APIErrorSchema>;
