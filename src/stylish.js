import _ from 'lodash';

const stylish = (diff, replacer = ' ', spacesCount = 2) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    const keyIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = Object
      .entries(currentValue)
      .map(([key, value]) => {
        if (value.type === 'deleted') {
          if (_.isObject(value.value)) {
            return `${keyIndent}- ${key}: ${iter(value.value, depth + 2)}`;
          }
          return `${keyIndent}- ${key}: ${value.value}`;
        }

        if (value.type === 'added') {
          if (_.isObject(value.value)) {
            return `${keyIndent}+ ${key}: ${iter(value.value, depth + 2)}`;
          }
          return `${keyIndent}+ ${key}: ${value.value}`;
        }

        if (value.type === 'unchanged') {
          if (_.isObject(value.value)) {
            return `${keyIndent}  ${key}: ${iter(value.value, depth + 1)}`;
          }
          return `${keyIndent}  ${key}: ${value.value}`;
        }

        if (value.type === 'changed') {
          if (_.isObject(value.previusValue)) {
            return `${keyIndent}- ${key}: ${iter(value.previusValue, depth + 2)}\n${keyIndent}+ ${key}: ${value.currentValue}`;
          }
          if (_.isObject(value.currentValue)) {
            return `${keyIndent}- ${key}: ${value.previusValue}\n${keyIndent}+ ${key}: ${iter(value.currentValue, depth + 2)}`;
          }
          return `${keyIndent}- ${key}: ${value.previusValue}\n${keyIndent}+ ${key}: ${value.currentValue}`;
        }

        if (value.type === undefined) {
          if (_.isObject(value.value)) {
            return `${keyIndent}  ${key}: ${iter(value.value, depth + 2)}`;
          }
          return `${keyIndent}  ${key}: ${iter(value, depth + 2)}`;
        }

        return `${keyIndent}  ${key}: ${iter(value.value, depth + 2)}`;
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(diff, 1);
};

export default stylish;
