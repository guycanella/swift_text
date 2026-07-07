import { z } from 'zod';

import { LLMProviderSchema } from '@/schemas/provider';

export const ThemeSchema = z.enum(['light', 'dark', 'system']);
export type Theme = z.infer<typeof ThemeSchema>;

export const PiiRegionSchema = z.enum(['pt-BR', 'en-US', 'en-GB', 'de-DE', 'fr-FR']);
export type PiiRegion = z.infer<typeof PiiRegionSchema>;

export const PiiScanningModeSchema = z.enum(['always-mask', 'always-ask', 'never-scan']);
export type PiiScanningMode = z.infer<typeof PiiScanningModeSchema>;

export const KeyboardShortcutsSchema = z.object({
  toggleWidget: z.string(),
});
export type KeyboardShortcuts = z.infer<typeof KeyboardShortcutsSchema>;

export const UserSettingsSchema = z.object({
  theme: ThemeSchema,
  defaultProvider: LLMProviderSchema,
  defaultModelId: z.string(),
  shortcuts: KeyboardShortcutsSchema,
  piiRegion: PiiRegionSchema.optional(),
  piiScanning: PiiScanningModeSchema,
});
export type UserSettings = z.infer<typeof UserSettingsSchema>;

export const APIKeyStoreShapeSchema = z.partialRecord(LLMProviderSchema, z.string().min(1));
export type APIKeyStoreShape = z.infer<typeof APIKeyStoreShapeSchema>;

export const APIKeyStoreSchema = APIKeyStoreShapeSchema.refine(
  (store) => Object.keys(store).length > 0,
  { message: 'At least one API key is required' },
);
export type APIKeyStore = z.infer<typeof APIKeyStoreSchema>;

export const WidgetPositionSchema = z.object({
  x: z.number(),
  y: z.number(),
});
export type WidgetPosition = z.infer<typeof WidgetPositionSchema>;

export const RateLimitStateSchema = z.object({
  provider: LLMProviderSchema,
  requestCount: z.number(),
  windowStart: z.number(),
  nextAvailableAt: z.number(),
});
export type RateLimitState = z.infer<typeof RateLimitStateSchema>;
