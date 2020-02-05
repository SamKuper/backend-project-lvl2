#!/usr/bin/env node
const program = require('commander');
const compare = require('..');

program.version('1.0.2')
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, format) => {
    console.log(compare(firstConfig, secondConfig, format));
  });

program.parse(process.argv);
