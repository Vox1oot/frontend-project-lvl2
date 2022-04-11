import { fileURLToPath } from 'url';
import * as path from 'path';
import parsers from '../src/parsers.js';

const verify = {
  name: 'Morzhov Vitaliy',
  age: 32,
  married: true,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('parsing', () => {
  const yamlPath = (filename) => path.join(__dirname, '..', '__fixtures__', 'yaml', filename);
  const ymlPath = (filename) => path.join(__dirname, '..', '__fixtures__', 'yaml', filename);
  const jsonPath = (filename) => path.join(__dirname, '..', '__fixtures__', 'json', filename);

  const dataYaml = parsers(yamlPath('forTest.yaml'));
  const dataYml = parsers(ymlPath('parseTest.yml'));
  const dataJSON = parsers(jsonPath('forTest.json'));

  test('yaml & yml', () => {
    expect(dataYaml).toStrictEqual(verify);
    expect(dataYml).toStrictEqual(verify);
  });

  test('JSON', () => {
    expect(dataJSON).toStrictEqual(verify);
  });
});
