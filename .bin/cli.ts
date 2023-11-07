import { program } from 'commander';
import { ESLint } from 'eslint';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { version } from '../package.json' assert { type: 'json' };
import { CSSProperties, cssToJs } from '../src/helpers/css';

program
  .name('flipclock')
  .description('CLI to convert .css and .css.ts files.')
  .version(version);

program.command('css')
  .description('Convert a .css file into a .css.ts file.')
  .argument('<input>', 'The input path for the CSS file.')
  .argument('<output>', 'The output path of the .css.ts file.')
  .action(async (input, output) => {
    const css = (await readFile(input)).toString();

    const wrapper = `import { useCss } from "flipclock";\n\nexport const css = useCss(${JSON.stringify(cssToJs(css) as CSSProperties)});`;

    writeFile(output, wrapper)

    const eslint = new ESLint({
      fix: true,
      useEslintrc: true,
      overrideConfigFile: resolve('.eslintrc.cli.cjs')
    });

    const results = await eslint.lintFiles(output);

    await ESLint.outputFixes(results);

    const formatter = await eslint.loadFormatter('stylish');

    await formatter.format(results);
  });

program.parse();
