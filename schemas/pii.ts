import { z } from 'zod';

export const PIITierSchema = z.union([z.literal(1), z.literal(2), z.literal(3)]);
export type PIITier = z.infer<typeof PIITierSchema>;

export const PIIPatternSchema = z.object({
  type: z.string(),
  tier: PIITierSchema,
  regex: z.instanceof(RegExp),
  maskFormat: z.string(),
});
export type PIIPattern = z.infer<typeof PIIPatternSchema>;

export const PIIMatchSchema = z.object({
  type: z.string(),
  tier: PIITierSchema,
  value: z.string(),
  startIndex: z.number(),
  endIndex: z.number(),
  maskReplacement: z.string(),
});
export type PIIMatch = z.infer<typeof PIIMatchSchema>;
