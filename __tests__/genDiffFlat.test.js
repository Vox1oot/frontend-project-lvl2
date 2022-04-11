import { fileURLToPath } from 'url';
import * as path from 'path';
import genDiffFlat from '../bin/genDiffFlat.js';
import parsers from '../src/parsers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getPathJSONfile = (filename) => path.join(__dirname, '..', '__fixtures__', 'json', filename);
const getPathYAMLfile = (filename) => path.join(__dirname, '..', '__fixtures__', 'yaml', filename);

describe('genDiff flat objects', () => {
  const verifyObject = parsers(path.join(__dirname, 'verificationFlatObj.json'));

  describe('formats', () => {
    test('JSON flat', () => {
      const objJson1 = parsers(getPathJSONfile('file1.json'));
      const objJson2 = parsers(getPathJSONfile('file2.json'));
      const flatObj = genDiffFlat(objJson1, objJson2);

      expect(flatObj).toStrictEqual(verifyObject);
    });

    test('YAML flat', () => {
      const objYaml1 = parsers(getPathYAMLfile('filepath1.yml'));
      const objYaml2 = parsers(getPathYAMLfile('filepath2.yml'));
      const flatObj = genDiffFlat(objYaml1, objYaml2);

      expect(flatObj).toStrictEqual(verifyObject);
    });
  });
});
