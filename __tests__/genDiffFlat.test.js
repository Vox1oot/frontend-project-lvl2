import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import genDiffFlat from '../bin/genDiffFlat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('Flat JSON files', () => {
  const obj1 = JSON.parse(readFileSync(getFixturePath('file1.json')));
  const obj2 = JSON.parse(readFileSync(getFixturePath('file2.json')));
  const flatObj = genDiffFlat(obj1, obj2);

  test('Length and sort', () => {
    const keys = Object.keys(flatObj);
    expect(keys).toHaveLength(6);
    expect(keys[0]).toBe('- follow');
  });

  test('value', () => {
    expect(flatObj['- follow']).toBe(false);
    expect(flatObj['+ timeout']).toBe(20);
  });

  test('match in both files', () => {
    expect(flatObj).toMatchObject({ '  host': 'hexlet.io' });
  });
});
