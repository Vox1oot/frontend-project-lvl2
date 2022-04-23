import { fileURLToPath } from 'url';
import * as path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import json from '../src/formatters/json.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getExpectedPath = (filename) => path.join(__dirname, filename);
const readFile = (filename) => fs.readFileSync(getExpectedPath(filename), 'utf-8');

describe('genDiff', () => {
  describe('format stylish', () => {
    test('.json', () => {
      const tree1 = getFixturePath('tree1.json');
      const tree2 = getFixturePath('tree2.json');
      expect(stylish(genDiff(tree1, tree2))).toStrictEqual(readFile('expectStylish.txt'));
    });

    test('.yaml', () => {
      const tree1 = getFixturePath('tree1.yaml');
      const tree2 = getFixturePath('tree2.yml');
      expect(stylish(genDiff(tree1, tree2))).toStrictEqual(readFile('expectStylish.txt'));
    });
  });

  describe('format plain', () => {
    test('.json', () => {
      const tree1 = getFixturePath('tree1.json');
      const tree2 = getFixturePath('tree2.json');
      expect(plain(genDiff(tree1, tree2))).toStrictEqual(readFile('expectPlain.txt'));
    });
  });

  describe('format json', () => {
    test('JSON', () => {
      const tree1 = getFixturePath('tree1.json');
      const tree2 = getFixturePath('tree2.json');
      expect(json(genDiff(tree1, tree2))).toStrictEqual(readFile('expectJSON.txt'));
    });
  });
});
