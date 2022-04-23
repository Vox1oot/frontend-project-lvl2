import _ from 'lodash';

const getValue = (value) => (typeof value !== 'string' ? value : `'${value}'`);

const plain = (diff) => {
  const iter = (currentValue, parent) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const lines = Object.entries(currentValue).map(([key, fild]) => {
      switch (fild.type) {
        case 'added':
          return _.isObject(fild.value)
            ? `Property '${parent}${key}' was added with value: [complex value]`
            : `Property '${parent}${key}' was added with value: ${getValue(fild.value)}`;
        case 'deleted':
          return `Property '${parent}${key}' was removed`;
        case 'changed':
          if (_.isObject(fild.previusValue)) {
            return `Property '${parent}${key}' was updated. From [complex value] to ${getValue(fild.currentValue)}`;
          }
          if (_.isObject(fild.currentValue)) {
            return `Property '${parent}${key}' was updated. From ${getValue(fild.previusValue)} to [complex value]`;
          }
          return `Property '${parent}${key}' was updated. From ${getValue(fild.previusValue)} to ${getValue(fild.currentValue)}`;
        case 'unchanged':
          return '';
        default:
          return iter(fild.value, `${parent}${key}.`);
      }
    });

    return _.compact([...lines]).join('\n');
  };

  return iter(diff, '');
};

export default plain;
