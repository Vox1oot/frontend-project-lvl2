import _ from 'lodash';

const getValue = (value) => (typeof value !== 'string' ? value : `'${value}'`);

const plain = (diff) => {
  const iter = (currentValue, parent) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const lines = Object.entries(currentValue).map((node) => {
      const [, fild] = node;
      switch (fild.type) {
        case 'nested':
          return iter(fild.children, `${parent}${fild.name}.`);
        case 'added':
          return _.isObject(fild.value)
            ? `Property '${parent}${fild.name}' was added with value: [complex value]`
            : `Property '${parent}${fild.name}' was added with value: ${getValue(fild.value)}`;
        case 'deleted':
          return `Property '${parent}${fild.name}' was removed`;
        case 'changed':
          if (_.isObject(fild.previusValue) || _.isObject(fild.currentValue)) {
            const rest = _.isObject(fild.previusValue)
              ? `From [complex value] to ${getValue(fild.currentValue)}`
              : `From ${getValue(fild.previusValue)} to [complex value]`;
            return `Property '${parent}${fild.name}' was updated. ${rest}`;
          }
          return `Property '${parent}${fild.name}' was updated. From ${getValue(fild.previusValue)} to ${getValue(fild.currentValue)}`;
        case 'unchanged':
          return '';
        default:
          throw new Error(`Type: ${node.type} is undefined`);
      }
    });

    return _.compact([...lines]).join('\n');
  };

  return iter(diff, '');
};

export default plain;
