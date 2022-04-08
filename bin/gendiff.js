#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import { readFileSync } from 'fs';
import genDiffFlat from './genDiffFlat.js';

const genDiff = (filepath1, filepath2) => {
  const workingDir = process.cwd();
  const firstFilePath = path.resolve(workingDir, `${filepath1}`);
  const secondFilePath = path.resolve(workingDir, `${filepath2}`);

  const data1 = JSON.parse(readFileSync(firstFilePath));
  const data2 = JSON.parse(readFileSync(secondFilePath));

  const diffFlatObj = genDiffFlat(data1, data2);
  const result = JSON.stringify(diffFlatObj, null, 2).replaceAll('"', '').replaceAll(',', '');
  return result;
};

const program = new Command();

program
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  });

program.parse();

export default genDiff;
