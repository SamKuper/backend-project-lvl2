const fs = require('fs');

module.exports = (file1, file2) => {
  const getObject = (file) => JSON.parse(fs.readFileSync(file));
  const firstConfig = getObject(file1);
  const secondConfig = getObject(file2);
  const newFields = Object.keys(secondConfig)
    .reduce((acc, key) => (firstConfig[key]
      ? [...acc] : [...acc, `  + ${key}: ${secondConfig[key]}`]), []);
  const differences = Object.keys(firstConfig)
    .reverse()
    .reduce((acc, key) => {
      if (secondConfig[key]) {
        return secondConfig[key] === firstConfig[key]
          ? [`    ${key}: ${firstConfig[key]}`, ...acc]
          : [`  + ${key}: ${secondConfig[key]}`, `  - ${key}: ${firstConfig[key]}`, ...acc];
      }
      return [`  - ${key}: ${firstConfig[key]}`, ...acc];
    }, newFields);
  return ['{', ...differences, '}'].join('\n');
};
