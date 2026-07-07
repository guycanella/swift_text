import { z } from 'zod';

import { ContextOverrideSchema, type ContextOverride } from '@/schemas/context';
import { APIKeyStoreShapeSchema, type APIKeyStoreShape } from '@/schemas/storage';
import { TelemetryEventSchema, type TelemetryEvent } from '@/schemas/telemetry';

import { createSelfHealingAccessor, createValidatedAccessor } from '@/lib/storage/validated-item';

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
export const anonymousUuidStorage = createSelfHealingAccessor(anonymousUuidItem, z.uuid(), () =>
  crypto.randomUUID(),
);
