#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';

const program = new Command();

program
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const formatter = program.opts().format;
    switch (formatter) {
      case 'plain':
        console.log(plain(genDiff(filepath1, filepath2)));
        break;
      default:
        console.log(stylish(genDiff(filepath1, filepath2)));
    }
  });

program.parse();
