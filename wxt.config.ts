import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';
import { shadowDomCssPlugin } from './vite-plugins/shadow-dom-css';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: ({ command }) => ({
    name: 'SwiftText',
    description: 'Bring your own LLM API key to enhance and rewrite text directly in the browser.',
    permissions: ['storage', 'activeTab', 'scripting'],
    host_permissions: [
      'https://api.anthropic.com/*',
      'https://api.openai.com/*',
      'https://generativelanguage.googleapis.com/*',
      'https://api.fuelix.ai/*',
    ],
    ...(command === 'build' && {
      content_security_policy: {
        extension_pages:
          "script-src 'self'; object-src 'self'; connect-src 'self' https://api.anthropic.com https://api.openai.com https://generativelanguage.googleapis.com https://api.fuelix.ai",
      },
    }),
  }),
  vite: () => ({
    plugins: [tailwindcss(), shadowDomCssPlugin()],
  }),
});
