import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { extractTypes } from './.bin/extractTypes';

export default defineConfig({
  build: {
    minify: 'esbuild',
    lib: {
      entry: {
        flipclock: resolve(__dirname, 'index.ts'),
        // 'themes/flipclock.theme': resolve(__dirname, 'src/themes/flipclock/index.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, name) => {
        return `${name}.${format}.js`
      },
    },
  },
  plugins: [dts({
    rollupTypes: false,
    async afterBuild() {
      await extractTypes();
    }
  })]
});