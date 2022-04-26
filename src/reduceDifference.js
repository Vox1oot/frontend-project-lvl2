import _ from 'lodash';

const reduceDifference = (data1, data2) => {
  const unionKeys = _.union(Object.keys(data1), Object.keys(data2));

  const result = _.sortBy(unionKeys);

  return result
    .map((node) => {
      const value1 = data1[node];
      const value2 = data2[node];

      if (!_.has(data1, node)) {
        return { name: node, type: 'added', value: value2 };
      }
      if (!_.has(data2, node)) {
        return { name: node, type: 'deleted', value: value1 };
      }
      if (_.isObject(value1) && _.isObject(value2)) {
        return { name: node, type: 'nested', children: reduceDifference(value1, value2) };
      }
      if (!_.isEqual(value1, value2)) {
        return {
          name: node, type: 'changed', previusValue: value1, currentValue: value2,
        };
      }
      return { name: node, type: 'unchanged', value: value1 };
    });
};

export default reduceDifference;
