import yaml from 'js-yaml';

const parsers = (data, dataType) => {
  switch (dataType) {
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`This dataType - ${dataType} is not supported`);
  }
};

export default parsers;

