import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    minify: 'esbuild',
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'FlipClock',
      fileName: (format) => `flipclock.${format}.js`,
    }
  },
  plugins: [dts()]
});