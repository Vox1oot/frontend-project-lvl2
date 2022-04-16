import parsers from './parsers.js';
import reduceDifference from './reduceDifference.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parsers(filepath1);
  const data2 = parsers(filepath2);

  const diff = reduceDifference(data1, data2);
  return diff;
};

export default genDiff;
