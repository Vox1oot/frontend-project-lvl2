import { fileURLToPath } from 'url';
import * as path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import stylish from '../src/stylish.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getExpectedPath = (filename) => path.join(__dirname, filename);
const readFile = (filename) => fs.readFileSync(getExpectedPath(filename), 'utf-8');

describe('genDiff', () => {
  test('stylish formatter', () => {
    const tree1 = getFixturePath('tree1.json');
    const tree2 = getFixturePath('tree2.json');
    expect(stylish(genDiff(tree1, tree2))).toStrictEqual(readFile('expectStylish.txt'));
  });
});
