import { fileURLToPath } from 'url';
import * as path from 'path';
import genDiff from '../src/index.js';
import readFile from '../src/readFile.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('genDiff', () => {
  const json1 = getFixturePath('tree1.json');
  const json2 = getFixturePath('tree2.json');
  const yaml1 = getFixturePath('tree1.yaml');
  const yaml2 = getFixturePath('tree2.yml');

  test.each([
    [genDiff(json1, json2), genDiff(yaml1, yaml2), readFile(getFixturePath('expectStylish.txt'))],
    [genDiff(json1, json2, 'plain'), genDiff(yaml1, yaml2, 'plain'), readFile(getFixturePath('expectPlain.txt'))],
    [genDiff(json1, json2, 'json'), genDiff(yaml1, yaml2, 'json'), readFile(getFixturePath('expectJSON.txt'))],
  ])('formatters', (j, y, expected) => {
    expect(j).toStrictEqual(expected);
    expect(y).toStrictEqual(expected);
  });
});
