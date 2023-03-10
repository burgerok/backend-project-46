/* eslint no-underscore-dangle: ["error", { "allow": ["__filename", "__dirname"] }] */

import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFixture = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

const inputFormats = ['json', 'yml'];

const resultStylish = readFixture('resultStylish.txt');
const resultPlain = readFixture('resultPlain.txt');
const resultJson = readFixture('resultJson.txt');

test.each(inputFormats)('standart genDiff for %s input format', (format) => {
  const file1Path = getFixturePath(`file1.${format}`);
  const file2Path = getFixturePath(`file2.${format}`);
  expect(genDiff(file1Path, file2Path, 'stylish')).toEqual(resultStylish);
});

test.each(inputFormats)('plain genDiff for %s input format', (format) => {
  const file1Path = getFixturePath(`file1.${format}`);
  const file2Path = getFixturePath(`file2.${format}`);
  expect(genDiff(file1Path, file2Path, 'plain')).toEqual(resultPlain);
});

test.each(inputFormats)('json genDiff for %s input format', (format) => {
  const file1Path = getFixturePath(`file1.${format}`);
  const file2Path = getFixturePath(`file2.${format}`);
  expect(genDiff(file1Path, file2Path, 'json')).toEqual(resultJson);
});
