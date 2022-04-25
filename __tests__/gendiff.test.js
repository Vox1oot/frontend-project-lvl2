import { fileURLToPath } from 'url';
import * as path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import json from '../src/formatters/json.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  const json1 = getFixturePath('tree1.json');
  const json2 = getFixturePath('tree2.json');
  const yaml1 = getFixturePath('tree1.yaml');
  const yaml2 = getFixturePath('tree2.yml');

  const stylishJSON = stylish(genDiff(json1, json2));
  const stylishYAML = stylish(genDiff(yaml1, yaml2));
  const stylishExpect = readFile('expectStylish.txt');

  const plainJSON = plain(genDiff(json1, json2));
  const plainYAML = plain(genDiff(yaml1, yaml2));
  const plainExpect = readFile('expectPlain.txt');

  const structureJSON = json(genDiff(json1, json2));
  const structureYAML = json(genDiff(yaml1, yaml2));
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
