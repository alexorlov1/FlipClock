import { writeFile } from 'node:fs/promises';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { extractTypes } from './.bin/extractTypes';
import { parse } from './src/helpers/css';
import { css } from './src/themes/flipclock/flipclock.css';

const writeCssFiles = {
    'flipclock.css': parse(css.css.value)
};

export default defineConfig({
    build: {
        minify: 'esbuild',
        lib: {
            entry: {
                flipclock: resolve(__dirname, 'index.ts'),
            },
            formats: ['es', 'cjs'],
            fileName: (format, name) => {
                return `${name}.${format}.js`;
            },
        },
    },
    plugins: [
        dts({
            rollupTypes: false,
            async afterBuild() {
                await extractTypes();

                for (const [key, value] of Object.entries(writeCssFiles)) {
                    await writeFile(resolve(`./dist/${key}`), value);
                }                
            }
        }),
    ]
});