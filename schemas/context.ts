import { z } from 'zod';

export const PageContextSchema = z.enum(['professional', 'casual', 'technical', 'neutral']);
export type PageContext = z.infer<typeof PageContextSchema>;

export const ContextOverrideSchema = z.object({
  domain: z.string(),
  overrideContext: PageContextSchema,
  autoDetect: z.boolean(),
});
export type ContextOverride = z.infer<typeof ContextOverrideSchema>;
