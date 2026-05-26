import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// When deployed to GitHub Pages the site is served from a sub-path that
// matches the repo name (with whatever case GitHub uses). We derive that
// from $GITHUB_REPOSITORY which the Actions runner sets automatically:
//   GITHUB_REPOSITORY=andreaisabelmontana/Software-Development-And-Devops
// For local `vite dev` and for a custom domain we fall back to '/'.
function repoBaseFromEnv() {
  const slug = process.env.GITHUB_REPOSITORY;
  if (!slug || !slug.includes('/')) return '/';
  const repo = slug.split('/')[1];
  return `/${repo}/`;
}

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? repoBaseFromEnv() : '/',
  server: {
    port: 5173,
    open: true,
  },
}));
