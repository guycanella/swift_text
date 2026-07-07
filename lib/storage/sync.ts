import {
  MacroLibrarySchema,
  UserSettingsSchema,
  WidgetPositionSchema,
  type MacroLibrary,
  type UserSettings,
  type WidgetPosition,
} from '@/schemas';

import { createValidatedAccessor } from '@/lib/storage/validated-item';

const DEFAULT_USER_SETTINGS: UserSettings = {
  theme: 'system',
  defaultProvider: 'anthropic',
  defaultModelId: '',
  shortcuts: { toggleWidget: 'Alt+J' },
  piiScanning: 'always-ask',
};

const userSettingsItem = storage.defineItem<UserSettings>('sync:userSettings', {
  fallback: DEFAULT_USER_SETTINGS,
  version: 1,
});
export const userSettingsStorage = createValidatedAccessor(userSettingsItem, UserSettingsSchema);

const DEFAULT_MACRO_LIBRARY: MacroLibrary = { macros: [] };

const macroLibraryItem = storage.defineItem<MacroLibrary>('sync:macroLibrary', {
  fallback: DEFAULT_MACRO_LIBRARY,
  version: 1,
});
export const macroLibraryStorage = createValidatedAccessor(macroLibraryItem, MacroLibrarySchema);

const DEFAULT_WIDGET_POSITION: WidgetPosition = { x: 0, y: 0 };

const widgetPositionItem = storage.defineItem<WidgetPosition>('sync:widgetPosition', {
  fallback: DEFAULT_WIDGET_POSITION,
  version: 1,
});
export const widgetPositionStorage = createValidatedAccessor(
  widgetPositionItem,
  WidgetPositionSchema,
);
