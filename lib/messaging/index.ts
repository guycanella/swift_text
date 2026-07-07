import { defineExtensionMessaging } from '@webext-core/messaging';
import type {
  ExtensionMessage,
  GetReturnType,
  MaybePromise,
  Message,
} from '@webext-core/messaging';
import type { z } from 'zod';

import { summarizeZodIssues } from '@/lib/zod-utils';

import type { ProtocolMap } from '@/lib/messaging/protocol';

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();

export function onValidatedMessage<TType extends keyof ProtocolMap, TSchema extends z.ZodType>(
  type: TType,
  schema: TSchema,
  handler: (
    data: z.infer<TSchema>,
    message: Message<ProtocolMap, TType> & ExtensionMessage,
  ) => MaybePromise<GetReturnType<ProtocolMap[TType]>>,
) {
  return onMessage(type, (message) => {
    const result = schema.safeParse(message.data);
    if (!result.success) {
      throw new Error(
        `[messaging] Invalid payload for "${type}": ${JSON.stringify(summarizeZodIssues(result.error))}`,
      );
    }
    return handler(result.data, message);
  });
}
