import { createAnthropic, type AnthropicProvider } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI, type GoogleGenerativeAIProvider } from '@ai-sdk/google';
import { createOpenAI, type OpenAIProvider } from '@ai-sdk/openai';

import type { ProviderConfig } from '@/schemas/provider';

const KIMI_BASE_URL = 'https://api.moonshot.ai/v1';

export type LLMProviderInstance = AnthropicProvider | OpenAIProvider | GoogleGenerativeAIProvider;

export function createProvider(config: ProviderConfig): LLMProviderInstance {
  switch (config.provider) {
    case 'anthropic':
      return createAnthropic({ apiKey: config.apiKey });
    case 'openai':
      return createOpenAI({ apiKey: config.apiKey });
    case 'google':
      return createGoogleGenerativeAI({ apiKey: config.apiKey });
    case 'kimi':
      return createOpenAI({ apiKey: config.apiKey, baseURL: KIMI_BASE_URL });
  }
}
