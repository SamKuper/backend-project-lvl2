const fs = require('fs');

const getObject = (file) => JSON.parse(fs.readFileSync(file));

const getDiff = (firstConfig, secondConfig, acc) => {
  const diff = Object.keys(firstConfig).reverse()
    .reduce((iacc, key) => {
      if (secondConfig[key]) {
        return secondConfig[key] === firstConfig[key]
          ? [`    ${key}: ${firstConfig[key]}`, ...iacc]
          : [`  + ${key}: ${secondConfig[key]}`, `  - ${key}: ${firstConfig[key]}`, ...iacc];
      }
      return [`  - ${key}: ${firstConfig[key]}`, ...iacc];
    }, acc);
  return diff;
};

const compare = (file1, file2) => {
  const firstConfig = getObject(file1);
  const secondConfig = getObject(file2);
  const newFields = Object.keys(secondConfig)
    .reduce((acc, key) => (firstConfig[key]
      ? [...acc] : [...acc, `  + ${key}: ${secondConfig[key]}`]), []);
  const diff = getDiff(firstConfig, secondConfig, newFields);
  return ['{', ...diff, '}'].join('\n');
};

module.exports = compare;
