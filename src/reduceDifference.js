import _ from 'lodash';

const reduceDifference = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2);

  const sortedUnionKeys = _.sortBy(unionKeys);

  const result = sortedUnionKeys
    .map((key) => {
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        return { name: key, type: 'node', children: reduceDifference(data1[key], data2[key]) };
      }
      if (!_.has(data1, key)) {
        return { name: key, type: 'plus', value: data2[key] };
      }
      if (!_.has(data2, key)) {
        return { name: key, type: 'minus', value: data1[key] };
      }
      if (data1[key] !== data2[key]) {
        return {
          name: key, type: 'changed', firstValue: data1[key], secondValue: data2[key],
        };
      }
      return { name: key, type: 'unchanged', value: data1[key] };
    });

  return result;
};

export default reduceDifference;
