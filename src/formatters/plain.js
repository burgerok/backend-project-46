const formatValue = (value) => {
  const type = typeof value;
  switch (type) {
    case 'object':
      return value === null ? null : '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const getPropertyName = (pathParts) => pathParts.join('.');

const renderPlain = (nodes) => {
  const iter = (data, pathParts) => {
    const result = data.flatMap((el) => {
      const {
        key, value, type, oldValue, newValue, children,
      } = el;
      const currentPathParts = pathParts.concat(key);
      switch (type) {
        case 'nested':
          return iter(children, currentPathParts);

        case 'added':
          return `Property '${getPropertyName(currentPathParts)}' was added with value: ${formatValue(value)}`;

        case 'removed':
          return `Property '${getPropertyName(currentPathParts)}' was removed`;

        case 'changed':
          return `Property '${getPropertyName(currentPathParts)}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;

        case 'unchanged':
          return [];

        default:
          throw new Error(`The type of node ${type} is not supported for plain formatter`);
      }
    });
    return result.join('\n');
  };

  return iter(nodes, []);
};

export default renderPlain;
