import _ from 'lodash';

const getDifference = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const result = keys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', children: getDifference(data1[key], data2[key]) };
    }
    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (data1[key] !== data2[key]) {
      return {
        key, type: 'changed', oldValue: data1[key], newValue: data2[key],
      };
    }
    return { key, type: 'unchanged', value: data1[key] };
  });
  const sortedResult = _.sortBy(result, 'key', 'type');
  return sortedResult;
};

export default getDifference;
