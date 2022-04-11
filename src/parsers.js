import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const parsers = (filePath) => {
  const currentPath = path.resolve(process.cwd(), `${filePath}`);

  const extension = path.parse(currentPath).ext;

  switch (extension) {
    case '.yml':
      return yaml.load(fs.readFileSync(currentPath, 'utf8'));
    case '.yaml':
      return yaml.load(fs.readFileSync(currentPath, 'utf8'));
    case '.json':
      return JSON.parse(fs.readFileSync(currentPath, 'utf8'));
    default:
      throw new Error('This file type is not supported');
  }
};

export default parsers;
