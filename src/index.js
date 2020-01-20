const fs = require('fs');

module.exports = (file1, file2) => {
  const data1 = JSON.parse(fs.readFileSync(file1));
  const data2 = JSON.parse(fs.readFileSync(file2));
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const oldFields = keys1.reduce((acc, key) => {
    if (keys2.includes(key)) {
      return data1[key] === data2[key]
        ? [...acc, `${key}: ${data1[key]}`]
        : [...acc, `+${key}: ${data2[key]}`, `-${key}: ${data1[key]}`];
    }
    return [...acc, `-${key}: ${data1[key]}`];
  }, []);
  const newFields = keys2.reduce((acc, key) => (keys1.includes(key)
    ? [...acc] : [...acc, `+${key}: ${data2[key]}`]),
  oldFields);
  return ['{', ...newFields, '}'].join('\n');
};
