import type { GetDataType, GetReturnType } from '@webext-core/messaging';

import { sendMessage } from '@/lib/messaging';
import type { ProtocolMap } from '@/lib/messaging/protocol';

const RETRYABLE_ERROR_PATTERNS = [
  /could not establish connection/i,
  /receiving end does not exist/i,
  /message port closed before a response was received/i,
];

function isRetryableError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return RETRYABLE_ERROR_PATTERNS.some((pattern) => pattern.test(message));
}

export interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
}

export async function sendMessageWithRetry<TType extends keyof ProtocolMap>(
  type: TType,
  data: GetDataType<ProtocolMap[TType]>,
  options: RetryOptions = {},
): Promise<GetReturnType<ProtocolMap[TType]>> {
  const { maxAttempts = 3, delayMs = 250 } = options;
  if (maxAttempts < 1) {
    throw new RangeError('[messaging] maxAttempts must be at least 1');
  }

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await sendMessage(type, data);
    } catch (error) {
      if (!isRetryableError(error) || attempt === maxAttempts) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
    }
  }

  throw new Error(`[messaging] Unreachable: retry loop exited without returning or throwing`);
}
