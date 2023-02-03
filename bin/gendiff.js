#!/usr/bin/env node
/* eslint-disable import/extensions */
/* eslint-disable no-console */

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filePath1, filePath2) => {
    const result = genDiff(filePath1, filePath2, program.opts().format);
    console.log(result);
  })
  .parse(process.argv);
