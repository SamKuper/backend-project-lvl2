#!/usr/bin/env node

const program = require('commander');

program.version('1.0.2')
  .description('Compares two configuration files and shows a difference');

program.parse(process.argv);
