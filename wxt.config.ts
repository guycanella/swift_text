import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'SwiftText',
    description: 'Bring your own LLM API key to enhance and rewrite text directly in the browser.',
  },
});
