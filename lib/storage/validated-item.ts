import type { z } from 'zod';

export function summarizeZodIssues(error: z.ZodError): {
  path: (string | number)[];
  code: string;
  message: string;
}[] {
  return error.issues.map((issue) => ({
    path: issue.path.map((segment) => segment as string | number),
    code: issue.code,
    message: issue.message,
  }));
}

export function createValidatedAccessor<TSchema extends z.ZodType>(
  item: WxtStorageItem<z.infer<TSchema>, Record<string, unknown>>,
  schema: TSchema,
) {
  return {
    key: item.key,
    async get(): Promise<z.infer<TSchema>> {
      const raw = await item.getValue();
      const result = schema.safeParse(raw);
      if (!result.success) {
        console.warn(
          `[storage] Invalid value for "${item.key}", falling back to default.`,
          summarizeZodIssues(result.error),
        );
        return item.fallback;
      }
      return result.data;
    },
    async set(value: z.infer<TSchema>): Promise<void> {
      const result = schema.safeParse(value);
      if (!result.success) {
        throw new Error(
          `[storage] Refusing to persist invalid value for "${item.key}": ${JSON.stringify(summarizeZodIssues(result.error))}`,
        );
      }
      await item.setValue(result.data);
    },
    watch: (cb: Parameters<typeof item.watch>[0]) => item.watch(cb),
  };
}
