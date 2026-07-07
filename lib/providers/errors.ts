import { APICallError } from 'ai';

import type { APIErrorKind } from '@/schemas/chat';

export function classifyProviderError(error: unknown): APIErrorKind {
  if (error instanceof Error && (error.name === 'AbortError' || error.name === 'TimeoutError')) {
    return 'timeout';
  }
  if (APICallError.isInstance(error)) {
    if (error.statusCode === 401 || error.statusCode === 403) return 'invalid_api_key';
    if (error.statusCode === 429) return 'rate_limited';
    if (error.statusCode != null && error.statusCode >= 500) return 'server_error';
  }
  return 'unknown';
}
