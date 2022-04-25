import yaml from 'js-yaml';

const parsers = (data, extension) => {
  switch (extension) {
    case '.yml':
      return yaml.load(data);
    case '.yaml':
      return yaml.load(data);
    case '.json':
      return JSON.parse(data);
    default:
      throw new Error('This file type is not supported');
  }
};

export default parsers;
