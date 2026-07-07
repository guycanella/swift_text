import { userSettingsStorage } from '@/lib/storage/sync';
import type { LLMProvider } from '@/schemas/provider';

export async function persistLastUsedProvider(provider: LLMProvider): Promise<void> {
  const settings = await userSettingsStorage.get();
  await userSettingsStorage.set({ ...settings, defaultProvider: provider });
}
