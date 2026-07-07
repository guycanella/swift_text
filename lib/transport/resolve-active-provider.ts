import { apiKeysStorage } from '@/lib/storage/local';
import { userSettingsStorage } from '@/lib/storage/sync';
import type { ProviderConfig } from '@/schemas/provider';

export async function resolveActiveProvider(): Promise<ProviderConfig> {
  const [settings, apiKeys] = await Promise.all([userSettingsStorage.get(), apiKeysStorage.get()]);
  const apiKey = apiKeys[settings.defaultProvider];

  if (apiKey == null) {
    throw new Error(`No API key configured for provider "${settings.defaultProvider}"`);
  }

  return {
    provider: settings.defaultProvider,
    apiKey,
    defaultModelId: settings.defaultModelId === '' ? undefined : settings.defaultModelId,
  };
}
