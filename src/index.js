import fs from 'fs';
import path from 'path';
import process from 'process';
import parse from './parsers.js';
import getDifference from './getdifference.js';
import render from './formatters/index.js';

const getFilePath = (filePath) => path.resolve(process.cwd(), filePath);
const getFormatName = (filePath) => path.extname(filePath).slice(1);

const genDiff = (file1Path, file2Path, format) => {
  const file1Data = fs.readFileSync(getFilePath(file1Path), 'utf-8');
  const file2Data = fs.readFileSync(getFilePath(file2Path), 'utf-8');
  const file1Format = getFormatName(file1Path);
  const file2Format = getFormatName(file2Path);
  const obj1 = parse(file1Data, file1Format);
  const obj2 = parse(file2Data, file2Format);
  const difference = getDifference(obj1, obj2);
  return render(difference, format);
};

export default genDiff;
