import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === 'seatbelt';

export default defineConfig(() => {
  const repositoryBase = process.env.GITHUB_ACTIONS ? '/web/' : '/';
  return {
    base: process.env.VITE_BASE_PATH || repositoryBase,
    css: { postcss: { plugins: [tailwindcss()] } },
    optimizeDeps: {
      exclude: ['lucide-react'],
      include: [
        '@base-ui/react/select',
        '@base-ui/react/merge-props',
        '@base-ui/react/use-render',
      ],
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
      },
      dedupe: ['react', 'react-dom'],
    },
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [react()],
  };
});
