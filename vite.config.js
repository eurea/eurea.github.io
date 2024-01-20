import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => ({
  build: { outDir: 'build' },
  plugins: [react(), mkcert(), VitePWA({ injectRegister: 'inline' })],
  resolve: { alias: [{ find: /^~(.*)$/, replacement: '$1' }] },
  server: { https: true },
}));
