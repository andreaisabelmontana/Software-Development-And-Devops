import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// When deployed to GitHub Pages the site is served at
//   https://<user>.github.io/software-development-and-devops/
// so we need a non-root base. For local `vite dev` and for custom domains we
// fall back to '/'.
const repoBase = '/software-development-and-devops/';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? repoBase : '/',
  server: {
    port: 5173,
    open: true,
  },
}));
