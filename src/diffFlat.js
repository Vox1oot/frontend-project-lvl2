import _ from 'lodash';

const createDiffFlatObjects = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2);

  const sortedUnionKeys = _.sortBy(unionKeys);

  const flatObject = sortedUnionKeys.reduce((acc, key) => {
    const valueFile1 = data1[key];
    const valueFile2 = data2[key];

    if (_.has(data1, key) && !_.has(data2, key)) {
      return { ...acc, [`- ${key}`]: valueFile1 };
    }

    if (_.has(data1, key) && _.has(data2, key)) {
      if (valueFile1 === valueFile2) {
        return { ...acc, [`  ${key}`]: valueFile1 };
      }
      return { ...acc, [`- ${key}`]: valueFile1, [`+ ${key}`]: valueFile2 };
    }

    return { ...acc, [`+ ${key}`]: valueFile2 };
  }, {});

  return flatObject;
};

export default createDiffFlatObjects;
