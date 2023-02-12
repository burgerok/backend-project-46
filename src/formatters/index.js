import renderStylish from './stylish.js';
import renderPlain from './plain.js';
import renderJson from './json.js';

const formatters = {
  stylish: renderStylish,
  plain: renderPlain,
  json: renderJson,
};

export default (data, format) => {
  if (!formatters[format]) {
    throw new Error(`The output format - '${format}' is not supported.`);
  }
  return formatters[format](data);
};
