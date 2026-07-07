import { generateText } from 'ai';

import { classifyProviderError } from '@/lib/providers/errors';
import { createProvider } from '@/lib/providers/factory';
import { getModelsForProvider } from '@/lib/providers/models';
import type { APIErrorKind } from '@/schemas/chat';
import type { ProviderConfig } from '@/schemas/provider';

export interface ProviderHealthCheckResult {
  status: 'ok' | APIErrorKind;
}

export async function checkProviderHealth(
  config: ProviderConfig,
): Promise<ProviderHealthCheckResult> {
  const [firstModel] = getModelsForProvider(config.provider);
  const provider = createProvider(config);

  try {
    await generateText({
      model: provider(firstModel.id),
      prompt: 'ping',
      maxOutputTokens: 1,
    });
    return { status: 'ok' };
  } catch (error) {
    return { status: classifyProviderError(error) };
  }
}
