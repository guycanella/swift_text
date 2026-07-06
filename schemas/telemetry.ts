import { z } from 'zod';

import { LLMProviderSchema } from '@/schemas/provider';

export const TelemetryEventTypeSchema = z.enum([
  'ttft',
  'error',
  'macro_use',
  'provider_switch',
  'injection_failure',
]);
export type TelemetryEventType = z.infer<typeof TelemetryEventTypeSchema>;

export const TelemetryMetadataValueSchema = z.union([z.string(), z.number(), z.boolean()]);
export type TelemetryMetadataValue = z.infer<typeof TelemetryMetadataValueSchema>;

export const TelemetryEventSchema = z.object({
  eventType: TelemetryEventTypeSchema,
  provider: LLMProviderSchema.optional(),
  value: z.number().optional(),
  metadata: z.record(z.string(), TelemetryMetadataValueSchema).optional(),
  anonymousUuid: z.string(),
  extensionVersion: z.string(),
  createdAt: z.number(),
});
export type TelemetryEvent = z.infer<typeof TelemetryEventSchema>;

export const TelemetryPayloadSchema = z.object({
  events: z.array(TelemetryEventSchema),
});
export type TelemetryPayload = z.infer<typeof TelemetryPayloadSchema>;
