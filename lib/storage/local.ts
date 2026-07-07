import { z } from 'zod';

import { ContextOverrideSchema, type ContextOverride } from '@/schemas/context';
import { APIKeyStoreShapeSchema, type APIKeyStoreShape } from '@/schemas/storage';
import { TelemetryEventSchema, type TelemetryEvent } from '@/schemas/telemetry';

import { createValidatedAccessor, summarizeZodIssues } from '@/lib/storage/validated-item';

const apiKeysItem = storage.defineItem<APIKeyStoreShape>('local:apiKeys', {
  fallback: {},
  version: 1,
});
export const apiKeysStorage = createValidatedAccessor(apiKeysItem, APIKeyStoreShapeSchema);

const ContextOverridesShapeSchema = z.record(z.string(), ContextOverrideSchema);
const contextOverridesItem = storage.defineItem<Record<string, ContextOverride>>(
  'local:contextOverrides',
  { fallback: {}, version: 1 },
);
export const contextOverridesStorage = createValidatedAccessor(
  contextOverridesItem,
  ContextOverridesShapeSchema,
);

const TelemetryBufferShapeSchema = z.array(TelemetryEventSchema);
const telemetryBufferItem = storage.defineItem<TelemetryEvent[]>('local:telemetryBuffer', {
  fallback: [],
  version: 1,
});
export const telemetryBufferStorage = createValidatedAccessor(
  telemetryBufferItem,
  TelemetryBufferShapeSchema,
);

const anonymousUuidItem = storage.defineItem<string>('local:anonymousUuid', {
  init: () => crypto.randomUUID(),
  version: 1,
});
export const anonymousUuidStorage = {
  key: anonymousUuidItem.key,
  async get(): Promise<string> {
    const raw = await anonymousUuidItem.getValue();
    const result = z.uuid().safeParse(raw);
    if (result.success) return result.data;

    const regenerated = crypto.randomUUID();
    console.warn(
      `[storage] Invalid value for "${anonymousUuidItem.key}", regenerating.`,
      summarizeZodIssues(result.error),
    );
    await anonymousUuidItem.setValue(regenerated);
    return regenerated;
  },
  watch: (cb: Parameters<typeof anonymousUuidItem.watch>[0]) => anonymousUuidItem.watch(cb),
};
