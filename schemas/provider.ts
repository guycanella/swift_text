import { z } from 'zod';

export const LLMProviderSchema = z.enum(['anthropic', 'openai', 'google', 'kimi']);
export type LLMProvider = z.infer<typeof LLMProviderSchema>;

export const ModelInfoSchema = z.object({
  id: z.string(),
  provider: LLMProviderSchema,
  label: z.string(),
});
export type ModelInfo = z.infer<typeof ModelInfoSchema>;

export const ProviderConfigSchema = z.object({
  provider: LLMProviderSchema,
  apiKey: z.string(),
  defaultModelId: z.string().optional(),
});
export type ProviderConfig = z.infer<typeof ProviderConfigSchema>;
