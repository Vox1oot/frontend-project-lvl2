import _ from 'lodash';
import { fileURLToPath } from 'url';
import * as path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const plain = (diff) => {
  const iter = (currentValue) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const lines = Object.entries(currentValue).map(([key, fild]) => {
      switch (fild.type) {
        case 'nested':
          return `'${key}.${iter(fild.value)}`;
        case 'added':
          return _.isObject(fild.value)
            ? `${key}' was added with value: [complex value]`
            : `${key}' was added with value: ${fild.value}`;
        case 'deleted':
          return `${key}' was removed`;
      }
    });

    return [...lines].join('\n');
  };

  return iter(diff, '');
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '../..', '__fixtures__', filename);

console.dir(genDiff(getFixturePath('tree1.json'), getFixturePath('tree2.json')), { depth: null });
console.log('-----');
console.log(plain(genDiff(getFixturePath('tree1.json'), getFixturePath('tree2.json'))));
