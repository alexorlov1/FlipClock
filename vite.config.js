
const { defineConfig } = require('vite');

export default defineConfig({
  build: {
    minify: 'esbuild',
    lib: {
      entry: './index.ts',
      name: 'FlipClock',
      fileName: (format) => `flipclock.${format}.js`,
    }
  }
});