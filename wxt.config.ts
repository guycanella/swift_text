import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';
import { shadowDomCssPlugin } from './vite-plugins/shadow-dom-css';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'SwiftText',
    description: 'Bring your own LLM API key to enhance and rewrite text directly in the browser.',
  },
  vite: () => ({
    plugins: [tailwindcss(), shadowDomCssPlugin()],
  }),
});
