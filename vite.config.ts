import { existsSync, writeFileSync } from 'node:fs';
import { mkdir, rm } from 'node:fs/promises';
import { resolve } from 'path';
import { ClassDeclaration, Project, SourceFile } from 'ts-morph';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    minify: 'esbuild',
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'FlipClock',
      fileName: (format) => `flipclock.${format}.js`,
    }
  },
  plugins: [dts({
    rollupTypes: true,
    afterBuild() {
      extractTypes('./dist/index.d.ts', './docs/types')
    }
  })]
});

const dir = './docs/types';

async function extractTypes(tsFilePath: string, outputFolderPath: string) {
  if(existsSync(dir)) {
    await rm(dir, {
      recursive: true,
      force: true
    })
  }

  await mkdir(dir);
  
  const sourceFile: SourceFile = new Project({
    tsConfigFilePath: './tsconfig.json'
  }).addSourceFileAtPath(tsFilePath);
  
  const extensions: Record<string,string> = {
    'ClassDeclaration': '.class.ts',
    'FunctionDeclaration': '.function.ts',
    'TypeAliasDeclaration': '.type.ts',
    'InterfaceDeclaration': '.interface.ts'
  }

  sourceFile.getExportedDeclarations().forEach((declarations, key) => {
    for(const declaration of declarations) {
      if('getName' in declaration) {
        const filename = `${declaration.getName()}${extensions[declaration.getKindName()] ?? ''}`;

        writeFileSync(filename, declaration.getText().replace(/export declare /, ''));

        if(declaration.getKindName() === 'ClassDeclaration') {

          for(const method of (declaration as ClassDeclaration).getMethods()) {
            console.log(method.getKindName());
          }
        }
      }
    }
  });   
}

function resolvePath(filename: string, extension: string) {
  let count = 0;
  let path = resolve(dir, filename, extension);

  while(existsSync(path)) {
    path = resolve(dir, `${filename}_${++count}`, extension);
  }
  
  return path
}