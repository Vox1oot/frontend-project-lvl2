import _ from 'lodash';

const genDiffFlat = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const unionKeys = _.union(keys1, keys2);

  const sortedUnionKeys = _.sortBy(unionKeys);

  const flatObject = sortedUnionKeys.reduce((acc, key) => {
    const valueFile1 = file1[key];
    const valueFile2 = file2[key];

    if (_.has(file1, key) && !_.has(file2, key)) {
      return { ...acc, [`- ${key}`]: valueFile1 };
    }

    if (_.has(file1, key) && _.has(file2, key)) {
      if (valueFile1 === valueFile2) {
        return { ...acc, [`  ${key}`]: valueFile1 };
      }
      return { ...acc, [`- ${key}`]: valueFile1, [`+ ${key}`]: valueFile2 };
    }

    return { ...acc, [`+ ${key}`]: valueFile2 };
  }, {});

  return flatObject;
};

export default genDiffFlat;
