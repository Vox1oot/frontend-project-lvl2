import _ from 'lodash';

const indent = (depth, spaceCount = 4) => ' '.repeat(spaceCount * depth - 2);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const lines = Object
    .entries(data)
    .map(([key, value]) => `${indent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${indent(depth)}  }`,
  ].join('\n');
};

const stylish = (diff) => {
  const iter = (tree, depth) => tree.map((node) => {
    const getValue = (value, sign) => `${indent(depth)}${sign} ${node.name}: ${stringify(value, depth)}\n`;

    switch (node.type) {
      case 'added':
        return getValue(node.value, '+');
      case 'deleted':
        return getValue(node.value, '-');
      case 'unchanged':
        return getValue(node.value, ' ');
      case 'changed':
        return `${getValue(node.previusValue, '-')}${getValue(node.currentValue, '+')}`;
      case 'nested':
        return `${indent(depth)}  ${node.name}: {\n${iter(node.children, depth + 1).join('')}${indent(depth)}  }\n`;
      default:
        throw new Error(`Type: ${node.type} is undefined`);
    }
  });

  return `{\n${iter(diff, 1).join('')}}`;
};

export default stylish;
