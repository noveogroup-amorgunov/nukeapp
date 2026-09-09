import path from 'node:path'
import process from 'node:process'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
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
