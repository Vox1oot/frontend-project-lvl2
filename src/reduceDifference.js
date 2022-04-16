import _ from 'lodash';

const reduceDifference = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2);

  const sortedUnionKeys = _.sortBy(unionKeys);

  const result = sortedUnionKeys.reduce((acc, key) => {
    const valueData1 = data1[key];
    const valueData2 = data2[key];

    if (_.has(data1, key) && _.has(data2, key)) {
      if (_.isObject(valueData1) && _.isObject(valueData2)) {
        return { ...acc, [`${key}`]: reduceDifference(valueData1, valueData2) };
      }
      if (valueData1 === valueData2) {
        return { ...acc, [`  ${key}`]: valueData1 };
      }
      return { ...acc, [`- ${key}`]: valueData1, [`+ ${key}`]: valueData2 };
    }

    if (_.has(data1, key) && !_.has(data2.key)) {
      return { ...acc, [`- ${key}`]: valueData1 };
    }

    return { ...acc, [`+ ${key}`]: valueData2 };
  }, {});

  return result;
};

export default reduceDifference;
