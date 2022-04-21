import _ from 'lodash';

const reduceDifference = (data1, data2) => {
  const unionKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedUnionKeys = _.sortBy(unionKeys);

  const result = sortedUnionKeys
    .reduce((acc, key) => {
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        return { ...acc, [`${key}`]: { type: 'nested', value: reduceDifference(data1[key], data2[key]) } };
      }
      if (!_.has(data1, key)) {
        return { ...acc, [`${key}`]: { type: 'added', value: data2[key] } };
      }
      if (!_.has(data2, key)) {
        return { ...acc, [`${key}`]: { type: 'deleted', value: data1[key] } };
      }
      if (data1[key] !== data2[key]) {
        return { ...acc, [`${key}`]: { type: 'changed', previusValue: data1[key], currentValue: data2[key] } };
      }
      return { ...acc, [`${key}`]: { type: 'unchanged', value: data1[key] } };
    }, {});

  return result;
};

export default reduceDifference;
