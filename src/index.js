import path from 'path';
import parsers from './parsers.js';
import reduceDifference from './reduceDifference.js';
import readFile from './readFile.js';
import showFormat from './formatters/showFormat.js';

const getParsingData = (file) => {
  const data = readFile(file);
  const extension = path.extname(file).substring(1);
  return parsers(data, extension);
};

const genDiff = (file1, file2, format) => {
  const diff = reduceDifference(getParsingData(file1), getParsingData(file2));
  return showFormat(diff, format);
};

export default genDiff;
