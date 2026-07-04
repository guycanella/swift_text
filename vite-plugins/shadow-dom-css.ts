import type { Plugin, ViteDevServer } from 'vite';

export const GLOBAL_PROPERTIES_MODULE_ID = 'virtual:swifttext-global-properties';
const RESOLVED_GLOBAL_PROPERTIES_MODULE_ID = `\0${GLOBAL_PROPERTIES_MODULE_ID}`;

export function shadowDomCssPlugin(): Plugin {
  let extractedProperties = '';
  let server: ViteDevServer | undefined;

  return {
    name: 'swifttext-shadow-dom-css',
    configureServer(devServer) {
      server = devServer;
    },
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
    async transform(code, id) {
      if (!id.endsWith('.css')) return null;

      const propertyMatches = code.match(/@property\s+--[\w-]+\s*\{[^}]*\}/g);
      let hasNewProperties = false;
      if (propertyMatches) {
        for (const rule of propertyMatches) {
          if (!extractedProperties.includes(rule)) {
            extractedProperties += `${rule}\n`;
            hasNewProperties = true;
          }
        }
      }

      if (hasNewProperties && server) {
        const virtualModule = server.moduleGraph.getModuleById(
          RESOLVED_GLOBAL_PROPERTIES_MODULE_ID,
        );
        if (virtualModule) {
          try {
            await server.reloadModule(virtualModule);
          } catch (error) {
            server.config.logger.warn(
              `[swifttext-shadow-dom-css] failed to reload virtual module: ${String(error)}`,
            );
          }
        }
      }

      const withHostVariables = code.replace(
        /:root\s*\{([^}]*)\}/g,
        (fullMatch: string, declarations: string) => `${fullMatch}\n:host{${declarations}}`,
      );

      if (withHostVariables === code) return null;

      return { code: withHostVariables, map: null };
    },
  };
}
