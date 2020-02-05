const fs = require('fs');
const path = require('path');
const parser = require('./parsers.js');
const ast = require('./buildAst.js');
const render = require('./formatters');

const getObject = (file, format) => parser[format](file);
const getFormat = (str) => path.extname(str);

module.exports = (file1, file2, outputFormat = 'object') => {
  const firstConfigTxt = fs.readFileSync(file1, 'utf-8');
  const secondConfigTxt = fs.readFileSync(file2, 'utf-8');
  const format1 = getFormat(file1);
  const format2 = getFormat(file2);
  const firstConfig = getObject(firstConfigTxt, format1);
  const secondConfig = getObject(secondConfigTxt, format2);
  const diff = ast(firstConfig, secondConfig);
  return render(diff, outputFormat);
};
