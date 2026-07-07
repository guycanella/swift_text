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
