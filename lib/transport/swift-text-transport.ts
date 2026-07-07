import {
  convertToModelMessages,
  streamText,
  toUIMessageStream,
  type ChatTransport,
  type UIMessage,
} from 'ai';

import { classifyProviderError } from '@/lib/providers/errors';
import { createProvider } from '@/lib/providers/factory';
import { getModelsForProvider } from '@/lib/providers/models';
import { resolveActiveProvider } from '@/lib/transport/resolve-active-provider';
import type { ProviderConfig } from '@/schemas/provider';

export interface SwiftTextTransportOptions {
  resolveActiveProvider?: () => Promise<ProviderConfig>;
  onFirstToken?: (ttftMs: number) => void;
}

export class SwiftTextTransport implements ChatTransport<UIMessage> {
  private readonly resolveActiveProvider: () => Promise<ProviderConfig>;
  private readonly onFirstToken?: (ttftMs: number) => void;

  constructor(options: SwiftTextTransportOptions = {}) {
    this.resolveActiveProvider = options.resolveActiveProvider ?? resolveActiveProvider;
    this.onFirstToken = options.onFirstToken;
  }

  sendMessages: ChatTransport<UIMessage>['sendMessages'] = async (options) => {
    const config = await this.resolveActiveProvider();
    const provider = createProvider(config);
    const modelId = config.defaultModelId ?? getModelsForProvider(config.provider)[0].id;
    const modelMessages = await convertToModelMessages(options.messages);

    const requestStartedAt = performance.now();
    let firstTokenRecorded = false;

    const result = streamText({
      model: provider(modelId),
      messages: modelMessages,
      abortSignal: options.abortSignal,
      onChunk: () => {
        if (!firstTokenRecorded) {
          firstTokenRecorded = true;
          this.onFirstToken?.(performance.now() - requestStartedAt);
        }
      },
      onError: ({ error }) => {
        console.error('[transport] stream error', classifyProviderError(error));
      },
    });

    return toUIMessageStream({
      stream: result.stream,
      onError: (error) => classifyProviderError(error),
    });
  };

  reconnectToStream: ChatTransport<UIMessage>['reconnectToStream'] = () => Promise.resolve(null);
}
