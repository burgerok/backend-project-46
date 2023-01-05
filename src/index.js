import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import process from 'process';
import parse from './parsers.js';

const getFilePath = (filePath) => path.resolve(process.cwd(), filePath);
const getFormatName = (filePath) => path.extname(filePath).slice(1);

const getDifference = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const result = keys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', children: getDifference(data1[key], data2[key]) };
    }
    if (data1[key] !== data2[key]) {
      return {
        key, type: 'changed', oldValue: data1[key], newValue: data2[key],
      };
    }
    return { key, type: 'unchanged', value: data1[key] };
  });
  return result;
};

const diffStyle = (difference) => {
  const result = difference.map((diff) => {
    const diffType = diff.type;
    switch (diffType) {
      case 'removed':
        return `  - ${diff.key}: ${diff.value}`;
      case 'unchanged':
        return `    ${diff.key}: ${diff.value}`;
      case 'changed':
        return (`  - ${diff.key}: ${diff.oldValue} \n  + ${diff.key}: ${diff.newValue}`);
      case 'added':
        return `  + ${diff.key}: ${diff.value}`;
      default:
        return null;
    }
  });
  return `{\n${result.join('\n')}\n}`;
};

const genDiff = (file1Path, file2Path) => {
  const file1Data = fs.readFileSync(getFilePath(file1Path), 'utf-8');
  const file2Data = fs.readFileSync(getFilePath(file2Path), 'utf-8');
  const file1Format = getFormatName(file1Path);
  const file2Format = getFormatName(file2Path);
  const obj1 = parse(file1Data, file1Format);
  const obj2 = parse(file2Data, file2Format);
  const difference = _.sortBy(getDifference(obj1, obj2), (o) => o.key);
  return diffStyle(difference);
};

export default genDiff;
