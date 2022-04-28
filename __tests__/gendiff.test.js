import { fileURLToPath } from 'url';
import * as path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  const json1 = getFixturePath('tree1.json');
  const json2 = getFixturePath('tree2.json');
  const yaml1 = getFixturePath('tree1.yaml');
  const yaml2 = getFixturePath('tree2.yml');

  const stylishJSON = genDiff(json1, json2, 'stylish');
  const stylishYAML = genDiff(yaml1, yaml2, 'stylish');
  const stylishExpect = readFile('expectStylish.txt');

  const plainJSON = genDiff(json1, json2, 'plain');
  const plainYAML = genDiff(yaml1, yaml2, 'plain');
  const plainExpect = readFile('expectPlain.txt');

  const structureJSON = genDiff(json1, json2, 'json');
  const structureYAML = genDiff(yaml1, yaml2, 'json');
  const jsonExpect = readFile('expectJSON.txt');

  test.each([
    [stylishJSON, stylishYAML, stylishExpect],
    [plainJSON, plainYAML, plainExpect],
    [structureJSON, structureYAML, jsonExpect],
  ])('formatters', (a, b, expected) => {
    expect(a).toStrictEqual(expected);
    expect(b).toStrictEqual(expected);
  });
});
