const fs = require('fs');
const path = require('path');
const parser = require('./parsers.js');

const getObject = (file, format) => parser[format](file);
const getFormat = (str) => path.extname(str);

const addNewFields = (firstConfig, secondConfig, acc) => Object.keys(secondConfig)
  .reduce((iacc, key) => (firstConfig[key]
    ? [...iacc] : [...iacc, `  + ${key}: ${secondConfig[key]}`]), acc);

const getDiff = (firstConfig, secondConfig) => {
  const diff = Object.keys(firstConfig).reverse()
    .reduce((acc, key) => {
      if (secondConfig[key]) {
        return secondConfig[key] === firstConfig[key]
          ? [`    ${key}: ${firstConfig[key]}`, ...acc]
          : [`  + ${key}: ${secondConfig[key]}`, `  - ${key}: ${firstConfig[key]}`, ...acc];
      }
      return [`  - ${key}: ${firstConfig[key]}`, ...acc];
    }, []);
  return addNewFields(firstConfig, secondConfig, diff);
};

module.exports = (file1, file2) => {
  const firstConfigTxt = fs.readFileSync(file1, 'utf-8');
  const secondConfigTxt = fs.readFileSync(file2, 'utf-8');
  const format1 = getFormat(file1);
  const format2 = getFormat(file2);
  const firstConfig = getObject(firstConfigTxt, format1);
  const secondConfig = getObject(secondConfigTxt, format2);
  const diff = getDiff(firstConfig, secondConfig);
  return ['{', ...diff, '}'].join('\n');
};
