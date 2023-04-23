import { PluginOption, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    process.env.ANALYZE &&
      (visualizer({ gzipSize: true, open: true }) as PluginOption),
  ].filter(Boolean),
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]__[hash:8]',
      localsConvention: null,
    },
  },
})
