import { APICallError, generateText } from 'ai';

import { createProvider } from '@/lib/providers/factory';
import { getModelsForProvider } from '@/lib/providers/models';
import type { ProviderConfig } from '@/schemas/provider';

export type ProviderHealthCheckStatus = 'ok' | 'invalid_api_key' | 'rate_limited' | 'unreachable';

export interface ProviderHealthCheckResult {
  status: ProviderHealthCheckStatus;
}

function classifyError(error: unknown): ProviderHealthCheckStatus {
  if (APICallError.isInstance(error)) {
    if (error.statusCode === 401 || error.statusCode === 403) return 'invalid_api_key';
    if (error.statusCode === 429) return 'rate_limited';
  }
  return 'unreachable';
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
    return { status: classifyError(error) };
  }
}
