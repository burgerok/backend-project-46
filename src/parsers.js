import yaml from 'js-yaml';

const parsers = {
  yml: yaml.load,
  yaml: yaml.load,
  json: JSON.parse,
};

export default (data, format) => {
  if (!parsers[format]) {
    throw new Error(`The input format '${format}' is not supported.`);
  }
  return parsers[format](data);
};
