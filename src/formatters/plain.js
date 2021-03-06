import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (diff) => {
  const iter = (currentValue, parent) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const lines = Object.entries(currentValue).map(([, fild]) => {
      switch (fild.type) {
        case 'nested':
          return iter(fild.children, `${parent}${fild.name}.`);
        case 'added':
          return `Property '${parent}${fild.name}' was added with value: ${getValue(fild.value)}`;
        case 'deleted':
          return `Property '${parent}${fild.name}' was removed`;
        case 'changed':
          return `Property '${parent}${fild.name}' was updated. From ${getValue(fild.previusValue)} to ${getValue(fild.currentValue)}`;
        case 'unchanged':
          return '';
        default:
          throw new Error(`Type: ${fild.type} is undefined`);
      }
    });
    return _.compact([...lines]).join('\n');
  };
  return iter(diff, '');
};

export default plain;
