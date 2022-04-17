import { fileURLToPath } from 'url';
import * as path from 'path';
import parsers from '../src/parsers.js';
import reduceDifference from '../src/reduceDifference.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getPathJSONfile = (filename) => path.join(__dirname, '..', '__fixtures__', 'json', filename);
const getPathYAMLfile = (filename) => path.join(__dirname, '..', '__fixtures__', 'yaml', filename);

describe('genDiff', () => {
  describe('flat', () => {
    const verifyFlat = parsers(path.join(__dirname, 'verificationFlat.json'));

    test('json', () => {
      const json1 = parsers(getPathJSONfile('filepath1.json'));
      const json2 = parsers(getPathJSONfile('filepath2.json'));
      const flat = reduceDifference(json1, json2);

      expect(flat).toStrictEqual(verifyFlat);
    });

    test('yaml', () => {
      const yml1 = parsers(getPathYAMLfile('filepath1.yml'));
      const yml2 = parsers(getPathYAMLfile('filepath2.yml'));
      const flat = reduceDifference(yml1, yml2);

      expect(flat).toStrictEqual(verifyFlat);
    });

    test('json & yml', () => {
      const json = parsers(getPathJSONfile('filepath1.json'));
      const yml = parsers(getPathYAMLfile('filepath2.yml'));
      const flat = reduceDifference(json, yml);

      expect(flat).toStrictEqual(verifyFlat);
    });
  });

  describe('tree', () => {
    const verifyTree = parsers(path.join(__dirname, 'verificationTree.json'));

    test('json', () => {
      const tree1 = parsers(getPathJSONfile('tree1.json'));
      const tree2 = parsers(getPathJSONfile('tree2.json'));
      const diffTree = reduceDifference(tree1, tree2);

      expect(diffTree).toStrictEqual(verifyTree);
    });

    test('yml', () => {
      const tree1 = parsers(getPathYAMLfile('tree1.yaml'));
      const tree2 = parsers(getPathYAMLfile('tree2.yml'));
      const diffTree = reduceDifference(tree1, tree2);

      expect(diffTree).toStrictEqual(verifyTree);
    });
  });
});
