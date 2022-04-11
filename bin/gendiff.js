#!/usr/bin/env node
import { Command } from 'commander';
import genDiffFlat from './genDiffFlat.js';
import parsers from '../src/parsers.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parsers(filepath1);
  const data2 = parsers(filepath2);

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

program.parse(process.argv);

export default genDiff;
