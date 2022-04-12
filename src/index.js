import createDiffFlatObjects from './diffFlat.js';
import parsers from './parsers.js';

export const stringify = (obj) => JSON.stringify(obj, null, 2).replaceAll('"', '').replaceAll(',', '');

const genDiff = (filepath1, filepath2) => {
  const data1 = parsers(filepath1);
  const data2 = parsers(filepath2);

  const diffFlatObj = createDiffFlatObjects(data1, data2);
  return stringify(diffFlatObj);
};

export default genDiff;
