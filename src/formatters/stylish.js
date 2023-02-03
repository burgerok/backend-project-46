import _ from 'lodash';

const step = (times) => ' '.repeat(times);

const stringify = (value, indent) => {
  if (!_.isObject(value)) {
    return value;
  }
  const objAsString = _
    .keys(value)
    .map((key) => `${step(indent + 6)}${key}: ${stringify(value[key], indent + 4)}`)
    .join('\n');
  return `{\n${objAsString}\n${step(indent + 2)}}`;
};

const typeActions = {
  nested: (obj, indent, fn) => `${step(indent + 2)}${obj.key}: ${fn(obj.children, indent + 2)}`,
  added: (obj, indent) => `${step(indent)}+ ${obj.key}: ${stringify(obj.value, indent)}`,
  removed: (obj, indent) => `${step(indent)}- ${obj.key}: ${stringify(obj.value, indent)}`,
  unchanged: (obj, indent) => `${step(indent + 2)}${obj.key}: ${stringify(obj.value, indent)}`,
  changed: (obj, indent) => [
    `${step(indent)}- ${obj.key}: ${stringify(obj.oldValue, indent)}`,
    `${step(indent)}+ ${obj.key}: ${stringify(obj.newValue, indent)}`,
  ],
};

const render = (ast, depth = 0) => {
  const processed = ast
    .map((obj) => {
      const indent = depth + 2;
      return typeActions[obj.type](obj, indent, render);
    });
  const result = _.flatten(processed).join('\n');
  return `{\n${result}\n${step(depth)}}`;
};

export default (ast) => `${render(ast)}\n`;
