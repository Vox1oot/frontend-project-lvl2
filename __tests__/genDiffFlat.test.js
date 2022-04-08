import genDiffFlat from '../bin/genDiffFlat.js';

test('difference object', () => {
  const obj1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };

  const obj2 = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };

  const result = genDiffFlat(obj1, obj2);

  expect(result).toStrictEqual({
  "- follow": false,
  "  host": 'hexlet.io',
  "- proxy": '123.234.53.22',
  "- timeout": 50,
  "+ timeout": 20,
  "+ verbose": true,
  })
});
