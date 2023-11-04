import { ExportNamedDeclaration, Program, VariableDeclaration } from 'acorn';
import { writeFile } from 'node:fs/promises';
import { basename, resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { extractTypes } from './.bin/extractTypes';
import { parse } from './src/helpers/css';

let cssMap: Record<string,string> = {};

export default defineConfig({
  build: {
    minify: 'esbuild',
    lib: {
      entry: {
        flipclock: resolve(__dirname, 'index.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, name) => {
        return `${name}.${format}.js`
      },
    },
  },
  plugins: [
    {
      name: 'css-to-js',
      transform(code, id) {
        if(!id.endsWith('.css.ts')) {
          return
        }

        const node = this.parse(code) as Program;

        const exports = node.body.filter(({ type }) => {
          return type === 'ExportNamedDeclaration'
        }) as ExportNamedDeclaration[];

        function getVariableIdentifier(declaration: VariableDeclaration) {
          for(const node of declaration.declarations) {
            if(node.id.type === 'Identifier') {
              return node.id.name;
            }
          }
        }

        function getVariableValue(declaration: VariableDeclaration) {
          for(const node of declaration.declarations) {
            if(node.init) {
              return code.slice(declaration.start, declaration.end);
            }
          }
        }

        const variables = exports.map(node => {
          if(node.declaration?.type === 'VariableDeclaration') {
            return node.declaration;
          }
        }).filter(Boolean) as VariableDeclaration[];

        for(const variable of variables) {
          if(getVariableIdentifier(variable) === 'css') {
            const value = getVariableValue(variable);

            if(value) {
              cssMap[basename(id)] = parse((0, eval)(`${value}; css`));
            }

            return;
          }
        }
      },
      async generateBundle(options, bundle) {
        for(const [name, content] of Object.entries(cssMap)) {
          await writeFile(resolve('./dist', `${name.replace('.css.ts', '.css')}`), content);
        }
      }
    },
    dts({
      rollupTypes: false,
      async afterBuild() {
        await extractTypes();
      }
    }),
  ]
});