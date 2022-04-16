import parsers from './parsers.js';
import reduceDifference from './reduceDifference.js';
import stylish from './stylish.js';

export const stringify = (obj) => JSON.stringify(obj, null, 2).replaceAll('"', '').replaceAll(',', '');

const genDiff = (filepath1, filepath2) => {
  const data1 = parsers(filepath1);
  const data2 = parsers(filepath2);

  const diff = reduceDifference(data1, data2);
  return stylish(diff);
};

export default genDiff;
