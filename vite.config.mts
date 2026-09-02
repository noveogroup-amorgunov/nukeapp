import path from 'node:path'
import process from 'node:process'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import type { PluginOption } from 'vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    process.env.ANALYZE && (visualizer({ gzipSize: true, open: true }) as PluginOption),
  ].filter(Boolean),
  resolve: {
    tsconfigPaths: true,
    alias: [{ find: '@', replacement: path.resolve(import.meta.dirname, 'src') }],
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]__[hash:8]',
      localsConvention: null,
    },
  },
})
