import { z } from 'zod';

export const PromptMacroSchema = z.object({
  trigger: z
    .string()
    .regex(/^\/\S{1,19}$/, 'Macro trigger must start with "/" and contain no spaces'),
  prompt: z.string(),
  isBuiltIn: z.boolean(),
  createdAt: z.number(),
  lastUsed: z.number().optional(),
});
export type PromptMacro = z.infer<typeof PromptMacroSchema>;

export const MacroLibrarySchema = z.object({
  macros: z.array(PromptMacroSchema),
});
export type MacroLibrary = z.infer<typeof MacroLibrarySchema>;
