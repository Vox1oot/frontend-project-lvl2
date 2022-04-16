import { fileURLToPath } from 'url';
import * as path from 'path';
import parsers from '../src/parsers.js';
import genDiff, { stringify } from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getPathJSONfile = (filename) => path.join(__dirname, '..', '__fixtures__', 'json', filename);
const getPathYAMLfile = (filename) => path.join(__dirname, '..', '__fixtures__', 'yaml', filename);

describe('genDiff', () => {
  describe('flat', () => {
    const verifyFlat = stringify(parsers(path.join(__dirname, 'verificationFlat.json')));

    test('json', () => {
      const pathJSON1 = getPathJSONfile('filepath1.json');
      const pathJSON2 = getPathJSONfile('filepath2.json');
      const flatJSON = genDiff(pathJSON1, pathJSON2);

      expect(flatJSON).toStrictEqual(verifyFlat);
    });

    test('yaml', () => {
      const pathYML1 = getPathYAMLfile('filepath1.yml');
      const pathYML2 = getPathYAMLfile('filepath2.yml');
      const flatYML = genDiff(pathYML1, pathYML2);

      expect(flatYML).toStrictEqual(verifyFlat);
    });

    test('json & yml', () => {
      const pathJSON1 = getPathJSONfile('filepath1.json');
      const pathYML2 = getPathYAMLfile('filepath2.yml');
      const flatYML = genDiff(pathJSON1, pathYML2);

      expect(flatYML).toStrictEqual(verifyFlat);
    });
  });

  describe('tree', () => {
    const verifyTree = stringify(parsers(path.join(__dirname, 'verificationTree.json')));

    test('diffTree JSON', () => {
      const treeJSON1 = getPathJSONfile('tree1.json');
      const treeJSON2 = getPathJSONfile('tree2.json');
      const diffTree = genDiff(treeJSON1, treeJSON2);

      expect(diffTree).toStrictEqual(verifyTree);
    });

    test('diffTree JYML', () => {
      const treeYML1 = getPathYAMLfile('tree1.yaml');
      const treeYML2 = getPathYAMLfile('tree2.yml');
      const diffTree = genDiff(treeYML1, treeYML2);

      expect(diffTree).toStrictEqual(verifyTree);
    });
  });
});
