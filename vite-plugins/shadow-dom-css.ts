import type { Plugin } from 'vite';

export const GLOBAL_PROPERTIES_MODULE_ID = 'virtual:swifttext-global-properties';
const RESOLVED_GLOBAL_PROPERTIES_MODULE_ID = `\0${GLOBAL_PROPERTIES_MODULE_ID}`;

export function shadowDomCssPlugin(): Plugin {
  let extractedProperties = '';

  return {
    name: 'swifttext-shadow-dom-css',
    resolveId(id) {
      if (id === GLOBAL_PROPERTIES_MODULE_ID) {
        return RESOLVED_GLOBAL_PROPERTIES_MODULE_ID;
      }
      return null;
    },
    load(id) {
      if (id === RESOLVED_GLOBAL_PROPERTIES_MODULE_ID) {
        return `export default ${JSON.stringify(extractedProperties)};`;
      }
      return null;
    },
    transform(code, id) {
      if (!id.endsWith('.css')) return null;

      const propertyMatches = code.match(/@property\s+--[\w-]+\s*\{[^}]*\}/g);
      if (propertyMatches) {
        for (const rule of propertyMatches) {
          if (!extractedProperties.includes(rule)) {
            extractedProperties += `${rule}\n`;
          }
        }
      }

      const withHostVariables = code.replace(
        /:root\s*\{([^}]*)\}/g,
        (fullMatch, declarations) => `${fullMatch}\n:host{${declarations}}`,
      );

      if (withHostVariables === code) return null;

      return { code: withHostVariables, map: null };
    },
  };
}
