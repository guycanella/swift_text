import { z } from 'zod';

import { ModelInfoSchema, type LLMProvider, type ModelInfo } from '@/schemas/provider';

const PROVIDER_MODELS: Record<LLMProvider, ModelInfo[]> = {
  anthropic: [
    { id: 'claude-sonnet-5', provider: 'anthropic', label: 'Claude Sonnet 5' },
    { id: 'claude-opus-4-8', provider: 'anthropic', label: 'Claude Opus 4.8' },
    { id: 'claude-fable-5', provider: 'anthropic', label: 'Claude Fable 5' },
    { id: 'claude-haiku-4-5-20251001', provider: 'anthropic', label: 'Claude Haiku 4.5' },
  ],
  openai: [
    { id: 'gpt-5.5', provider: 'openai', label: 'GPT-5.5' },
    { id: 'gpt-5.4', provider: 'openai', label: 'GPT-5.4' },
    { id: 'gpt-5.4-mini', provider: 'openai', label: 'GPT-5.4 Mini' },
    { id: 'gpt-5.4-nano', provider: 'openai', label: 'GPT-5.4 Nano' },
  ],
  google: [
    { id: 'gemini-3.1-pro-preview', provider: 'google', label: 'Gemini 3.1 Pro' },
    { id: 'gemini-3.5-flash', provider: 'google', label: 'Gemini 3.5 Flash' },
    { id: 'gemini-3.1-flash-lite', provider: 'google', label: 'Gemini 3.1 Flash-Lite' },
  ],
  kimi: [
    { id: 'kimi-k2.6', provider: 'kimi', label: 'Kimi K2.6' },
    { id: 'kimi-k2.5', provider: 'kimi', label: 'Kimi K2.5' },
    { id: 'kimi-k2.7-code', provider: 'kimi', label: 'Kimi K2.7 Code' },
  ],
};

const ProviderModelsSchema = z.record(z.string(), z.array(ModelInfoSchema));
ProviderModelsSchema.parse(PROVIDER_MODELS);

export function getModelsForProvider(provider: LLMProvider): ModelInfo[] {
  return PROVIDER_MODELS[provider];
}
